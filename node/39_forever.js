// 32.forever
// forever : 운영중에 개발시에는 발생하지 않았던 예기치 못한 에러로 인해 서버가 종료되었을 때 바로 재시작해주는 모듈
// node로 웹서버를 구축 후 forever로 재시작
// 터미널에서 설치 npm i forever
const express = require("express");
const app = express();
require("dotenv").config({ path: "mysql/.env" });
const mysql = require("./mysql");

// 앱실행을 위한 함수 구현
app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

// 호출 파일 실행 후 고의로 오류를 내서 확인해보자
app.get("/api/categories", async (req, res) => {
  const categoryList = await mysql.query("categoryList");
  res.send(categoryList);
});

// 2. forever테스트 고의적으로 오류 발생시켜 확인해보자
app.post("/api/category", async (req, res) => {
  // product_category_id, category_name, category_description
  const r = await mysql.query("categoryInsert", req.body.param);

  res.send(r);
});
// node로 실행후 오류내보기 : 서버가 종료되면 서비스를 이용할 수 없게됨
// 터미널에서 실행 node 파일명 -> forever start 파일명
// 목록 보기 forever list
// postman에서 테스트 실행
// forever stop 파일명 혹은 forever list시 나오는 pid
// 공식문서에서 필요한 내용이 있으면 수정하자
