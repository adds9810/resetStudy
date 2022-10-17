// 29-3. mongoose 외부 함수 호출 및 연결 함수 설정
const mongoose = require("mongoose");

// 연결함수 설정
const connect = () => {
  mongoose.set("debug", true); // 상세하게 메세지를 확인할 수 있음
  const urlMongoDB = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`;
  mongoose.connect(
    urlMongoDB, // 접속정보
    {
      //dbName
      dbName: process.env.MONGODB_DB,
    },
    (error) => {
      // 콜백값
      if (error) {
        console.log("MongoDB 연결 에러", error);
      } else {
        console.log("MongoDB 연결 성공");
      }
    }
  ); // 접속정보 등록 connect(접속정보, dbName, 콜백값)
};

// 에러 발생시 리스너
mongoose.connection.on("error", (error) => {
  console.log("MongoDB 연결 에러", error);
});

// 어떠한 이유에서 연결이 종료되었을 때
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB 연결이 종료되어 연결을 재시도 합니다.");
  connect();
});

// 내보내기
module.exports = {
  connect,
};

// 29-4. sequelized에서 models을 작성했듯이 mongoose에서는 schemas를 만들어주어야 함
// mongoose/schemas/customer.js 파일생성
