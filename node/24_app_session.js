/* 15.Express 로그인 세션 관리(express-session) 
    - 클라이언트 서버에 통신 유지를 해줌
*/

// HTTP 통신
// 비 연결지향(Connectionless) - 클라이언트에서 서버로 요청(request), 서버가 요청에 대한 응답(response)을 클라이언트로 보내고 난 후 연결이 종료됨
// 상태정보유지를 안함(Stateless) - 통신 이후 바로 연결이 종료되기 때문에 서버는 클라이언트의 상태를 알 수 없다.

// 로그인-클라이언트와 서버간의 로그인 상태를 유지
// 세션, 쿠키를 사용하게 됨

// 쿠키 - 클라리언트에 저장 (key-value)
// 쿠키이름, 값, 만료시간, 전송할 도메인명, 보안 연결 여부 등
// 1. 클라이언트에서 로그인
// 2. 서버가 이 로그인 유효한지 검증하고, 맞다면 응답헤더에 쿠키정보를 넣어서 보내요. 이게 클라이언트 쿠키에 저장됨
// 3. 클라이언트가 서버에 요청할 때 마다 쿠키 정보를 같이 헤더에 넣어서 보내는 거예요.
// 4. s.id 혹은 sessionid

// 세션 - 브라우저가 종료되기 전까지 클라이언트의 요청을 유지하게 해주는 기술
// 세션 정보를 expess-session로 관리

const expess = require("express");
// 터미널에서 npm install express-session 설치 실행
const session = require("express-session");
// 터미널에서 npm install cookie-parser 설치 실행
const cookieParser = require("cookie-parser");
const app = expess();

app.use(expess.json({
    limit:"50mb"
}));

app.use(cookieParser()); // cookieParser 사용선언

// session 사용 선언
const sess = { 
    secret: "secret key", // 암호화 할 키, 암호화되기 때문에 아무거나 적어도 상관없다.
    resave: false, // 세션에 변경사항이 없어도 항상 다시 저장할지에 대한 여부
    saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 강제로 저장할지에 대한 여부
    cookie: { // 서버에 실어 보낼 쿠키에 대한 설정
      httpOnly: false, // document.cookie 하면 쿠키 정보를 볼 수 없음
      secure: false, //true - https
      maxAge: 1000 * 60 * 60, // 쿠키가 유지되는 시간
    },
}
// 환경변수를 필요에 따라 사용하면서 변수를 변경하기 위해 선언(아래는 예시)
// if(app.get("env") === "prod") {
// sess.cookie.secure = true;

app.use(session(sess));

app.listen(3000, () => {
    console.log("서버가 포트 3000번으로 시작 되었습니다.");
})

// 로그인 예시
app.post("/login", (req, res) => {
    const { email, pw } = req.body.param;
    // 데이터베이스에 전달받은 이메일 주소와 비밀번호에 맞는 사용자가 있는 체크
    // 로그인
  req.session.email = email;
  req.session.isLogined = true;
  req.session.save((err) => { // 로그인 정보 저장
    if (err) throw err;

    res.send(req.session);
  });
});

// 순서 중요, 거처가야 하는 함수 앞에 두어야함, 로그인인 거처갈 필요가 없어 로그인 뒤에 둠
app.all("*", (req, res, next) => { // all : get, post 등 모든 메소드 허용 / * : 모든 path 포함해 거처감 / next가 추가되면 이 함수 다음에 거쳐가야할 함수가 실행됨
    if(req.session.email){
        console.log(req.cookies); // 로그인시 쿠키정보 확인
        next(); // 세션에 정보다 있다면 다음 함수 실행
    }else{
        res.send("로그인 이후 이용 가능합니다.");
        // res.redirect("/login"); // 정보가 없으면 로그인 페이지로 이동됨
    }
});

app.post("/logout", (req, res) => {
    if(req.session.email){ // 로그인이 되어 있다면?
        req.session.destroy(); // 정보 삭제
        res.redirect("login"); // 클라이언트 로그인 페이지로 이동
    }
});

app.get("/test",(req, res) => {
    if(req.session.email){ // 정보기 저장되어 있다면 정상 확인
        res.send("Ok");
    }
});

// app.get("/api/customers", (req, res) => {
//     if(req.session.email) {
//         res.send("Ok");
//     }
// });

// app.post("/api/customer", (req, res) => {
//     if(req.session.email) {
//         res.send("Ok");
//     }
// });

// 서버 실행 및 postman에서 postLogin에서 로그인실행, postLogout 로그아웃 실행, getTest 로그인 여부 호출
// node express에서 로그인 세션처리를 위한 방법