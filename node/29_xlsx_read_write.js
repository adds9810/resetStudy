// 20.엑셀 읽고 내용 변경 후 새로운 엑셀 생성
// 엑셀 파일로된 내용에서 고객정보만 수정, pdf 혹은 워드로 변환(별도프로그램 설치)해서 전달, 
const xlsx = require("xlsx");

const workbook = xlsx.readFile("./xlsx/test.xlsx"); // 엑셀 파일 읽고, 메모리상에 워크북 생성
const firstSheetName = workbook.SheetNames[0]; // 첫번째 시트 이름
const firstSheet = workbook.Sheets[firstSheetName]; // 첫번째 시트
console.log(firstSheet["A2"].v); // 엑셀 첫번째 시트의 A2 셀 값
firstSheet["B2"].v = "ria9810@gmail.com"; // 이메일 주소 변경
firstSheet["A3"] = { t: "s", v: "adds" };
firstSheet["B3"] = { t: "s", v: "ria981@gmail.com" };
firstSheet["C3"] = { t: "s", v: "010-1111-1111" };

xlsx.writeFile(workbook, "./xlsx/test2.xlsx"); // ./xlsx/test.xlsx 파일을 수정해 ./xlsx/test2.xlsx로 저장
