// 33. cluster 모듈로 클러스터링 구현
// 클러스터링 : 설치가 필요없는 내장 모듈, 이거보다 pm2를 더 많이 사용해서 이해만 해두자
// Node.js 싱글 스레드로 동작하고, 단일 CPU 코어에서만 실행
// 서버 자원이 8코어 혹은 16코어
// Node.js => 1코어만 사용
// cluster 모듈을 사용하면
// 서버 자원을 모두 사용하면서, Node.js 멀티스레드로 동작되는 것 처럼, 병렬처리 할 수 있게 됨
const cluster = require("cluster");
const express = require("express");
const { cpus } = require("os");
const process = require("process");

const numOfCPUs = cpus().length; // CPU 수

// Node.js의 클러스터 모듈에는 Primary 프로세스와 Worker 프로세스가 있음

if (cluster.isPrimary) {
  console.log(`Primary ${process.id} is running`);

  // cpu 수 만큼 워크를 포크(생성)
  for (let i = 0; i < numOfCPUs; i++) {
    // numOfCPUs 부분이 설정해도 되고 수만큼 가져오게 해도 됨
    cluster.fork();
  }

  // 클러스터가 exit로 되었을 때 실행함수
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`); // worker.process.pid 가 죽었을 때
  });
} else {
  const app = express();
  app.listen(3000, () => {
    console.log("서버가 포트 3000번으로 시작 되었습니다.");
  });

  console.log(`Worker ${process.pid} started`); // 실행되는 워커의 프로세스 id를 콘솔에 출력
}

// 모든 클라이언트 서버가 동작하는 효과 발생
// 모든 워커에 요청을 하되 제일 부하가 적은 워커에서 요청됨
// 클라이언트에서 요청받은 것을 나눠서 실행, 속도가 빨라짐, 분산처리, 병렬처리 가능
// 서버 시작후 확인
// 자바의 멀티 스레드 사용가능, 노드의 싱글 스레드 단점 보완
// 그러나 실무에서는 이러한 분산 작업이 번거로울 수 있음 그래서 pm2사용
