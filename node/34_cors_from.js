// 25-2. CORS - 서로 다른 Origin의 접근을 허용하는지 확인하기 위한 서버 추가
const express = require("express");
const app = express();

app.listen(8080, () => {
    console.log("서버가 포트 8080번으로 시작 되었습니다.");
});

// 25-3. 34_cors_from.html 페이지 추가
// 25-4. 서버 접속시 34_cors_from.html 페이지로 이동하도록
app.all("*", (req, res) => {
    res.sendFile(__dirname + "/34_cors_from.html"); // 디렉토리 + 연결하고자 하는 html파일명
});
  

// 25-5. cors 적용 전 테스트  : 터미널에서 34_cors.js과 34_cors_from.js 실행, cors이 적용되지 않으면 오류가 발생한다.