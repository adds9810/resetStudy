// node2-3 - 계산기 만들기 예제
// 2. 가져올 함수를 import해 사용하기

// require("./02_calculator"); 가져올 js파일을 require path로 지정
// .js은 생략가능
const { add, minus, defaultNum } = require("./02_calculator");

// 3. 함수 입력
console.log(add(7, 2));
console.log(minus(7, 2));
console.log(defaultNum);

// 4. 터미널에서 실행

// node.js 자제 내장 module과 필요에 의해 설치하는 외부 module을 설치해 사용
// module 파일에 함수 내보내기, 임포트해 사용방법 알아두어야 함