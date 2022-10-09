/* 14. 파일 다운로드 : 게시판 첨부파일 다운로드
    - ./uploads/안의 파일을 다운로드 해보기 예제
    - node.js에서는 다양한 모듈로 편한하고 안정적으로 기능구현이 가능
*/
// 앱 실행
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const mime = require("mime"); // 추가 모듈 설치 필요 npm install mime

app.listen(3000, () => {
    console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

// 호출문
app.get("/file/:filename", (req, res) => {
    const file = "./uploads/" + req.params.filename;
    try {
      if (fs.existsSync(file)) {
            // 1. express를 사용하지 않는 경우에는 아래와 같이 작성, 자바에서도 비슷한 유형으로 사용가능
            // const mimetype = mime.getType(file);
            // const filename = path.basename(file); // 파일 이름만 가져옴
            // res.setHeader("Content-disposition", "attachment; filename=" + filename); // 다운로드 되는 파일명
            // res.setHeader("Content-Type", mimetype); // 파일 형식 지정
            // const filestream = fs.createReadStream(file); // 업로드의 파일을 읽어들임
            // filestream.pipe(res); // 읽은 파일은 res객체에 넣어준다

            // 2. res 객체 안의 download 함수 사용으로 다운로드
            res.download(file);
        }else{ // 요청한 파일이 없는 경우
            res.send("요청한 파일이 존재하지 않습니다.");
    }
  } catch (e) {
    console.log(e);
    res.send("파일을 다운로드 하는 중 에러가 발생했습니다.");
  }
});

// 서버 실행 후 브라우저에서 파일 다운로드 받기 테스트
// http://localhost:3000/file/:filename(다운로드 파일명)