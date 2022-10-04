// 4.Express 웹 서버 구축하기
// 서버를 구축하고 실무에서 사용하는 대표적인 기능들에 대해 이해
// node 내장 모듈이 아닌 Express 설치 및 실행 : 터미널에서 npm i express 설치
// Express를 사용하기 위해 여러 모듈을 이용, 때문에 참조 모듈까지 설치됨
const express = require("express");
const app = express();
const port = 3000;

app.use(
    express.json({
        limit: "50mb", // 최대 50메가
    })
); // post의 json body안의 데이터를 받고자 할때 선언, json 데이터 받을 때 파일 제한

app.listen(port, () => { // 정상적으로 실행되었을 때 함수
    console.log("서버가 포트 3000번으로 시작되었습니다.");
});

// 라우터 (주소+http method) 
// 클라이언트와 서버간의 네트워크 통신시 어떤 정보를 호출할건지, 각각의 서버 주소에 기능항 특장 코드 작성
// 각각의 라우터마다 특정 기능을 함, http get, post, post 등을 받을때 어떻게 할 것인지 정의
// (주소+http method) 에 따라 기능이 정의 매핑됨
app.get("/",(req, res) => {
    res.send("Hello World"); // 정상적으로 받아왔을 경우 메세지 보낼 수 있음
});

// http://localhost:3000/customers get
app.get("/customers", (req, res) => {
    // db에 있는 고객 정보를 조회하고 클라이언트로 응답
    const customers = [
      { name: "John Doe", email: "john@gmail.com" },
      { name: "Jane Doe", email: "jane@gmail.com" },
    ];
    res.send(customers);
  });

  // postman 설치(https://www.postman.com/) - 데이터 통신이 잘 되는지 확인할때 사용하면 유용, api 테스트 등 다양하게 사용가능, 필요에 따라 클라이언트, 서버 역할 지정해 사용가능
  // node.js에서는 라우터 정상 작동 여부 확인 가능
  // os환경에 맞게 설치 - 회원가입 후 실행
  // 콜렉션 추가 후 이름 바꾸기
  // 추가한 콜렉션에서 마우스 우클릭 add request 선택 getRoot이름으로 정의
  // 우측 화면에서 원하는 통신? 선택
  // 서버를 실행시킨 후 해당 서버 주소를 입력 후 send 클릭, 정상 출력 여부 확인
  // 같은 방법으로 getCoustomers추가 
  // 바닐라js의 경우 패치 api통신에 사용가능

  // getCustomer에서 특정 id만 받기
  // postman url은 http://localhost:3000/customer/1(받을 아이디값) 임력
  // /:id == params.id, params.id를 받음, 파라미터 키명
app.get("/customer/:id", (req, res) => {
    const id = parseInt(req.params.id); // 정보가 담긴 req 객체, req.params.id만 받으면 문자로 인식해서, parseInt를 감싼다
    console.log("id", id);
    // db에 있는 고객 정보를 조회하고 클라이언트로 응답
    const customers = [
        { id: 1, name: "John Doe", email: "john@gmail.com" },
        { id: 2, name: "Jane Doe", email: "jane@gmail.com" },
    ];

    const customer = customers.filter((c) => c.id === id); // 전달받은 아이디 하나만 필터링되도록 
    if (customer.length > 0) res.status(200).send(customer[0]); // 값이 있을 때, 원하는 코드를 추가해서 전달할 수 있음
    else {//  값이 없을 때, 원하는 코드를 추가해서 전달할 수 있음
        res.status(401).send({ msg: "존재 하지 않는 ID 입니다." });
    }
});
// 소스가 수정되어 서버 재실행

// post일 경우, postman에서 body에 작성해 전송할 수 있음
// 라우터로 쉽게 웹서버 만들 수 있음

// post 방식
// postman에서 postCustomer추가 
// post 선택 및 http://localhost:3000/customer 입력
// body > raw > json 선택
// "key":"value"형식으로 추가
// 데이터를 한번에 받기 위애 "param"로 감싸서 보낸다
app.post("/customer", (req, res) => {
    console.log(req.body.param); // 요청받은 것의 body 표시
  
    // 데이터베이스에 저장 코드
  
    res.send("Ok");
});

// node.js를 이용하면 가볍고 빠르게 웹서버 구현가능
// express 설치 및 실행으로 웹서버 구현
// 라우터 클라이언트와 웹서버가 통신하기 위한 하나의 주소값, data문? (주소+http method) 으로 구성
  