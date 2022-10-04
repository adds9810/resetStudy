/* 5-2 npm 문서 소개에 기본 작성법을 참고해 연결해보기 */
const mysql      = require('mysql');
const connection = mysql.createConnection({ // 데이터를 연결하기 위한 커넥션 함수, 아래는 mysql 생성시 추가했던 정보 입력하면 됨
  host     : 'localhost',
  port : 3306,
  user     : 'root',
  password : '3792',
  database : 'dev'
});
 
connection.connect(); // SQL 연결
 
connection.query('SELECT * FROM PRODUCT', function (error, results, fields) { // 쿼리문 실행 - 데이터 호출
  if (error) throw error; // 에러처리
  console.log(results);
});
 
connection.end(); // connect을 연결하고 쿼리 실행을 끝내면 종료 시켜줘야 함, 쌓여셔 서버가 죽을 수 있음

// 해당페이지가 실행되도록 터미널에서 실행
// 실무에서는 mysql.create풀?을 만들어두고 연결해 실행