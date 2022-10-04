/* 6-3. Express 라우터 잡는 방법 */
const express = require("express");

// db정보 가져오기
require("dotenv").config({path: "mysql/.env.test" });

const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");

const app = express();

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

app.use("/api/product", productRoute); // 제품 대표경로, 뒤에 추가할 경로
app.use("/api/category", categoryRoute); // 카테고리 대표경로
// 서버 실행하고 getProducts에서 http://localhost:3000/api/products/all 입력 및 확인 - 내꺼는 오류 나더라 복습때 확인해보자
// 라우터 패스를 각각의 기능별로 분리할 수 있음

app.use("/api/category", categoryRoute); // 카테고리 대표경로
// 서버 실행하고 getProducts에서 http://localhost:3000/api/category/all 입력 및 확인 - 내꺼는 오류 나더라 복습때 확인해보자
// 오류코드 ER_ACCESS_DENIED_ERROR: Access denied for user 'dev'@'localhost' (using password: YES)

// 일일이 작성하는 방법도 있지만 기능별로 저장해 사용하는 것을 권장, 관리에 용이