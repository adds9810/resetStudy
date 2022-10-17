// 36.유용한 node 모듈
// node뿐 아니라 프론트에서도 많이 사용하는 모듈들

// validator : npm install validator
// 이메일, 알파벳, 알파벳+숫자, 날짜, 숫자, 신용카드, 국가별 스마트폰 번호 형식, 바닐라에서 정규식으로 짜던 코드들 구현해줌
// 모바일번호 국가별로 맞는지 확인가능, 몽고디비 오브젝트 아이디 맞는지, 여권번호, 부가세 3개국만 지원해줌
// 프론트에서도 파일로 다운받아 사용가능
const validator = require("validator");

const email = "seungwon.go@gmail.com";
console.log("email", validator.isEmail(email));

const alpha = "abcd";
console.log("alpha", validator.isAlpha(alpha));
// 한글은 없지만 다른 언어 확인이 필요할 경우 console.log("alpha", validator.isAlpha(alpha, "de-DE"));

const alphanumeric = "abcd123";
console.log("alphanumerice", validator.isAlphanumeric(alphanumeric));

const date = "2022-07-01";
console.log("date", validator.isDate(date));
const date2 = new Date();
console.log("date2", validator.isDate(date2));

const decimal = "3.1";
console.log("decimal", validator.isDecimal(decimal));

// moment.js - npm i moment
// 날짜/시간 date를 처리하는 가장 대표적인 모듈
// 실무에서 필요한 날짜 시간관련 기능 지원, 지원해주는 기능이 많아 용량이 큼...,
// 다양한 구현 방법이 있어서 필요하면 읽어보자
const moment = require("moment");
// moment() 시스템 시간 포맷
console.log(moment().format("YYYY-MM-DD"));
console.log(moment().format("MM-DD-YYYY"));
console.log(moment().format("MMMM Do YYYY, h:mm:ss a")); // Do - 날짜가 n번째로 옴
console.log(moment().format("dddd")); // 요일확인

// moment("2019-05-15", "YYYY-MM-DD") 처럼 안에 원하는 방식으로 포맷해 전달가능
console.log(moment("2019-05-15", "YYYY-MM-DD").fromNow()); // 오늘기준으로 지정한 시간에서 얼마나 지났는지
console.log(moment().startOf("day").fromNow());
console.log(moment().endOf("day").fromNow());

// 실무에서 많이 사용
// 오늘 날짜 기준으로 7일전, 30일전
// 오늘 날짜 이후로 7일후, 30일후
// console.log(moment().subtract(7, "day").format("YYYY-MM-DD"));
// console.log(moment().subtract(7, "month").format("YYYY-MM-DD"));
// console.log(moment().subtract(7, "year").format("YYYY-MM-DD"));

// console.log(moment().add(7, "day").format("YYYY-MM-DD"));
// console.log(moment().add(7, "month").format("YYYY-MM-DD"));
// console.log(moment().add(7, "year").format("YYYY-MM-DD"));

// console.log(moment().add(-7, "day").format("YYYY-MM-DD"));

// dayjs - momentjs를 좀 가볍게 필요한 기능만 가지고 만든 모듈, 사용방법도 유사 https://www.npmjs.com/package/dayjs

// fs-extra : fs 내장모듈에 기능이 추가된 확장 모듈
// fs - filesystem
// https://www.npmjs.com/package/fs-extra
// 많이 사용하는 추가 기능 : copy, 파일생성, 이동
// copy, emptyDir, mkdirp, move
// 파일을 가지고 처리해야할 일이 많은 프로젝트일 경우가 많음. 그때 확장해서 사용해보자

const fs = require("fs-extra"); // 기존의 fs를 가져오기 않아도 됨
fs.copy("uploads/1664557737885.png", "uploads/copy.png")
  .then(() => {
    // code
  })
  .catch((err) => {
    console.log(err);
  });
