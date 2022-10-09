// 12-2 이메일 서버 설정 및 발송준비
// send로 일반메일, 파일첨부(엑셀 등), 일정 안내 메일 등 발송할 수 있음
const nodemailer = require("nodemailer");
// 13-3 ics 추가
const ics = require("ics"); 

/* config 메일 서버 기본정보 : 공식문서(https://nodemailer.com/about/)에서 관련 정보를 확인할 수 있다. */
const config = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {// .env에 설정한 정보 추가
      user: process.env.GOOGLE_MAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  };

const send = async (data) => {
    const transporter = nodemailer.createTransport(config); // config의 정보를 가지고 메일을 보낼 준비를 함
    transporter.sendMail(data, (err, info) => {// data : 보낸사람, 받는사람, 참조, 제목, 내용, 첨부파일을 오브젝트 형태로 전달
        if(err){
            console.log(err);
        }else{
            return info.response;
        }
    });
};

// 13-4 ics 함수 추가
const sendWithIcs = async (data, event) => {
    ics.createEvent(event, async(err, value) =>{// ics 관련 파일이 생성됨
        if(err){
            console.log(err);
            return;
        }

        console.log(value);
        // 13-8 결과 확인
        // BEGIN:VCALENDAR
        // VERSION:2.0
        // CALSCALE:GREGORIAN
        // PRODID:adamgibbons/ics
        // METHOD:PUBLISH
        // X-PUBLISHED-TTL:PT1H
        // BEGIN:VEVENT
        // UID:nxL8SXF1HqaayFsZc8V7A
        // SUMMARY:Node.js 스터디 모임
        // DTSTAMP:20220622T063100Z
        // DTSTART:20220630T003000Z
        // DESCRIPTION:개발자의 품격 스터디 모임
        // URL:https://thegreat.io
        // GEO:30.12;50.45
        // LOCATION:제주특별자치도 제주시 더그레잇 3층
        // ORGANIZER;CN=Seungwon Go:mailto:seungwon.go@gmail.com
        // ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;CN=유재석:mailto:ryu@gmail.com
        // ATTENDEE;RSVP=FALSE;ROLE=OPT-PARTICIPANT;CN=김종국:mailto:kim@gamil.com
        // DURATION:PT1H30M
        // END:VEVENT
        // END:VCALENDAR
        const message = {// 오류가 나지 않는다면 들어갈 내용
            ...data, // data를 key:value로 순차적으로 받아줌
            icalEvent: {
              filename: "invitation.ics", // iCalendar 파일
              method: "REQUEST", // RESPONSE, REQUEST 중 하나
              content: value,
            },

        }
        await send(message);
    });
}

module.exports = {
    send,
    sendWithIcs, // 13-5. 내보내기
}