/* 10.HTTP 응답 로그 관리(morgan) 
    - 중요한 정보, 에러 로그 등을 관리하기 위해 사용
    - 시스템을 운영하면서 다양한 메세지 관리 - 로그관리
    - morgan 모듈 설치 npm install morgan, 공식문서를 보고 필요한 기능을 가져와서 사용하자
    - 로그 파일을 지정한 특정 시점에 새로 생성해 저장해줌(npm install rotating-file-stream), 하나의 파일에 관리하면 무거워짐
*/
const express = require("express");
const app = express();
const fs = require("fs"); // 파일관련
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path"); // 위치관련

// 로그관리
// 개발자에 의해서 의도적으로 기록하는 메시지
// 시스템을 운영하면서 발생하는 예기치 못한 에러

// rfs에서 지정한 파일 생성 시간 간격에 따른 로그 파일명을 반환 - 실무에서 많이 사용, 지나치지 않고 저장해 두었다가 확인하고자 
const generator = (time, index) =>{
    if(!time) return "file.log"; // 생성이 안되어 있을 경우
    
    //현재 시스템 시간 가져오기
    const yearmonth = time.getFullYear() + (time.getMonth() + 1).toString().padStart(2, "0");
    const day = time.getDate().toString().padStart(2, "0");
    const hour = time.getHours().toString().padStart(2, "0");
    const minute = time.getMinutes().toString().padStart(2, "0");

    return `${yearmonth}${path.sep}${yearmonth}${day}-${hour}${minute}-${index}-file.log`; // 같은 간격냐에서 파일이 생성된 경우, index로 순서 정리
}

const accessLogStream = rfs.createStream(generator, { // createStream(파일이름, 옵션)
    interval : "1m", // 1d 생성 간격
    size : "10M",// 파일 1개당 최대 크기, 오버되면 추가 생성됨, 너무 크면 로딩이 오래걸림
    path:path.join(__dirname, "log") // __dirname 디렉토리 폴더명 / "log" 를 join으로 합침
});

// app.use(morgan("combined", { stream: accessLogStream }));

app.use(
    morgan("combined", {
      stream: accessLogStream,
      // skip: function (req, res) { 스킵 가능
      //   return res.statusCode < 400; // 정상적인 응답인 경우는 로그를 기록하지 않음. => 에러인 경우만 로그 기록
      // },
    })  
);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("서버가 포트 3000번으로 시작 되었습니다.");
});
// 서버 실행 후 폴더 및 파일이 생성됨
// morgan : HTTP 응답에 대해서만 로그를 기록하는 방식, 응답외의 다양한 메세지를 기록하고 싶다면 다른 모듈을 설치해야함