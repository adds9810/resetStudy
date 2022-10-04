/* 6-2. Express 라우터 잡는 방버 */
const express = require("express");
const router = express.Router();
const mysql = require("../mysql");

// 이전에 작성한 코드에서 app을 router로 변경
router.get("/all", async (req, res) => {
    const productList = await mysql.query("productList");
    res.send(productList);
});

// 라우터 내보내기
module.exports = router;

// 15_app_route_module.js 파일 만들기