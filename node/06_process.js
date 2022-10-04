// 3-3. process : node.js에서 실행되고 있는 정보와 제어 관련, 사용빈도는 낮지만 알아두면 좋음
const process = require("process"); // node.js에서 특정 이벤트가 발생할 때마다 이벤트를 캐치하기 위한 리스너를 등록해서 사용가능

// console.log(process.env); node.js를 실행중인 환경에 대한 정보를 출력해줌

// process.on 으로 node.js가 진행중일 때 방생하는 다양한 이벤트 리스너를 등록해 사용할 수 있음
process.on("beforeExit", (code) => { // node프로세스가 졷료되기 직전
  console.log("beforeExit 이벤트 리스너", code);
});

process.on("exit", (code) => { // node프로세스가 졷료
  console.log("exit 이벤트 리스너", code);
});

console.log("1. 콘솔에 출력되는 첫 번째 메시지");
console.log("2. 콘솔에 출력되는 두 번째 메시지");

// 웹서버 구축을 위한 모듈만 제공 예정, 나머지는 만들면서 알아보자.
