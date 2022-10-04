/* 7.정적 파일 처리 - 정적파일을 웹서버를 통해 제공하는 벙법 
    - public/images 폴더 및 임시 이미지 추가 
*/
const express = require("express");
const app = express();

// 내장함수 static(제공할 폴더 경로)
// http://localhost:3000/images/logo.jpg 로 접근이 가능해짐
// app.use(express.static("public"));
// 서버 실행하고 브라우저에서 확인

// http://localhost:3000/static/images/logo.jpg : /static 패스 추가
app.use("/static", express.static("public"));

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

// 대표적인 사용예 : 쇼필몰에 업로드 한 이미지를 서버에서 클라이언트가 접근이 가능하도록 연결해줌
