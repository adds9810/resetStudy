/* 5-1 .MySQL 연동하기 : MySQL 연동 및 실제 데이터 전송 수정
    * npm mysql(https://www.npmjs.com/package/mysql) 설치 : npm i mysql
    * package.json 생성, npm init 실행으로 정보 입력 후 생성, 그다음에 사용하고자 하는 모듈을 설치해야 한다.
    * mysql 폴더 및 index.js 추가, npm 문서 소개에 기본 작성법이 나와 있다 처음에는 그걸보고 시작하자 -> connection_sample.js으로 이동

   5-4. 작성한 쿼리문을 가져와 사용하기
*/
const express = require('express');
const app =express();
const port = 3000;

// app.get("env")

/* 5-6. .env에 설정한 dotenv 가져오기 선언, mysql변수보다 위에 있어야 함 */
// 5-8. app.get("env") 불러오면 package.json에 명령어 NODE_ENV=test를 받아옴, 아래 환경 변수를 받아올 수 있도록 추가, 이 변수 때문에 package.json에 작성한 명령어로 실행해야함
require("dotenv").config({path: `mysql/.env.${app.get("env")}` })

const mysql = require("./mysql"); // 지정한 폴더 안의 index.js을 홀줄할 때는 index.js 생략가능

app.use(express.json({
    limit: "50mb" 
}));

app.listen(port, () => {
    console.log("서버가 포트 3000번으로 시작되었습니다.");
});

// 데이터 받기 - 데이터 받기
app.get('/api/products',async(req, res) => {
    const productList = await mysql.query("productList");
    res.send(productList);
});// 데이터 받기, 데이터 호출 완료시까지 기다리지 않고 다음 작업을 할 수 있도록 asyn 사용
// 터이널에서 해당 파일 실행
// postman에서 getProducts 생성 및 데이터 호출

// 위와 같은 방법으로 제품 카테고리 가져오기
app.get("/api/categories", async(req,res) => {
    const categoryList = await mysql.query("categoryList");
    res.send(categoryList);
});

// 특정 카테고리 호출
app.get("/api/category/:product_category_id", async (req, res) => {
    const product_category_id = req.params.product_category_id;
    const categoryList = await mysql.query("categoryDetail", product_category_id);
    res.send(categoryList);
    // res.send(categoryList[0]);
});
// 서버 재실행 및 postman에 getcategory(http://localhost:3000/api/category/1) 추가, send 클릭
  

// 제품 카테고리에 데이터 전달하기, postman에 getcategories 추가
app.post("/api/category", async(req, res) => {
    const results = await mysql.query("categoryInsert", req.body.param); // 전달할 데이터
    res.send(results);
});

// 서버 재실행 및 postman에 postCategory(http://localhost:3000/category) 추가 및 받을 데이터 입력, send 클릭

// 데이터 업데이트 쿼리만들기
app.put("/api/category/:product_category_id", async(req, res) => { // /:product_category_id 업데이트 받을 파라미터 
    const product_category_id = req.params.product_category_id;
    const result = await mysql.query("categoryUpdate", [
      req.body.param, // 전달받을 데이터
      product_category_id, // 전송할 데이터(수정할 id)
    ]);

    res.send(result);
});

// postman putCategory 생성, put,http://localhost:3000/api/category/3(수정할 id), body/raw/json 선택 수정할 내용 입력 및 send 클릭

// 데이터 삭제
app.delete("/api/category/:product_category_id", async(req, res) => { 
    const product_category_id = req.params.product_category_id;
    const result = await mysql.query("categoryDelete", product_category_id);

    res.send(result);
});
// postman deleteCategory 생성, put,http://localhost:3000/api/category/3(삭제할 id)
// mysql 혹은 getcategories에서 삭제 여부 확인

/* 5-9. 강의 진행 요약 
    - MySQL 연동하기
    - sql.js에 쿼리 추가
    - 필요한 라우트 추가, 데이터 전달, 추가, 수정, 삭제
*/