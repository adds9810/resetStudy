/* 8.파일 업로드 처리(multer) 
    - multer 모듈 : 파일업로드 받아서 특정 디렉토리에 업로드 받을 수 있도록 함
    - 내장모듈이 아니라서 터메널에서 설치 npm install multer
    - 깊이 있는 공부가 필요하면 공식문서(https://www.npmjs.com/package/multer)를 보자, 설치 하는 모듈들 모두 해당
*/
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

// 네이밍 룰 정의 함수 사용 diskStorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // 업로드 된 파일이 저장될 위치
      cb(null, "uploads"); // uploads : 폴더위치 경로
    },
    filename: function (req, file, cb) {
        // 업로드 된 파일의 이름 규칙을 정함
        cb(null, new Date().valueOf() + path.extname(file.originalname)); // 시스템 시간으로 파일이름을 변경해서 저장 / path.extname(file.originalname) 확장자명 가젿오기
    },
});

const upload = multer({ storage: storage }); // 업로드 실행시 stroage사용 설정

// 단일파일 업로드 .single("") 하나의 파일을 받겠다는 선언, 실무에서는 .single 사용, 업로드는 여러개하더라도 받는건 1개씩 받게 함
app.post("/api/attachment", upload.array("attachment"), async (req, res) => {
    res.send(req.files); // req.file 미들웨어를 등록했기에 사용 가능
});
// 미들웨어 모듈 :경로와 싱행함수 중간에 삽입할 수 있는 모듈, 필요할 라우터에 미들웨어 정의해서 사용
// "api/attachment" 경로, upload.single("attachment") 받을 key

// 멀티 파일 업로드 하나의 키명으로 동시에 여러개 파일을 받을 때 .array 사용(res.files로 험깨 사용)
app.post("/api/attachments", upload.array("attachments"), async (req, res) => {
    res.send(req.files);
  });

app.listen(3000, () => {
    console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

// postman에서 postAttachment 추가 및 실행
// post, form-data, key file로 수정 
// 결과 화면으로 정보 확인할 수 있음
/*
    - 나중에 정보를 찾기 위해 업로드하면 관련 정보를 db에 저장하도록 함
    - 이미지, 엑셀파일 등 업로드에 유용
    { 
        "fieldname": "attachment",
        "originalname": "당근마켓 ERD.png",
        "encoding": "7bit",
        "mimetype": "image/png", 홪아자
        "destination": "uploads",
        "filename": "1664557737885.png",
        "path": "uploads\\1664557737885.png",
        "size": 157524
    } 
*/