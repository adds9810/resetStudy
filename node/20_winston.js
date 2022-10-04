/* 11-1. 개발자 로그 관리(winston)
    - 실무에서 개발자가 의도적으로 남긴 로그관리를 하기 위해서 사용하는 모듈
    1. npm i winston, npm i winston-daily-rotate-file(확장모듈, 일자별로 관리), npm i app-root-path 설치
    2. winston 폴더 및 logger 파일생성

   11-3. morgan과의 차이 : 
   - morgan : 응답이 일어났을 때 로그에 대한 기록이 자동으로 이루어짐
   - winston : 개발자가 의도적으로 정의하고 로그 남길 수 있음
   
*/

const logger = require("./winston/logger");

logger.info("Hello world!"); // 상위 레벨의 로그가 저장됨
logger.error("고객 정보 저장 중 에러가 발생했습니다."); // 에러에 해당되는 로그만 저장됨

// try catch와 함께 사용해 에러를 저장해 두고 나중에 확인하는데 용이
// winston : 개발자가 남긴 로그를 확인하는데 용이, 시스템을 개발할때 로그관리에 유용하게 사용할 수 있는 모듈
