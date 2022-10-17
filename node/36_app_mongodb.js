/* 28.MongoDB 연결하기(mongodb)
    1. MongoDB 컴퍼스 실행 데이터 추가(노션 캡쳐자료 바탕으로 정리)
    2. MongoDB/.env 생성 및 설정한 접속정보 입력
    3. index.js 파일 추가 및 모듈 설치 npm install mongodb
    5. 앱 실행, 몽고디비에 연결하기 위한 외부 모듈 가져오기
*/
const express = require("express");
require("dotenv").config({ path: "mongodb/.env" });
const mongoDB = require("./mongodb");
const app = express();

// 앱실행을 위한 함수 구현
app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(3000, () => {
  console.log("서버가 3000번 포트로 시작 되었습니다.");
});

// 데이터 조회, 추가, 수정, 삭제 구현

// 데이터 조회
app.get("/api/customers", async (req, res) => {
  const customers = await mongoDB.find("customers"); // find(컬렉션 이름)
  res.send(customers);
});
// 서버 실행 후 postman getCustomersWithMongo 테스트

// 28-10. 조건검색
app.get("/api/customer/:_id", async (req, res) => {
  const customer = await mongoDB.findById("customers", req.params._id);
  res.send(customer);
});
// 서버 실행 후 postman getCustomersWithMongo 테스트

// 28-6. index.js insertOne 함수 작성 및 작성 함수 구현
app.post("/api/customer", async (req, res) => {
  const r = await mongoDB.insertOne("customers", req.body.param); // customers db에 전달받은 req.body.param을 보냄
  res.send(r);
});
// 서버 실행 후 postman postCustomerMongoDB 테스트

// 28-7. index.js insertMany 함수 작성 및 작성 함수 구현
app.post("/api/customers", async (req, res) => {
  const r = await mongoDB.insertMany("customers", req.body.param); // customers db에 전달받은 req.body.param을 보냄
  res.send(r);
});
// 서버 실행 후 postman postCustomersMongoDB 테스트

// 28-8. index.js updateById 함수 작성 및 작성 함수 구현
app.put("/api/customer/:_id", async (req, res) => {
  const r = await mongoDB.updateById(
    "customers",
    req.body.param, // 수정한 데이터
    req.params._id //수정할 id
  );
  res.send(r);
});
// 서버 실행 후 postman putCustomerMongoDB 테스트

// 28-9. index.js deleteById 함수 작성 및 작성 함수 구현
app.delete("/api/customer/:_id", async (req, res) => {
  const r = await mongoDB.deleteById("customers", req.params._id); // 삭제할 id
  res.send(r);
});
// 서버 실행 후 postman deleteCustomerMongoDB 테스트

// 몽고디비 연결, 조회 생성, 수정 삭제 구현
// 함수 기능들을 외우기 보단 그때그때 찾아서 사용하는 편
