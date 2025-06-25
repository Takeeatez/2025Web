// Q1
import readlineSyncModule from 'readline-sync';

const userInput = readlineSyncModule.question('나 : ');
console.log('앵무새 : ' + userInput);

// Q2

let isCorrect = false;
let sen = '열심히 배워서 최고의 개발자가 되어보자!';
const Input = readlineSyncModule.question('문장 입력 : ');

// (조건 1) 문장 비교 후 결과를 isCorrect에 저장
isCorrect = (Input === sen);

// (조건 2) 조건문에는 isCorrect 변수만 사용
if (isCorrect) {
    console.log('정답입니다.');
} else {
    console.log('실패입니다.');
}

// 과제
let write = '1. 작성';
let show = '2. 조회';
let edit = '3. 수정';
let del = '4. 삭제';
let add = '5. 추가기능';
let quit = '6. 종료';

console.log(write + ' ' + show + ' ' + edit + ' ' + del + ' ' + add + ' ' + quit);

const userSelect = parseInt(readlineSyncModule.question('메뉴 선택 :'));

switch(userSelect){
    case 1:
        console.log(write);
        const memoTitle = readlineSyncModule.question('제목을 입력하세요 : ');
        const memoContent = readlineSyncModule.question('내용을 입력하세요 : ');
        break;
    case 2:
        console.log(show);
        console.log('제목 : ' + memoTitle);
        console.log('내용 : ' + memoContent);
        break;
    case 3:
        console.log(edit);
        break;
    case 4:
        console.log(del);
        break;
    case 5:
        console.log(add);
        break;
    case 6:
        console.log(del);
        break;
    default:
        console.log('없는 기능입니다.')
}