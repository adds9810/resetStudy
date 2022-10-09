// 22.DB 읽고 엑셀 파일로 다운로드
// 물리적인 파일 생성 없이 workbook를 만들고 Buffer에 담아서 클라이언트에서 파일다운로드 하게 해주고 종료함
// 변경되지 않는 파일은 물리적 파일 생성 및 다운로드, 그렇지 않다면 이 방법을 사용하자
const express = require("express");
const app = express();
require("dotenv").config({path:"mysql/.env.test"});
const mysql = require("./mysql");
const xlsx = require("xlsx");

app.listen(3000, () => {
    console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

app.get("/api/xlsx/dowmload", async (req,res) => {
    const categoryList = await mysql.query("categoryList"); // categoryList쿼리 가져오기
    const workbook = xlsx.utils.book_new();// xlsx 생성을 위한 워크북 만들기
    const firstSheet = xlsx.utils.json_to_sheet(categoryList, {// json 형태를 sheet 형태로 변환
        header: [
          "product_category_id",
          "category_name",
          "category_description",
          "use_yn",
        ],
        skipHeader: false,
      }); 

      firstSheet["!cols"] = [{ wpx: 160 }, { wpx: 160 }, { wpx: 200 }, { wpx: 80 }];

      xlsx.utils.book_append_sheet(workbook, firstSheet, "Categories"); // 작성한 규직에 맞게 엑셀에 넣기

      // 단발성 파일 다운로드 - 파일을 만들지 않고 바로 다운로드 할 수 있게 추가가 필요
      // 물리적 파일 생성 후 다운로드는 쌓여서 용량을 차지하게 되어 다운로드 후 지우는 함수가 추가되어야 함, 데이터는 수시로 변경됨
      res.setHeader("Content-disposition", "attachment; filename=Categories.xlsx"); // 파일 다운로드 테이터
      res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );// 데이터 파일 형식, 클라이언트에서 엑셀형태로 다운로드 하려면 이 형태로 만들어야 함
      const dowmloadFile = Buffer.from(xlsx.write(workbook, {type:"base64"}), "base64"); // Buffer에 담아서 엑셀파일 다운로드 / 다운로드할 파일, 인코딩 방식, 읽을때 인코딩 방식

      res.end(dowmloadFile);
});

// 서버 실행 후 postman에서 downloadXlsx 생성 및 http://localhost:3000/api/xlsx/dowmload 실행
