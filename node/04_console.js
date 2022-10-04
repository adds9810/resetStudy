/* 3.내장 모듈 사용하기(console, timer, process, path, url, crypto, fs) 
    3-1. console 
        - node.js에서 많은 객체 제공, javascript와 유사, 원하는 메세지 출력뿐 아니라 다양한 파일로 원하는 메세지 출력도 가능
        - 파일에 원하는 메세지를 기록 및 저장가능(파일에서 메시지는 확인할 수 있게 기능 제공)
*/

const fs = require("fs"); // filesystem - 읽고, 쓰고, 수장하는 것들을 가능하게 하는 담당 내장모듈, console를 통해 파일에 원하는 메세지를 저장하게 하기 위해 사용
const {Console} = require("console"); // console 내장객체, javascript의 console과는 다름

const output = fs.createWriteStream('./stdout.log'); // 파일에 아웃풋하기 위한 내장함수, createWriteStream(저장위치) - 파일에 작성하는 스트림 내장함수
const errorOutput = fs.createWriteStream('./stderr.log'); // 에러 아웃풋 저장

const logger = new Console({stdout : output, stderr : errorOutput}); // new로 객체 선언

// 숫자 5찍기 예제 - 로그를 매번 확인하기 어려울 수 있기에 파일에 작성해 관리하면 추후헤도 확인하기 용이함, 
const count = 5;

// 두 방법은 작성이 다를뿐 결과는 동일
logger.log("count: %d", count); // stdout.log에 로그가 저장됨
logger.error("count: ", count); // stderr.log에 로그가 저장됨

// 터미널에서 node .\04_console.js 실행
// 그러나 위의 방법은 비효율적, 로그는 별도 로그 관리 모듈을 사용해 관리

// 문자 찍기
console.log("Hello World");
const world = "world";
console.log(`hello ${world}`);

// 에러찍기
console.error("에러 메시지 출력");
console.error(new Error("에러 메시지 출력")); // new error객제 이용가능, 에러 내용을 확일할 수 있도록 출력됨

// 데이터 배열을 console에 출력
const arr = [
    { name: "John Doe", email: "john@gmail.com" },
    { name: "Jane Doe", email: "jane@gmail.com" },
];
  
console.log(arr); // 배열 형태로 확인할 수 있게 출력
console.table(arr); // 테이블 형태로 확인 가능하도록 출력

// 오브젝트의 오브젝트 안의 데이터 출력하기
const obj = {
    students: {
        grade1: { class1: {}, class2: {} },
        grade2: { class1: {}, class2: {} },
        teachers: ["John Doe", "Jane Doe"],
    },
};

// 오브젝트의 오브젝트 안의 데이터가 많을 경우(복잡한 데이터 구조인 경우), 한 눈에 데이터 구조를 파악하기가 쉽지않음
console.log(obj);
// console.dir(오브젝트 이름, 옵션); 원하는 depth까지만 검색해서 보여줌
console.dir(obj, { depth: 1, color: true });
// 많이 공부하는 것 보다 실무에서 필요한 것들을 배우는 것이 중요,

// 데이터 누수 되는 곳을 확인할 수 있음(??), 
// time, timeEnd : 동일한 레이블 사이에 있는 함수가 실행되는 시간을 알려줌 console.time(레이블명); console.timeEnd(레이블명);
console.time("func 1");
for (let i = 0; i < 999999; i++) {
  // 특정 코드
}
console.timeEnd("func 1");