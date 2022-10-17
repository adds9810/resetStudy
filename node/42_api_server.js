// 35. API 서버 구축
// API 서버 - 접근할 수 있는 사람들에게 키를 발급해줌(카카오, 네이버 api 이용시 키를 발급받아 사용하게 됨)
// API 서버 만들고 액세스 키를 만들고 키가 유용한 사용자만 정보를 가져갈 수 있도록 구현
// 액세스 키를 발급하는데 사용하는 모듈 설치 : uuid-apikey npm install uuid-apikey
const uuidAPIKey = require("uuid-apikey");
// console.log(uuidAPIKey.create()); create() 키생성 함수

// 외부에서 키를 발급하기 버튼을 클릭해 데이터에 저장되어 있다고 가정
const accessKey = {
  apiKey: "KFBKYA2-37TMRG1-GC8RMHF-KVB59X6",
  uuid: "9bd73f28-19f5-4c40-8311-8a459ed654f4",
};

const express = require("express");
const app = express();
require("dotenv").config({ path: "mysql/.env" });
const mysql = require("./mysql");

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

// url로 전달한 :apikey가 발급한 키와 일치하면 데이터를 볼 수 있게 연결
app.get("/api/:apikey/categories", async (req, res) => {
  const apikey = req.params.apikey; // 피라미터 안의 키를 가져옴
  if (apikey === accessKey.apiKey) {
    // apiKey가 일치하면 uuid로 바꿔줌
    if (uuidAPIKey.toUUID(apikey) === accessKey.uuid) {
      // uuid가 accessKey.uuid와 일치하면 mysql에 접근가능
      const categoryList = await mysql.query("categoryList");
      res.send(categoryList);
    } else {
      res.send("apikey가 정상적이지 않습니다.");
    }
  } else {
    res.send("apikey가 존재하지 않습니다.");
  }
});

// 서버 실행 및 postman getcategoryByApikey 확인
// 외부 시스템 혹은 사용자가 사이트 내 일부 데이터를 가져가야 할때 apikey를 발급하고 일치하면 서비스를 제공하도록 해야 할 때가 있을 수 있음
// 한 곳에 api서버를 같이 둔다면 부하가 발생할 수 있어 웹 서버를 실행하고 외부 사용자를 위한 api서버를 구축해 제공할 수 있어야 한다.(따로 만들면 api서버는 죽어도 운영서버는 돌아가기 때문)
