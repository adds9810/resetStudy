// 29. mongoose : mysql로 비유하면 sequelize과 같은 것
// 몽고디비는 쿼리 개념이 아니고 함수로 사용하기 때문에 mysql을 sequelize이용하듯 실무에서는 몽구스를 이용해 사용
// 1. 터미널에 설치 npm install mongoose
// 2. mongoose/index.js파일 생성 및 작성
// 6. 몽구수 연결 함수 구현
const express = require("express");
require("dotenv").config({ path: "mongodb/.env" });
const mongoDB = require("./mongoose"); //index.js
const Customer = require("./mongoose/schemas/customer");
const app = express();

// 몽고디비 연결 함수
mongoDB.connect();

app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(3000, () => {
  console.log("서버가 3000번 포트로 시작 되었습니다.");
});

// mongoose를 사용한 전체조회
// mongoose 사용한 전체조회 find() : 몽고 사용법과 유사 mongoose 문서를 확인해서 사용하자
app.get("/api/customers", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

// 데이터 등록 create();
app.post("/api/customer", async (req, res) => {
  const r = await Customer.create(req.body.param);
  res.send(r);
});

// 7. 서버 실행 후 postman getCustomersMongoose 조회 테스트
// 8. postman postCustomersMongoose 작성 테스트
// 몽고 디비와 몽구스는 mysql보다 사용비중이 적음, 많이 사용한다면 외우고, 그게 아니라면 공식문서에서 필요할 때마다 찾아서 사용하자
// 쿼리 없고 간단한 조회 생성 삭제 수정에 사용해서 찾아서 사용하는 게 좋을 것 같음
