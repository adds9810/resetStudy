/* 11-2. 로그관리 
    - 시스템 운영에 있어 다양한 로그 관리가 중요 
    - 예지치 않은 오류, 접근 로그 등을 기록해 두면 확인하고 활용하기 유용
    - npm i app-root-path : 앱이 실행되는 프로젝트 루트를 찾아줌, 앱을 실행하는 폴더에 설치해야함
*/
const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file"); // 로그 파일을 일자별로 생성하기 위해서
const appRoot = require("app-root-path");
const { createLogger } = require("winston");
const process = require("process");

const logDir = `${appRoot}/logs`; // logs 디렉토리 하위에 로그 파일 저장

const { combine, timestamp, label, printf } = winston.format; // winston.format의 내부 모듈을 가져옴

const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`; // 로그 출력 포맷 정의
    // label : 시스템 네임, level : 정보,에러, 네임? 인지 구분, message :개발자가 남긴 로그 메세지
});

const logger = createLogger({
    format: combine(label({ label: "NODE_PROJECT" }), timestamp(), logFormat), // 여러개를 합한 것?, 포맷 종류에는 심플과combine 있음, winston이용시에는 combine을 주로 인용
    transports: [
        new winstonDaily({
          level: "info",
          datePattern: "YYYY-MM-DD", // 날짜포맷방식
          dirname: logDir,
          filename: "%DATE%.log", // %DATE% - 자동으로 날짜가 들어옴
          maxSize: "20m", // 로그파일 크기, 정의하지 않으면 데이터가 쌓이고, 제안하면 초과시 앞의 데이터를 지움
          maxFiles: "30d", // 최근 30일치 로그 파일만 보관
        }),
        new winstonDaily({
          level: "error",
          datePattern: "YYYY-MM-DD",
          dirname: logDir,
          filename: "%DATE%.error.log", // 에러파일을 구분해 별도보관
          maxSize: "20m", // 로그파일 크기
          maxFiles: "30d", // 최근 30일치 로그 파일만 보관
        }),
      ],
});

if (process.env.NODE_ENV != "prod") { // NODE_ENV환경 설정가능, 환경이 prod가 아닐 경우(개발환경일 경우), process 모듈을 통해 터미널 창에 로그를 확인할 수 있도록 설정
    logger.add(
    new winston.transports.Console({
        format: winston.format.combine(
        winston.format.colorize(), // 로그 출력시 구분할 수 있도록 색상 추가
        winston.format.simple() // 메세지 형태를 단순하게 설정, 운영이 아닐 경우 폴더와 터미널창에서 로그를 확인할 수 있도록
        ),
    })
    );
}

module.exports = logger; // logger 내보내기
    