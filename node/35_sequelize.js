// 26. Sequelize
// 강사가 추천하는 방식(이전에 강의 진행 방식) : mysql를 연동해 호출 추가, 수정 삭제 / mysql/index.js에 접속정보 기록 쿼리 함수 구현 / sql.js에 사용할 쿼리문 구현 및 저장 
// 많은 개발자들이 사용하는 방식 Sequelize를 사용한 mysql 연동

// 1. 모듈 설치 npm install sequelize, mysql2 / npm install -g sequelize-cli(전역설치 필요)
// Sequelize는 MySQL, MariaDB, MS SQL 등과 같은 RDBMS 데이터베이스를 위한 promise 기반의
// Node.js ORM 도구
// ORM - Object Relational Mapping
// 자바스크립트 객체와 데이터베이스를 별도의 쿼리문 작성 없이도 데이터베이스의 데이터를 손쉽게 조작(호출, 생성 등...)할 수 있도록 맵핑
// 쿼리문 구현 없이도 쉽게 불러오기 생성등이 가능에 개발실무에서 많이 사용
// 그러나 고전을 이용해 사용하는 권장, Sequelize는 간단한 사용법만 해볼 예정
// sequelize-cli : sequelize명령어를 사용해 쉽게 쿼리를 불러올 수 있게 함
// sequelize-cli 파일생성 sequelize init / config/config.json, models/index.js 생성 확인
// config/config.json : mysql 데이터 정보를 관리하기 위한 파일, test,dev,prod로 구분해 관리할 수 있도록 자동으로 생성해줌
// 26-2. config/config.json development 부분 수정
// 26-3. models/index.js 소스 분석
// 26-4. 터미널에서 sequelize-cli 실행으로 models안에 파일 추가 : sequelize-cli model:generate --name(파일이름명) categories --attributes(가져올 col 이름:속성) product_category_id:integer,category_name:string,category_description:string,use_yn:string
// 26-5. models/categories.js 확인

// 26-9. 실행을 위한 코드 구현
const express = require("express");
const app = express();
const sequelize = require("./models").sequelize; // ./models 파일에 설정한 내용들 불러오기

// 26-12. 데이터를 받기위한 설정
app.use(
    express.json({
      limit: "50mb",
    })
);

sequelize.sync(); // 모델에 정의한 테이블이 만약에 없다면, 테이블을 생성

const { product_category } = require("./models"); // product_category 테이블에 대한 sequelize 모델

app.listen(3000, () => {
    console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

// 생성 실습예제 
// 호출
app.get("/api/categories", async (req, res) => {
    const categoryList = await product_category.findAll();// findAll() 전체를 가져옴, 일부만 가져올 수도 있는데 이건 알아서..
    res.send(categoryList);
});
// postman getCategoryBySequelize 에서 테스트 get http://localhost:3000/api/categories

// 생성 
app.post("/api/categories", async (req,res) => {
    const result = await product_category.create(req.body.param); // create(json형식으로 받는 이름)생성함수
    res.send(result);
});
// postman postCategoryWithSequelize 에서 테스트 post http://localhost:3000/api/categories

// 수정 
app.put("/api/categories/:product_category_id", async (req, res) => {
    const result = await product_category.update(req.body.param, { // update(json데이터, 조건문) : 수정 함수
      where: { product_category_id: req.params.product_category_id }, // roduct_category_id와 동일한 req.params.product_category_id을 수정
    }); 
    res.send(result);
  });
// postman putCategoryWithSequelize 에서 테스트 put http://localhost:3000/api/categories/3

// 삭제
app.delete("/api/categories/:product_category_id", async (req, res) => {
    const result = await product_category.destroy({ // destroy : 삭제함수
      where: { product_category_id: req.params.product_category_id },
    });
    res.send({ result: result });
  });
// postman putCategoryWithSequelize 에서 테스트 delete http://localhost:3000/api/categories/3

// 마무리
// sequelize를 활용한 mysql 연동 
// sequelize는 쿼리문을 사용하지 않는다. 그러나 쿼리문을 사용할 수 있어야 한다. 때문에 sequelize 사용보다는 직접 쿼리문을 사용하는 것을 권장
// 쿼리문을 잘 짤 수 있다면 편하게 사용하는 방법으로 sequelize를 선택하는 것을 권장
// sequelize만의 장점도 있으니 선택적으로 사용하자