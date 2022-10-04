const fs = require("fs");
// fs - filesystem, 파일 처리 관련된 다양한 모듈, 파일을 읽고 생성하고 수정하는데 관련있는 내장 모듈, 안의 모든 함수는 동기, 비동기 방식이 쌍으로 존재함

// readFile 읽을 파일, 기본적으로 비동기 방식
// 읽을 파일에 대한 경로, 읽을 파일의 캐릭터 셋, 호출결과, 호출 타이밍에 따라 맞게 사용하자
fs.readFile("./sample/text.txt", "utf8", (err, data) => {
  if (err) { // 에러처리
    throw err;
  }

  console.log(data); // 데이터 불러옴
});

console.log("1");

// readFileSync 동기방식, 벌러올때까지 기다림
const data = fs.readFileSync("./sample/text.txt", "utf8");
console.log(data);

// writeFile : 비동기 방식 파일 쓰기
const txt = "파일 쓰기 테스트";
fs.writeFile("./sample/text_w.txt", txt, "utf8", (err) => {
  if (err) {
    throw err;
  }

  const data2 = fs.readFileSync("./sample/text_w.txt", "utf8"); // 파일 생성하고 읽어오기
  console.log(data2);
});

const txt2 = "파일 쓰기 테스트 동기 방식";

// writeFileSync : 파일쓰기 동기방식
fs.writeFileSync("./sample/text_w2.txt", txt2, "utf8");
const data2 = fs.readFileSync("./sample/text_w2.txt", "utf8");
console.log(data2);

// 동기 보다 비동기방식이 빠름, 동기박식은 완료될때까지 기다림, 비동기는 처리되는 동안 다른일 할 수 있음

// 내장모듈이 종류를 알고 찾아사용할 수 있으면 됨