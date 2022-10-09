// 24.엑셀 스타일 적용하기
// xlsx-js-style 모듈설치 npm install xlsx-js-style

// 이전에는 xlsx를 불러 왔으나 xlsx-js-style 설치해 하나만 불러와도 안에 xlsx가 포함되어 있어 따로 가져오지 않아도 됨
const xlsx = require("xlsx-js-style");

const createXlsx = async () =>{
    const workbook = xlsx.utils.book_new();

    const customers = [
        { name: "고객명", email: "이메일", phone: "연락처" },
        { name: "유재석", email: "ryu@gmail.com", phone: "010-0000-0001" },
        { name: "김종국", email: "kim@gmail.com", phone: "010-0000-0002" },
        { name: "송지효", email: "song@gmail.com", phone: "010-0000-0003" },
    ];

    const firstSheet = xlsx.utils.json_to_sheet(customers, {
        header: ["name", "email", "phone"],
        skipHeader: true, // json 데이터 안에 header에 해당하는 부분이 있어 생략
    });

    firstSheet["!cols"] = [{ wpx: 120 }, { wpx: 200 }, { wpx: 200 }];

    // xlsx 스타일 지정 : 시트 하나하나에 원하는 스타일을 지정해 줘야 함
  firstSheet["A1"].s = {
    font: { // 폰트 스타일
      name: "Calibri",
      sz: 24,
      bold: true,
      color: { rgb: "FF0000" },
      italic: true,
      strike: true, // 취소선
      undefined: false, // 밑줄
    },
    alignment: { // 정렬
      vertical: "center", // 상하 : top, center, bottom
      horizontal: "center", // 좌우 : left, center, right
      wrapText: true, // 자동 줄바꿈
      textRotation: 90, // 0-180
    },
    border: { // 선
      // top, bottom, left, right
      top: {
        style: "thick", // 선 스타일 : dashDotDot, dashDot, dashed, dotted, medium, thick, thin
        color: { rgb: "FF0000" },
      },
      bottom: {
        style: "thick", // dashDotDot, dashDot, dashed, dotted, medium, thick, thin
        color: { rgb: "FF0000" },
      },
      left: {
        style: "thick", // dashDotDot, dashDot, dashed, dotted, medium, thick, thin
        color: { rgb: "0000FF" },
      },
      right: {
        style: "thick", // dashDotDot, dashDot, dashed, dotted, medium, thick, thin
        color: { rgb: "00FF00" },
      },
    },
  };

  firstSheet["B1"].s = {
    alignment: {
      vertical: "center", // top, center, bottom
      horizontal: "center", // left, center, right
      wrapText: true, // 자동 줄바꿈
      textRotation: 90, // 0-180
    },
  };

  firstSheet["C1"].s = {
    border: {
      // top, bottom, left, right
      top: {
        style: "thick", // dashDotDot, dashDot, dashed, dotted, medium, thick, thin
        color: { rgb: "FF0000" },
      },
      bottom: {
        style: "thick", // dashDotDot, dashDot, dashed, dotted, medium, thick, thin
        color: { rgb: "FF0000" },
      },
      left: {
        style: "thick", // dashDotDot, dashDot, dashed, dotted, medium, thick, thin
        color: { rgb: "0000FF" },
      },
      right: {
        style: "thick", // dashDotDot, dashDot, dashed, dotted, medium, thick, thin
        color: { rgb: "00FF00" },
      },
    },
  };

  firstSheet["A2"].s = {
    fill: {
      patternType: "solid", // 색을 채울건지 여부 : solid, none
      fgColor: { rgb: "FF0000" }, // 폰트색
      bgColor: { rgb: "00FF00" }, // 배경색
    },
  };

  xlsx.utils.book_append_sheet(workbook, firstSheet, "Customers"); // 엑셀시트 추가
  xlsx.writeFile(workbook, "./xlsx/customers_styled.xlsx"); // 엑셀파일 생성
};

createXlsx();