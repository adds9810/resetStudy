// node2-1 - 자바스크립트 실행 및 모듈 사용하기
// 자바스크립트는 정적으로 함수를 호출해줘야 사용가능했음

function myFunction(){
    console.log('hello World');
}

myFunction();

// node에서는 터미널에서 명령어를 입력하면 바로 실행 가능
// 열고자 하는 폴더에서 터미널을 열고 node 01_helloWorld.js(열고자하는 js파일명)
// 팁 : node 파일명 검색시 동일한 파일명이 없을 경우 tab키를 누르면 파일명이 자동완성됨
// node.js html파일 없이도 js파일 및 파일안의 함수를 호출해 실행시킴
// module : node.js의 핵심개념 중 하나, 방대한 함수와 변수를 체계럭으로 관리하기 위해 사용
// 02_calculator.js 파일생성