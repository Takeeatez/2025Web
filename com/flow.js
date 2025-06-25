import readlineSyncModule from 'readline-sync';
import fs from 'fs';
// memo v2
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
    console.log('\n1. 작성  2. 조회  3. 수정  4. 삭제  5. 추가기능  6. 종료');
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
           
            const newTitle = promptInput('제목 입력: ');

            console.log("내용을 한줄씩 입력하세요. 입력을 종료하려면 !q를 입력하세요.");
            let lines = [];
            while(true){
                const line = promptInput('');
                if(line === '!q') break;
                lines.push(line);
            }

            const newContent = lines.join('\n'); // 줄바꿈 포함한 내용 조립
            memoList.push({ title: newTitle, content: newContent });

            fs.writeFileSync('memoList.json', JSON.stringify(memoList, null, 2));
            console.log('메모가 추가되었습니다.');
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
                console.log(`제목: ${memoList[viewIndex].title}`);
                console.log(`내용: ${memoList[viewIndex].content}`);
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
                const editTitle = promptInput('새 제목 입력: ');
                const editContent = promptInput('새 내용 입력: ');
                memoList[editIndex].title = editTitle;
                memoList[editIndex].content = editContent;
                fs.writeFileSync('memoList.json', JSON.stringify(memoList, null, 2));
                console.log('메모가 수정되었습니다.');
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
                memoList.splice(delIndex, 1);
                fs.writeFileSync('memoList.json', JSON.stringify(memoList, null, 2));
                console.log('메모가 삭제되었습니다.');
            } else {
                console.log('잘못된 번호입니다.');
            }
            break;

        case 5:
            // 5. 추가기능 
            console.log('추가기능은 아직 구현되지 않았습니다.');
            break;

        case 6:
            // 6. 종료 기능
            // 반복문을 종료하기 위해 exit 값을 true로 설정
            console.log('프로그램을 종료합니다.');
            exit = true;
            break;

        default:
            // 유효하지 않은 입력에 대한 처리
            console.log('없는 기능입니다.');
    }
}
