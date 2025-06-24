// Q1
// 샌드위치 만드는 알고리즘
console.log('Quest 1.');
console.log('샌드위치 만드는법');
let first = '1단계, 식빵 두 개를 준비한다.';
let second = '땅콩버터 바를 칼(버터 칼)이랑 땅콩버터를 준비한다.';
let third = '땅콩버터잼 뚜껑을 열고 땅콩버터를 버터칼에 바른다.';
let four = '땅콩버터가 발려진 버터칼로 식빵의 면에 얇게 펴바른다.';

console.log(first + '\n' + second + '\n' + third + '\n' + four);

// Q2
let hour = 8; 

// if 문으로 조건 분기
console.log('\nQuest 2.');
if (hour >= 7 && hour <= 9) {
  console.log('아침 식사 시간');
} else if (hour >= 12 && hour <= 14) {
  console.log('점심 시간');
} else if (hour >= 18 && hour <= 20) {
  console.log('저녁 식사 시간');
} else {
  console.log('식사 금지');
}

// Q3
// switch 문으로 조건 분기
const operator = '*';
console.log('\nQuest 3.');
switch(operator){
    case '+':
        console.log('더하기');
        break;
    case '-':
        console.log('빼기');
        break;
    case '*':
        console.log('곱하기');
        break;
    case '/':
        console.log('나누기');
        break;
    default:
        '연산 기호가 아님';
}

// 과제
let write = '1. 작성';
let show = '2. 조회';
let edit = '3. 수정';
let del = '4. 삭제';
let add = '5. 추가기능';
let quit = '6. 종료';

console.log(write + ' ' + show + ' ' + edit + ' ' + del + ' ' + add + ' ' + quit);
const userSelect = 1;

switch(userSelect){
    case 1:
        console.log(write);
        break;
    case 2:
        console.log(show);
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

