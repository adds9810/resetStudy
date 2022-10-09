/* 5-3 createPool방식으로 mysql 연결 */
const mysql = require("mysql");
const sql = require("./sql"); // 쿼리문 가져오기 

const pool = mysql.createPool({ // createPool로 접속정보 입력
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  connectionLimit: process.env.MYSQL_LIMIT, // connectionLimit : connection 개수제한, 열고 닫는 함수 없이 10개 내에서 돌려쓰도록 설정, 처리시간이 빨라서 사용자는 느끼지 못하는 선에서 10개를 돌려서 사용
}); 

// 비동기 방식으로 처리 alias : 쿼리문의 차라미터값 , values : 전달할 데이터
const query = async (alias, values) => {
    return new Promise((resolve, reject) => {
        pool.query(sql[alias], values, (error, results) => {
            if (error) { // 에러
              console.log(error);
              reject(error);
            } else { // 정상출력
              resolve(results);
            }
        });
    });
};

module.exports = { // 내보내기
    query,
  };

  /* 5-5. 보안을 위함 dotenv 설치 및 실행
    * dotenv : 보완이 필요한 환경변수를 등록하고 노출하시 않도록 해줌
     - 터미널에서 설치 npm install dotenv
     - mysql/.env에 필요한 환경변수 추가, github에서는 해당 파일이 업로드 되지 않아 관련 정보가 노출되지 않음 보안강화, 해당 파일에 각자의 환경변수를 설정해 접속에 문제되지 않음
    
    * 5-7. 실무 팁 : mysql 폴더에 .env.test, .env.prod 생성 후 .env와 똑같은 내용 작성
     - 개발환경과 운영환경의 데이터베이스 계정이 다름. 분기 설정으로 각각에 접속시 해당하는 파일에 연결해 서버에 접속하도록 할 수 있음
     1. cross-env(env를 분기하는 모듈 설치) : 터미널에서 npm i cross-env
     2. package.json에 개발과 운영 분기에 맞게 연결되도록 명령어 작성
     "scripts": {
        "test": "cross-env NODE_ENV=test node 13_app_mysql.js",
        "prod": "cross-env NODE_ENV=prod node 13_app_mysql.js"
    }
*/