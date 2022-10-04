/* 6-6. product 방법으로 category.js 만들기 */
const express = require("express");
const router = express.Router();
const mysql = require("../mysql");

// 13에서 category에 해당하는 소스 가져와서 app -> router호 변경
// 모두 가져오기
router.get("/all", async (req, res) => {
  const categoryList = await mysql.query("categoryList");
  res.send(categoryList);
});

// 특정 카테고리만 가져오기
router.get("/:product_category_id", async (req, res) => {
  const product_category_id = req.params.product_category_id;
  const categoryList = await mysql.query("categoryDetail", product_category_id);
  res.send(categoryList);
  // res.send(categoryList[0]);
});

router.post("/", async (req, res) => {
  const result = await mysql.query("categoryInsert", req.body.param);
  res.send(result);
});

router.put("/:product_category_id", async (req, res) => {
  const product_category_id = req.params.product_category_id;
  const result = await mysql.query("categoryUpdate", [
    req.body.param,
    product_category_id,
  ]);

  res.send(result);
});

router.delete("/:product_category_id", async (req, res) => {
  const product_category_id = req.params.product_category_id;
  const result = await mysql.query("categoryDelete", product_category_id);

  res.send(result);
});

// 내보내기
module.exports = router;
