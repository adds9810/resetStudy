// 파일 업로드 설정
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const appRoot = require("app-root-path");
const xlsx = require("xlsx"); // 엑셀파일 관련
const fs = require("fs"); // 파엘 제어, 엑셀 삭제 위함

// 맥 / 윈도우 ₩ - 운영체제마다 파일경로 오류가 발생할 수 있음
// {path.sep} 운영체제에 따라 경로를 맞춰줌

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${appRoot}${path.sep}public${path.sep}images`);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

const imageUpload = multer({ storage: imageStorage });

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${appRoot}${path.sep}uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

const fileUpload = multer({ storage: fileStorage });

const xlsxStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${appRoot}${path.sep}xlsx`);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

const xlsxUpload = multer({ storage: xlsxStorage });

router.post("/xlsx", xlsxUpload.single("xlsx"), async (req, res) => {
  const workbook = xlsx.readFile(req.file.path);
  const firstSheetName = workbook.SheetNames[0];
  const firstSheet = workbook.Sheets[firstSheetName];
  const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet);

  fs.unlinkSync(req.file.path); // 업로드 후 읽고 보내준 뒤 엑셀파일 삭제

  res.send(firstSheetJson);
});

router.post("/image", imageUpload.single("attachment"), async (req, res) => {
  // req.file
  // originalname, mimetype, filename, path
  const fileInfo = { ...req.file };
  fileInfo.originalname = req.body.originalname;
  res.send(fileInfo);
});

router.post("/file", fileUpload.single("attachment"), async (req, res) => {
  const fileInfo = { ...req.file };
  fileInfo.originalname = req.body.originalname;
  res.send(fileInfo);
});

// 파일 다운로드
router.get("/file/:filename", (req, res) => {
  const file = `${appRoot}${path.sep}uploads${path.sep}` + req.params.filename;
  try {
    if (fs.existsSync(file)) {
      res.download(file);
    } else {
      res.send("요청한 파일이 존재하지 않습니다.");
    }
  } catch (e) {
    console.log(e);
    res.send("파일을 다운로드 하는 중 에러가 발생했습니다.");
  }
});

// 이미지 다운로드
router.get("/image/:filename", (req, res) => {
  const file =
    `${appRoot}${path.sep}public${path.sep}images${path.sep}` +
    req.params.filename;
  try {
    if (fs.existsSync(file)) {
      res.download(file);
    } else {
      res.send("요청한 파일이 존재하지 않습니다.");
    }
  } catch (e) {
    console.log(e);
    res.send("파일을 다운로드 하는 중 에러가 발생했습니다.");
  }
});

module.exports = router;
