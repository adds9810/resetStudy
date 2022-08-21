/** 주석 방법 /** enter
 * 함수에 대한 설명
 * @param {*} productAmount 제품가격을 숫자로 전달
 * @returns 부가세가 숫자현
 */

/**
 * 이 함수는 제품 가격에 대한 부가세를 계산해서 반환하는 함수입니다.
 * @param {*} productAmount 제품가격을 숫자형 전달
 * @returns 부가세가 숫자형
 */
function taxAmount(productAmount) {
  // 부가세 10% 가정
  const tax = 0.1;
  return productAmount * tax;
}

function getTop5() {
  return [];
}

// crud 상세화면, 수정하기 스크립트
function parseQueryString() {
  // 쿼리스트링이 여러개일 경우
  if (window.location.search.length === 0) {
    // 받은 피라미터가 없을 경우
    return {};
  } else {
    const queryStringObject = {};
    const queryString = window.location.search.substring(1).split("&");
    console.log(queryString);
    for (const s of queryString) {
      // 피라미터가 여러개일 경우 배열로 받기
      const q = s.split("=");
      queryStringObject[q[0]] = q[1];
    }

    console.log(queryStringObject);
    return queryStringObject;
  }
}
