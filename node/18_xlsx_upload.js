/* 9.엑셀 업로드 및 파싱 처리(xlsx) 
 - 엑셀파일 업로드, 수정을 위해 데이터 파싱 등.. 엘셀파일 기능 컨트롤을 위한 구현이 중요, 많이 사용
 - 모듈을 설치해서 사용 npm i xlsx
 - https://www.npmjs.com/package/xlsx - 엑셀파일 관련 많은 기능 지원
*/
const express = require("express");
const app = express();
// xlsx
const xlsx = require("xlsx");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/api/xlsx", upload.single("xlsx"), async (req, res) => {
  console.log(req.file);


    const workbook = xlsx.readFile(req.file.path); // xlsx의 함수를 통해서 파일을 읽어옴, 가상의 엑셀파일
    const firstSheetName = workbook.SheetNames[0]; // 첫번째 시트 이름, 시트 배열의 첫번째, 파일을 접근할 때 시트명으로 가능
    const firstSheet = workbook.Sheets[firstSheetName]; // 시트가져오기, 오브젝트
    const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet); // 시트를 제이슨으로 만듬

    res.send(firstSheetJson); // 오류 수정을 위해 수정 가능하도록 파일을 제이슨 파일로 변환시켜줌
});
// 고객정보, 제품정보 을 대량의 데이터 파일을 엑셀 파일로 받아서 대량 업로드 기능으로 데이터를 제이슨 파일로 받기 구현

app.listen(3000, () => {
    console.log("서버가 포트 3000번으로 시작 되었습니다.");
});
// 서버실행
// postman postXlsx 추가 및 작성
/*{
  fieldname: 'xlsx',
  originalname: '당근마켓 db.xlsx',
  encoding: '7bit',
  mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  destination: 'uploads',
  filename: '1664561403829.xlsx',
  path: 'uploads\\1664561403829.xlsx',
  size: 11687
} */
// 엑셀관련 기능 구현이 어려움, xlsx으로 대부분이 구현가능
// xlsx으로 업로드한 엑셀 파일은 데이터 파싱 json로 변환해서 클라이언트로 내려주도록 함