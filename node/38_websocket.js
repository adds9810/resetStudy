// 31-1.socket.io로 웹소켓 구현
// html 파일을 생성해 양방향 통신 구현
// http 모듈을 사용할 수 있지만 기능구현 시에 사용해야할 내장 모듈이 많아 express사용
const express = require("express");
const { createServer } = require("http"); // HTTP 웹 서버와 클라이언트를 생성하는 것과 관련된 모든 기능을 담당.
// web socket 구현을 쉽게 할 수 있는 모듈
// npm install socket.io
const { Server } = require("socket.io"); // 서버를 생성하기 위해 가져옴, 서버를 만들때 createServer가 필요함
const cors = require("cors"); // 클라이언트와 서버의 오리진이 달라서 필요

const app = express();
const httpServer = createServer(app); // 서버 객체 생성

// cors로 허용할 호스트 설정 및 사용선언
const corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// io 객체는 socket.io 서버와 연결된 전체 클라이언트와 메시지를 송수신하는 인터랙션을 위한 객체
const io = new Server(httpServer, {
  // 옵션
  cors: {
    origin: "http://localhost:8080", // 허용할 host
    methods: ["GET", "POST"], // 허용할 메소드
  },
}); //  httpServer 정보 입력

// 서버에 접속했을 때 connection 이벤트의 함수 실행 가능
// 클라이언트에서 서버에 접속했을때 설정
io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    // 클라이언트가 접속을 종료했을 때
  });

  socket.on("cleint2server", (data) => {
    // 클라이언트의 행동에 이벤트를 정해 함수 실행가능
    console.log(data);
    // 38-.
    // io.emit("event_name", msg); // 접속된 모든 클라이언트에게 msg를 전송
    // socket.emit("event_name", msg); // 메시지를 전송한 클라이언트에게만 전송, 카카오 택시 위치를 해당 클라이언트에게만 보여줌
    // socket.broadcast.emit("event_name", msg); // 메시지를 전송한 클라이언트를 제외한 나머지 모두에게 전송
    // io.to(socket_id).emit("event_name", msg); // 지정된(socket_id) 특정 클라이언트에게만 메시지 전송
  });
});

// 서버에서 클라이언트로 데이터를 보낼때 실행함수
const sendMsgToClient = () => {
  setInterval(() => {
    io.emit("server2client1", {
      // 전송할 데이터 이벤트 지정
      code: `item${Math.round(Math.random() * 1000)}`,
      price: Math.round(Math.random() * 1000),
    });
  }, 1000);
};

app.get("/socket", (req, res) => {
  sendMsgToClient();
  res.send("서버로 부터 메시지 전송 시작");
});

httpServer.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

// 31-2. 38_websocket_client.html 생성 및 작성
// 웹소켓을 사용하려면 app이 아닌 httpServer, http://가 아닌 ws://사용
// 31-3. 38_websocket_client.js로 클라이언트 서버 생성 및 테스트
// 실시간 채팅에서는 웹 소켓으로 아이디를 받아서 답장이 오면 해당 아이디에게 전달하는 방식(별도의 함수가 존재)
// 38-4. 38_websocket_client.html 파일에 input과 button을 추가해 클라이언트에서 서버로 데이터 전송해보기
// 서버와 클라이언트 간의 자유자재로 데이터 주고받기가 가능해짐
