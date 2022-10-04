// 3-2. timers
// setInterval, setTimeout - js 윈도우 객체와 유사, node.js 내장모듈 사둉

// const timeout = setTimeout(() => {
//   console.log("1초 후에 실행됩니다.");
// }, 1000);

const interval = setInterval(() => {
    console.log("1초 마다 실행이 됩니다.");
  }, 1000);
  
  setTimeout(() => {
    clearInterval(interval);
  }, 3000);
  
// immediate : 즉시 실행함수, 시간설정 없음, 콜백함수만 정의, 작성 위치에 상관없이 모든 코드들이 실행되고 실행, 모튼 코드가 실행 된 후에 실행하는 함수라 node.js에서 유용함
// const immediate = setImmediate(() => {
//   console.log(
//     "setImmediate() 함수 호출 뒤에 오는 모든 코드를 먼저 실행하고 바로 다음에 실행이 됩니다."
//   );
// });

// console.log("setImmediate 보다 먼저 실행 됩니다.");
  