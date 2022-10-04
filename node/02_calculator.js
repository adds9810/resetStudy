// node2-2 - 계산기 만들기 예제
// 1. 모둘 만들어 내보내기
function add(n1, n2) {
    return n1 + n2;
  }
  
  function minus(n1, n2) {
    return n1 - n2;
  }
  
  function mul(n1, n2) {
    return n1 * n2;
  }
  
  function divide(n1, n2) {
    return n1 / n2;
  }
  
  const defaultNum = 1;
  
  // 외부의 파일에서 작성한 함수들을 가져오기 위해서는 아래와 같이 작성해야함.
  // 파일을 가져오더라도 export로 설정하지 않으면 사용할 수 없음
  // export로 내보내고, import로 필요한 함수만 가져와서 사용 가능
  // node.js에서는 많은 module을 설치하고 import로 가져와서 사용
  // key : value 문자값이 각각 일치할 경우에는 생략 가능
  module.exports = {
    add, // add : add
    minus, // minus : minus
    mul, // mul : mul
    divide, // divide : divide
    defaultNum, // defaultNum : defaultNum
  };
  