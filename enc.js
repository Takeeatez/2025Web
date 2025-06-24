import readlineSyncModule from 'readline-sync';
import fs from 'fs';
import CryptoJS from 'crypto-js';

// 암호화/복호화 함수로 개별 분리
function encryptContent(content, key) {
    return CryptoJS.AES.encrypt(content, key).toString();
}

function decryptContent(encrypted, key) {
    try {
        const bytes = CryptoJS.AES.decrypt(encrypted, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            return null;
        }
        return decrypted;
    } catch (e) {
        return null;
    }
}
// memo v3
// 메모 데이터를 저장하기 위한 리스트
let memoList = [];

// 반복 제어용 변수
let exit = false;

// 전체 메모 리스트를 보여주는 함수
function showMemoList(memoList) {
    console.log('\n메모 목록:');
    memoList.forEach((memo, index) => {
        console.log(`${index + 1}. ${memo.title}`);
    });
}

// Input함수를 간단하게 정의
function promptInput(message) {
    return readlineSyncModule.question(message);
}

while (!exit) {
    // 사용자에게 메뉴를 출력하고 선택을 입력받음
    console.log('\n1. 작성  2. 조회  3. 수정  4. 삭제  5. 잠금설정  6. 잠금해제 7. 종료');
    const userSelect = parseInt(promptInput('메뉴 선택 : '));

    switch (userSelect) {
        case 1:
            // 1. 작성 기능 + 여러 줄 입력 지원
            // 사용자가 입력한 제목과 내용을 기반으로 메모 객체를 생성하여 리스트에 추가
            try {
                const data = fs.readFileSync('memoList.json', 'utf8');
                memoList = JSON.parse(data);
            } catch (err) {
                // 파일이 없거나 JSON 파싱 실패 시 빈 배열 유지
                memoList = [];
            }
            try {
                const newTitle = promptInput('제목 입력: ');
                // 입력값 검증 early check
                if (!newTitle.trim()) {
                    console.log('제목이 비어 있습니다.');
                    break;
                }

                console.log("내용을 한줄씩 입력하세요. 입력을 종료하려면 !q를 입력하세요.");
                let lines = [];
                while(true){
                    const line = promptInput('');
                    if(line === '!q') break;
                    lines.push(line);
                }

                // 내용 공백 early check
                if (lines.join('').trim().length === 0) {
                    console.log('내용이 입력되지 않았습니다.');
                    break;
                }

                const newContent = lines.join('\n'); // 줄바꿈 포함한 내용 조립
                memoList.push({ title: newTitle, content: newContent });

                fs.writeFileSync('memoList.json', JSON.stringify(memoList, null, 2));
                console.log('메모가 추가되었습니다.');
            } catch (error) {
                // 입력 및 저장 처리
                console.log('메모 작성 중 오류가 발생했습니다.');
            }
            break;

        case 2:
            // 2. 조회 기능
            // 전체 메모 제목을 출력한 후, 사용자가 선택한 번호에 해당하는 메모의 내용을 보여준다.
            try {
                const data = fs.readFileSync('memoList.json', 'utf8');
                memoList = JSON.parse(data);
            } catch (err) {
                memoList = [];
            }
            if (memoList.length === 0) {
                console.log('저장된 메모가 없습니다.');
                break;
            }
            showMemoList(memoList);
            const viewIndex = parseInt(promptInput('조회할 메모 번호 선택: ')) - 1;
            if (viewIndex >= 0 && viewIndex < memoList.length) {
                let memo = memoList[viewIndex];
                let title = memo.title;
                let content = memo.content;
                let wasLocked = false;
                let decryptedContent = null;
                if (title.startsWith('(잠금)')) {
                    // 잠금 해제 로직
                    const secretKey = promptInput('비밀번호 입력: ');
                    decryptedContent = decryptContent(content, secretKey);
                    if (decryptedContent === null) {
                        console.log('비밀번호가 올바르지 않거나 복호화 실패.');
                        break;
                    }
                    wasLocked = true;
                    // 잠금 해제 후 임시로 보여줌
                    console.log(`제목: ${title}`);
                    console.log(`내용: ${decryptedContent}`);
                    // 사용 후 다시 잠글지 여부
                    const relock = promptInput('사용 후 다시 잠그시겠습니까? (Y/n): ');
                    if (relock.trim().toLowerCase() === 'n') {
                        // 잠금 해제 상태로 유지
                        memo.title = memo.title.replace(/^\(잠금\)\s*/, '');
                        memo.content = decryptedContent;
                        fs.writeFileSync('memoList.json', JSON.stringify(memoList, null, 2));
                        console.log('메모가 잠금 해제되었습니다.');
                    } else {
                        // 그대로 둠
                        console.log('메모가 다시 잠금 상태로 유지됩니다.');
                    }
                } else {
                    // 잠금 안됨
                    console.log(`제목: ${title}`);
                    console.log(`내용: ${content}`);
                }
            } else {
                console.log('잘못된 번호입니다.');
            }
            break;

        case 3:
            // 3. 수정 기능
            // 사용자로부터 수정할 메모의 번호를 입력받아 제목과 내용을 새로 입력받고 덮어씀
            try {
                const data = fs.readFileSync('memoList.json', 'utf8');
                memoList = JSON.parse(data);
            } catch (err) {
                memoList = [];
            }
            if (memoList.length === 0) {
                console.log('저장된 메모가 없습니다.');
                break;
            }
            console.log('\n수정할 메모 목록:');
            showMemoList(memoList);
            const editIndex = parseInt(promptInput('수정할 메모 번호 선택: ')) - 1;
            if (editIndex >= 0 && editIndex < memoList.length) {
                let memo = memoList[editIndex];
                let title = memo.title;
                let content = memo.content;
                let wasLocked = false;
                let decryptedContent = null;
                if (title.startsWith('(잠금)')) {
                    // 잠금 해제 로직
                    const secretKey = promptInput('비밀번호 입력: ');
                    decryptedContent = decryptContent(content, secretKey);
                    if (decryptedContent === null) {
                        console.log('비밀번호가 올바르지 않거나 복호화 실패.');
                        break;
                    }
                    wasLocked = true;
                    // 잠금 해제 후 수정
                    console.log('잠금 해제됨. 수정 진행.');
                    // 사용 후 다시 잠글지 여부는 수정 후 묻는다.
                } else {
                    decryptedContent = content;
                }
                const editTitle = promptInput('새 제목 입력: ');
                const editContent = promptInput('새 내용 입력: ');
                if (wasLocked) {
                    // 잠금 해제 상태에서, 다시 잠글지 여부 묻기
                    const relock = promptInput('수정 후 다시 잠그시겠습니까? (Y/n): ');
                    if (relock.trim().toLowerCase() === 'n') {
                        // 잠금 해제 상태로 저장
                        memo.title = editTitle;
                        memo.content = editContent;
                        fs.writeFileSync('memoList.json', JSON.stringify(memoList, null, 2));
                        console.log('메모가 잠금 해제되어 수정되었습니다.');
                    } else {
                        // 다시 암호화
                        const newKey = promptInput('새 비밀번호 입력: ');
                        if (!newKey.trim()) {
                            console.log('비밀번호가 비어 있습니다. 수정 취소.');
                            break;
                        }
                        memo.title = `(잠금) ${editTitle}`;
                        memo.content = encryptContent(editContent, newKey);
                        fs.writeFileSync('memoList.json', JSON.stringify(memoList, null, 2));
                        console.log('메모가 수정 후 다시 잠금 처리되었습니다.');
                    }
                } else {
                    memo.title = editTitle;
                    memo.content = editContent;
                    fs.writeFileSync('memoList.json', JSON.stringify(memoList, null, 2));
                    console.log('메모가 수정되었습니다.');
                }
            } else {
                console.log('잘못된 번호입니다.');
            }
            break;

        case 4:
            // 4. 삭제 기능
            // 삭제할 메모 번호를 선택하면 해당 메모를 리스트에서 제거
            try {
                const data = fs.readFileSync('memoList.json', 'utf8');
                memoList = JSON.parse(data);
            } catch (err) {
                memoList = [];
            }
            if (memoList.length === 0) {
                console.log('저장된 메모가 없습니다.');
                break;
            }
            console.log('\n삭제할 메모 목록:');
            showMemoList(memoList);
            const delIndex = parseInt(promptInput('삭제할 메모 번호 선택: ')) - 1;
            if (delIndex >= 0 && delIndex < memoList.length) {
                let memo = memoList[delIndex];
                let title = memo.title;
                let content = memo.content;
                let wasLocked = false;
                let decryptedContent = null;
                if (title.startsWith('(잠금)')) {
                    // 잠금 해제 로직
                    const secretKey = promptInput('비밀번호 입력: ');
                    decryptedContent = decryptContent(content, secretKey);
                    if (decryptedContent === null) {
                        console.log('비밀번호가 올바르지 않거나 복호화 실패.');
                        break;
                    }
                    wasLocked = true;
                    // 잠금 해제 후 삭제 여부 확인
                    const confirmDel = promptInput('잠금 해제되었습니다. 정말 삭제하시겠습니까? (Y/n): ');
                    if (confirmDel.trim().toLowerCase() === 'n') {
                        console.log('삭제가 취소되었습니다.');
                        break;
                    }
                    // 사용 후 다시 잠글지 여부
                    const relock = promptInput('삭제 대신 잠금 해제 상태로 유지할까요? (Y/n): ');
                    if (relock.trim().toLowerCase() === 'y') {
                        // 잠금 해제 상태로 유지
                        memo.title = memo.title.replace(/^\(잠금\)\s*/, '');
                        memo.content = decryptedContent;
                        fs.writeFileSync('memoList.json', JSON.stringify(memoList, null, 2));
                        console.log('삭제 대신 메모가 잠금 해제되었습니다.');
                        break;
                    }
                    // 삭제 진행
                }
                memoList.splice(delIndex, 1);
                fs.writeFileSync('memoList.json', JSON.stringify(memoList, null, 2));
                console.log('메모가 삭제되었습니다.');
            } else {
                console.log('잘못된 번호입니다.');
            }
            break;

        case 5:
            // 5. 암호화(AES)
            try {
                const data = fs.readFileSync('memoList.json', 'utf8');
                memoList = JSON.parse(data);
            } catch (err) {
                memoList = [];
                }
            showMemoList(memoList);
            const encIndex = parseInt(promptInput('암호화할 메모 번호 선택 : ')) - 1;
            if (encIndex >= 0 && encIndex < memoList.length) {
                if (memoList[encIndex].title.startsWith('(잠금)')) {
                    console.log('이미 잠금 처리된 메모입니다.');
                    break;
                }
                const secretKey = promptInput('비밀번호 입력 : ');
                if (!secretKey.trim()) {
                    console.log('비밀번호가 비어 있습니다.');
                    break;
                }

            const originalContent = memoList[encIndex].content;
            const encrypted = encryptContent(originalContent, secretKey);

            memoList[encIndex].content = encrypted;
            memoList[encIndex].title = `(잠금) ${memoList[encIndex].title}`;

            fs.writeFileSync('memoList.json', JSON.stringify(memoList, null, 2));
            console.log('메모가 암호화되었습니다.');
}
            break;

        case 6:
            try {
                const data = fs.readFileSync('memoList.json', 'utf8');
                memoList = JSON.parse(data);
            } catch (err) {
                memoList = [];
            }
            showMemoList(memoList);
            const decIndex = parseInt(promptInput('복호화할 메모 번호 선택: ')) - 1;
            if (decIndex >= 0 && decIndex < memoList.length) {
                let memo = memoList[decIndex];
                if (!memo.title.startsWith('(잠금)')) {
                    console.log('이미 잠금 해제된 메모입니다.');
                    break;
                }
            const secretKey = promptInput('비밀번호 입력: ');
            const decrypted = decryptContent(memo.content, secretKey);
            if (decrypted === null) {
            console.log('비밀번호가 올바르지 않거나 복호화 실패.');
            break;
        }
            memo.title = memo.title.replace(/^\(잠금\)\s*/, '');
            memo.content = decrypted;
            fs.writeFileSync('memoList.json', JSON.stringify(memoList, null, 2));
            console.log('메모가 잠금 해제되었습니다.');
        } else {
            console.log('잘못된 번호입니다.');
            }   
            break;
        case 7:
            // 7. 종료 기능
            // 반복문을 종료하기 위해 exit 값을 true로 설정
            console.log('프로그램을 종료합니다.');
            exit = true;
            break;

        default:
            // 유효하지 않은 입력에 대한 처리
            console.log('없는 기능입니다.');
    }
}
