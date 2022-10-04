/* 6-1. Express 라우터 잡는 방법 */

const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작되었습니다.");
});

// get - 경로를 잡아도 되고 정규식 사용해도 되고
// http://localhost:3000/abcd
// http://localhost:3000/acd
// ? - ? 바로 앞에 문자가 0개 혹은 1개
// app.get("/ab?cd", (req, res) => {
//   res.send("ab?cd");
// });
// 서버 실행하고 postman에서 getRoute 생성

// http://localhost:3000/abcd
// http://localhost:3000/abbcd
// http://localhost:3000/abbbcd
// + - + 바로 앞에 문자가 1개 이상
// app.get("/ab+cd",(req, res) => {
//     res.send("ab+cd");
// });
// 서버 실행하고 postman에서 getRoute 으로 확인

// 정규식 : a 문자가 들어 있으면
app.get(/a/, (req, res) =>{
    res.send("/a/");
});
// 서버 실행하고 postman에서 getRoute 으로 확인
// 라우트를 필요시마다 작성하는 것이 아니라 모듈 형태로 작성하고 관리
// routes 폴더 및 product.js 생성