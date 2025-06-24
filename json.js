import readlineSyncModule from 'readline-sync';
import fileSystem from 'fs';

// 사용자 입력 받기
const userName = readlineSyncModule.question('이름 입력 : ');
const userAge = parseInt(readlineSyncModule.question('나이 입력 : '));
const userEmail = readlineSyncModule.question('이메일 입력 : ');
const userNumber = readlineSyncModule.question('전화번호 입력 : ');

// 파일에 저장
fileSystem.writeFileSync(
        'myinfo.json',
    JSON.stringify({
        이름: userName,
        나이: userAge,
        이메일: userEmail,
        전화번호: userNumber
    }, null, 2),
    'utf-8'
);

console.log('myInfo.json 파일이 생성되었습니다.');

// 삭제 여부 확인 
const deleteConfirm = readlineSyncModule.question('myInfo.json 파일을 삭제하시겠습니까? (y/n): ');
if (deleteConfirm.toLowerCase() === 'y') {
    fileSystem.unlinkSync('myinfo.json');
    console.log('myInfo.json 파일이 삭제되었습니다.');
}