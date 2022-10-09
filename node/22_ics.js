/* 13-1. 이메일로 일정 이벤트 보내기(iCalendar) : 예약 일정, 미팅 일정 안내 등 메일로 보내 캘린더에 저장할 수 있게 지원
    - .ics - 아이캘린더(iCalendar)
    - 아이캘린더 - 인터넷 사용자들이 다른 인터넷 사용자들에게 전자 메일을 이용해서 미팅 요청 혹은 할일, 일정을 보내거나
    - .ics 파일을 공유할 수 있게 해주는 파일 형식입니다.
    - 예약 안내, 일정을 이벤트로 담아서 메일로 보낼때 많이 사용함. 아주유용!!
*/

// 앱 실행
const express = require("express");
const app = express();

// 노드 메일러 사용, .env의 정보를 가져오기
require("dotenv").config({path : "nodemailer/.env"});
const nodemailer = require("./nodemailer");

// 13-7. 사용 크기 제한 추가
app.use(express.json({
    limit: "50mb"
}))

// ./nodemailer 안의 send 함수 사용
app.listen(3000,() =>{
    console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

app.post("/api/ics", async (req,res) =>{
    const event = {// 미팅, 예약, 할일 등을 이벤트로 정의 가능, iCalendar 이메일을 사용해 보낼 수 있는 형식, 아래는 공식 문서를 참고해 작성 가능
        start: [2022, 6, 30, 9, 30], // 시작지점 년, 월, 일, 시간, 분
        duration: { hours: 1, minutes: 30 },// 이벤트 소요시간
        title: "Node.js 스터디 모임", // 제목
        description: "개발자의 품격 스터디 모임", // 설명
        location: "제주특별자치도 제주시 더그레잇 3층", // 장소
        geo: { lat: 30.12, lon: 50.45 }, // lat: 위도, lon: 경도
        url: "https://thegreat.io",
        organizer: { name: "Seungwon Go", email: "seungwon.go@gmail.com" }, // 주최자
        attendees: [ // 참여자, 참여자들에게는 아래의 정보가 전달되지 않음
          {
            name: "유재석",
            email: "ryu@gmail.com",
            rsvp: true, // 회신 여부
            role: "REQ-PARTICIPANT", // 필수 참석자
          },
          {
            name: "김종국",
            email: "kim@gamil.com",
            role: "OPT-PARTICIPANT", // 선택 참석자
          },
        ],
    };

    // 13-6. 아래 소스 추가 후 postman에서 postEmailWithics추가
    const r = await nodemailer.sendWithIcs(req.body.param, event);
    res.send(r);
});

/* 13-2. 터미널에서 ics 설치 npm install ics 및 nodemailer/index.js 에 관련 소스 추가 */