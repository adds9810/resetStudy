// 12-1 Nodemailer - 많이 사용하는 안정화된 기능
// 실무에서 대표적으로 요구되는 기능 중 하나, 없어서는 안 되는 기능
// 회원가입 인증 메일, 예약 확인 메일 등..., 신규회원을 엑셀로 취합하고 메일로 보고 할 수도 있음 

// 특징
// 다른 모듈에 의존성이 없는 모듈 : 추가로 설치되는 모듈이 없음
// 유니코드를 지원함 - 영어 뿐만 아니라, 한국어, 중국어 등  다양한 언어로 메일을 작성할 수  있음.
// 파일 첨부 기능
// 이메일 본문에 일반 텍스트 뿐만 아니라, HTML 삽입이 가능
// OAuth2 - 보완관련
// SMTP(이메일 서버) 연결을 위한 프록시 사용 가능

/* 개인은 지메일을 사용해 메일을 받을 수 있도록 지원
    0. npm install nodemailer --save 설치
    1. 구글 계정으로 접속 https://myaccount.google.com/
    2. 좌측 탭에서 보안메뉴 클릭
    3. 2단계 인증 활성화(비밀번호 확인)
    4. 2단계 인증 활성화 후 앱 비밀번호 클릭(비밀번호 확인)
    5. 앱선택 : 메일 / 기기 선택 : 사용하는 기기 선택
    6. 발급받은 앱 비밀번호 복사
    7. nodemailer/.env 환경변수 지정, 이메일은 구글 메일, 비밀번호는 복붙한 비밀번호 입력
    8. nodemailer/index.js 생성 이메일 전송 함수 추가
 */

/* 12-3. 서버 실행 파일 구현 */
const express = require("express");
const app = express();

require("dotenv").config({ path: "nodemailer/.env" });; // dotent을 통해 nodemailer/.env 안의 환경 변수를 가져옴
const nodemailer = require("./nodemailer"); // 반드시 환경변수를 가져와 정보를 받을 수 있도록 환경변수 관련 함수 아래 있어야함

app.use(express.json({
    limit : "50mb"
}));

app.listen(3000, () =>{
    console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

app.post("/api/email",async(req, res) => {
    console.log(req.body.param);
    const r = await nodemailer.send(req.body.param); // ./nodemailer/index.js안의 내보내기한 send에 전송받은 데이터를 실어 보냄

    res.send(r);
});

/* postmand에서 postEmail추가 
    1. post http://localhost:3000/api/email 설정
    2. body, raw, json 선택
    3. 메일 내용 입력 
        {
            "param" :{
                "from" : "ria9810@gmail.com", 보내는 사람
                "to" : "ria9810@gmail.com", 받는 사람
                "subject" : "Nodemailer test", 제목
                "text" : "express웹 서버에서 보내는 Nodemailer 테스트 입니다." 메일 내용을 일반 문자로 넣을 경우에는 text
            }
        }
    4. 서버 실행 후 postmand 에서 send 클릭, 결과확인
    3-2. html로 보내고 싶다면 "text" -> "html"로 수정해서 html형식으로 작성
        {
            "param" :{
                "from" : "ria9810@gmail.com",
                "to" : "ria9810@gmail.com",
                "subject" : "Nodemailer test",
                "html" : "<p style='color:red'>express웹 서버에서 보내는 Nodemailer 테스트 입니다.</p>"
            }
        }
    npm에 잘 만들어진 모듈이 있으니 찾아서 잘 사용하면 좋은 기능을 안정적으로 사용할 수 있음
    * 요약 : 
     1. 노드 메일러 설치
     2. 지메일에 2차 인증 활성화 및 비밀번호 설정
     3. nodemailer/.env 환경변수 추가
     4. nodemailer/index.js 메일서버 설정, 이메일 보내는 함수 작성
 */