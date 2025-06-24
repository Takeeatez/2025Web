import readlineSyncModule from 'readline-sync';


// Q1
const num = parseInt(readlineSyncModule.question('숫자 입력 :'));

    for(let j=0; j<=9; j++){
        console.log(num+ '*' + j + '=' + num*j );
    }

// Q2
const height = 5;
const star = '*';

for (let i = 0; i < height; i++) {
    const spaceCount = height - i - 1;
    const starCount = 2 * i + 1;
    const line = ' '.repeat(spaceCount) + star.repeat(starCount);
    console.log(line);
}

// 과제
let write = '1. 작성';
let show = '2. 조회';
let edit = '3. 수정';
let del = '4. 삭제';
let add = '5. 추가기능';
let quit = '6. 종료';

console.log(write + ' ' + show + ' ' + edit + ' ' + del + ' ' + add + ' ' + quit);

let exit = false;

while (!exit) {
    const userSelect = parseInt(readlineSyncModule.question('메뉴 선택 : '));

    switch (userSelect) {
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
            console.log(quit);
            exit = true;
            break;
        default:
            console.log('없는 기능입니다.');
    }
}