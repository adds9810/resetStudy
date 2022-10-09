// 21.DB 데이터로 엑셀 파일 생성
require("dotenv").config({ path : "mysql/.env.test" });
const mysql = require("./mysql");
const xlsx = require("xlsx");

const getData = async () => {
    const categoryList = await mysql.query("categoryList");
    return categoryList;
}

const createXlsx = async () => {
    const workbook = xlsx.utils.book_new(); // 기존 엑셀파일이 없어 새로 제작
    const customerList = await getData();
    const firstSheet =  xlsx.utils.json_to_sheet(customerList, {
        header: [ // 엑셀파일의 컬럼명, 지정한 순서대로 출력됨, 없으면 db에 주어진 순서대로 출력됨
          "category_name",
          "product_category_id",
          "category_description",
          "use_yn",
        ],
        skipHeader: false, // 헤더 사용 여부
    });// json을 sheet로 바꿔주는 함수

    firstSheet["!cols"] = [
        // wpx 너비
        { wpx: 100 }, // category_name
        { wpx: 100 }, // product_category_id
        { wpx: 200 }, // category_description
        { wpx: 100 }, // use_yn
    ]
    xlsx.utils.book_append_sheet(workbook, firstSheet, "Product Category");// 워크북, 첫번째 시트, 시트 이름
    xlsx.writeFile(workbook, "./xlsx/product_category"); // 새로운 엑셀 파일 만들기
}

createXlsx();