// express 모듈을 사용해서 웹 서버 구축
const express = require("express");
const session = require("express-session");
const app = express();

// mysql 설정, npm ~에 따라서 $app.get("env")에 받아와 접속 정보 연결
require("dotenv").config({ path: `mysql/.env.${app.get("env")}` });
const mysql = require("./mysql"); // index.js 가져오기

// nodemailer 설정
require("dotenv").config({ path: `nodemailer/.env.${app.get("env")}` });
const nodemailer = require("./nodemailer"); // index.js 가져오기

// mongoose 모듈로 몽고DB 설정
require("dotenv").config({ path: `mongoose/.env.${app.get("env")}` });
const mongodb = require("./mongoose"); // index.js 가져오기

// winston 로그 관리 설정
const logger = require("./winston/logger");

// CORS 설정 - 서로 다른 origin 처리
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use("/static", express.static("public")); // 저장한 이미지를 /static에서 확인할 수 있게 함

// 세션처리
const sess = {
  secret: "secret key",
  resave: false, // 세션에 변경사항이 없어도 항상 다시 저장할지에 대한 여부
  saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 강제로 저장할지에 대한 여부
  cookie: {
    httpOnly: false, // document.cookie 하면 쿠키 정보를 볼 수 없음
    secure: false, //true - https
    maxAge: 1000 * 60 * 60, // 쿠키가 유지되는 시간
  },
};

if (app.get("env") === "prod") {
  sess.cookie.secure = true;
}

app.use(session(sess));

app.listen(3000, () => {
  logger.info("서버가 포트 3000번으로 시작 되었습니다.");
});

app.post("/login", (req, res) => {
  const { email, pw } = req.body.param;
  // 데이터베이스에 전달받은 이메일 주소와 비밀번호에 맞는 사용자가 있는 체크
  // 로그인
  req.session.email = email;
  req.session.isLogined = true;
  req.session.save((err) => {
    if (err) throw err;

    res.send(req.session);
  });
});

// app.all("*", (req, res, next) => {
//   if (req.session.email) {
//     console.log(req.cookies);
//     next();
//   } else {
//     res.send("로그인 이후 이용 가능합니다.");
//     // res.redirect("/login");
//   }
// });

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login"); // client 로그인 페이지 경로
});

const fileRoute = require("./routes/file");
app.use("/api/upload", fileRoute);

// 라우트는 필요할때 이 파일을 바탕으로 추가해 사용 가능
const categoryRoute = require("./routes/category");
app.use("/api/category", categoryRoute);
