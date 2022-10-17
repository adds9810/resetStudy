// 34. pm2 - cluster처럼 설치하면 클러스터처럼 코드 구현없이 cpu의 수만큼 서버를 실행시켜줌
// 터미널에서 설치(전역설치로 진헹) npm install -g pm2
// 버전확인 pm2 --version
// 업데이트 pm2 update
// 실행여부 확인 pm2 list
// 실행 pm2 start
// 간단한 앱 실행으로 pm2 테스트
// 필요한 명령어가 있다면 찾아서 사용하자
// pm2로 이용하면 클러스터 증량 여부 고려없이 사용하고 필요시 안정적으로 증량 가능, 때문에 실무에서 많이 사용
// 클러스터 실글 스레드인 노드를 병렬처리 함으로써 가지고 있는 cpu자원을 최대한 활용해 서버 운용하는 방법, 실무에서는 내장모듈 클러스터 보단 pm2를 많이 사용

// pm2 start 41_pm2.js
// pm2 list
// pm2 stop 41_pm2.js
// pm2 logs : pm2에서 보낸 로그 확인 가능
// pm2 monit 모니터링 대시보드, 실행중인 프로세스별 샤용중인 용량, log 확인 등 정보 확인가능
// pm2 delete all 실행중인 모든 프로세스 삭제
// 클러스터 모드 실행하는 방법
// pm2 start 파일명 -i <프로세스 개수> : 지정한 프로세스 수만큼 사용가능
// pm2 start 41_pm2.js -i 4
// 프로세스 개수 늘리고 싶다면
// pm2 scale 41_pm2.js +3
// 모든 cpu를 사용하고 싶다면
// pm2 start 41_pm2.js -i max

const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
