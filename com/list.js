// Q1
const numbers = [1,2,3,4,5];
let sum=0;

for(var i=0; i<numbers.length; i++){
    sum += numbers[i];
    console.log('현재 합계 : ' + sum + '(' + numbers[i] + ')' + '를더함');
}

console.log('최종 합계 : ' + sum);

// Q2
const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum2 = 0;

for (let i = 0; i < numbers2.length; i++) {
    if (numbers2[i] % 2 === 0) {
        console.log('짝수 발견 : ' + numbers2[i]);
        sum2 += numbers2[i];
    }
}

console.log('짝수의 합 : ' + sum2);

// 리스트 과제
import readlineSyncModule from 'readline-sync';
// 메모 데이터를 저장하기 위한 리스트
const memoList = [];

// 반복 제어용 변수
let exit = false;

while (!exit) {
    // 사용자에게 메뉴를 출력하고 선택을 입력받음
    console.log('\n1. 작성  2. 조회  3. 수정  4. 삭제  5. 추가기능  6. 종료');
    const userSelect = parseInt(readlineSyncModule.question('메뉴 선택 : '));

    switch (userSelect) {
        case 1:
            // 1. 작성 기능
            // 사용자가 입력한 제목과 내용을 기반으로 메모 객체를 생성하여 리스트에 추가
            const newTitle = readlineSyncModule.question('제목 입력: ');
            const newContent = readlineSyncModule.question('내용 입력: ');
            memoList.push({ title: newTitle, content: newContent });
            console.log('메모가 추가되었습니다.');
            break;

        case 2:
            // 2. 조회 기능
            // 전체 메모 제목을 출력한 후, 사용자가 선택한 번호에 해당하는 메모의 내용을 보여준다.
            if (memoList.length === 0) {
                console.log('저장된 메모가 없습니다.');
                break;
            }
            console.log('\n메모 목록:');
            memoList.forEach((memo, index) => {
                console.log(`${index + 1}. ${memo.title}`);
            });
            const viewIndex = parseInt(readlineSyncModule.question('조회할 메모 번호 선택: ')) - 1;
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
            if (memoList.length === 0) {
                console.log('저장된 메모가 없습니다.');
                break;
            }
            console.log('\n수정할 메모 목록:');
            memoList.forEach((memo, index) => {
                console.log(`${index + 1}. ${memo.title}`);
            });
            const editIndex = parseInt(readlineSyncModule.question('수정할 메모 번호 선택: ')) - 1;
            if (editIndex >= 0 && editIndex < memoList.length) {
                const editTitle = readlineSyncModule.question('새 제목 입력: ');
                const editContent = readlineSyncModule.question('새 내용 입력: ');
                memoList[editIndex].title = editTitle;
                memoList[editIndex].content = editContent;
                console.log('메모가 수정되었습니다.');
            } else {
                console.log('잘못된 번호입니다.');
            }
            break;

        case 4:
            // 4. 삭제 기능
            // 삭제할 메모 번호를 선택하면 해당 메모를 리스트에서 제거
            if (memoList.length === 0) {
                console.log('저장된 메모가 없습니다.');
                break;
            }
            console.log('\n삭제할 메모 목록:');
            memoList.forEach((memo, index) => {
                console.log(`${index + 1}. ${memo.title}`);
            });
            const delIndex = parseInt(readlineSyncModule.question('삭제할 메모 번호 선택: ')) - 1;
            if (delIndex >= 0 && delIndex < memoList.length) {
                memoList.splice(delIndex, 1);
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
            // 반복문을 종료하기 위해 exit 값을 true로 설정합니다.
            console.log('프로그램을 종료합니다.');
            exit = true;
            break;

        default:
            // 유효하지 않은 입력에 대한 처리입니다.
            console.log('없는 기능입니다.');
    }
}