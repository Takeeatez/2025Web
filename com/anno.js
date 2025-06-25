const firstNumber = 10;
// 첫번째숫자 10 할당
const secondNumber = 5;
// 두번째숫자 5 할당
const operator = '+';
// 연산자 + 할당

let result;

// 연산자의 조건에 따라 분기하는 switch문 작성
switch (operator) {
    case '+':
        result = firstNumber + secondNumber;
        break;
    case '-':
        result = firstNumber - secondNumber;
        break;
    case '*':
        result = firstNumber * secondNumber;
        break;
    case '/':
        result = firstNumber / secondNumber;
        break;
    default:
        result = '유효하지 않은 연산자입니다.';
}

console.log(`결과: ${result}`);