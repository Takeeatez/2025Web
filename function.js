import readlineSyncModule from 'readline-sync';

// Q1
function gugudan(num){
     for(let i=0; i<=9; i++){
        console.log(num+ '*' + i + '=' + num*i );
    }
}

const num = parseInt(readlineSyncModule.question('숫자 입력 :'));
gugudan(num);

// Q2
const num1 = parseInt(readlineSyncModule.question('첫번째 숫자 입력 : '));
const num2 = parseInt(readlineSyncModule.question('두번째 숫자 입력 : '));
const op = readlineSyncModule.question('연산자 입력 : ');

switch(op){
    case '+':
        console.log(sum(num1,num2));
        break;
    case '-':
        console.log(min(num1,num2));
        break;
    case '*':
        console.log(mul(num1,num2));
        break;
    case '/':
        console.log(div(num1,num2));
        break;
}

function sum(x,y){
    return x+y;
}

function min(x,y){
    return x-y;
}

function mul(x,y){
    return x*y;
}

function div(x,y){
    return x/y;
}

