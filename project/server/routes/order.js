const express = require("express");
const router = express.Router();
const mysql = require("../mysql");
const sql = require("../mysql/sql"); // 직접 sql을 처리해야 하기에 가져옴
const nodemailer = require("../nodemailer");

router.get("/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;
  const orderList = await mysql.query("orderListByCustomer", customer_id);
  res.send(orderList);
});

router.get("/detail/:order_id", async (req, res) => {
  const order_id = req.params.order_id;
  const header = await mysql.query("orderHeader", order_id);
  const detail = await mysql.query("orderDetail", order_id);

  res.send({
    header: header[0],
    detail: detail,
  });
});

router.post("/", async (req, res) => {
  // 1. order_header 테이블에 주문 헤더 정보를 등록 => orderInsert
  // return 값에 보면 insertId => order_id
  // 2. order_detail 테이블 제품 정보를 등록 => orderDetailInsert
  // 실패 => rollback => 없어던 일로하자!.
  // 성공 => commit

  // 고객의 이메일 주소 가져오기
  const customerEmail = req.body.email;

  // 1. connection 가져오기
  const conn = await mysql.getConnection();
  await conn.beginTransaction();

  // 2. 주문의 헤더(order_header) 정보 생성
  conn.query(sql["orderInsert"], req.body.header, async (err, rows, fields) => {
    if (err) {
      console.log(err);
      await conn.rollback(); // 오류 발생시 데이터가 등록되지 않고 이전으로 원복됨
      res.status(500).send({ err: err });
    } else {
      const orderId = rows.insertId;
      const items = [];
      for (const item of req.body.items) {
        items.push([orderId, item.product_id, item.order_qty]);
      }

      conn.query(
        sql["orderDetailInsert"],
        [items], // 여러건의 배열이 있다는 것을 []으로 감싸줌
        async (err2, rows2, fields2) => {
          if (err2) {
            console.log(err2);
            await conn.rollback();
            res.status(500).send({ err: err });
          } else {
            await conn.commit(); // 데이터 등록에 오류가 나지 않는다면 저장함

            const h = [];
            h.push(
              `<table style="border:1px solid black;border-collapse:collapse;">`
            );
            h.push(`<thead>`);
            h.push(`<tr>`);
            h.push(
              `<th style="border:1px solid black;border-collapse:collapse;">Product Name</th>`
            );
            h.push(
              `<th style="border:1px solid black;border-collapse:collapse;">Product No</th>`
            );
            h.push(
              `<th style="border:1px solid black;border-collapse:collapse;">Price</th>`
            );
            h.push(
              `<th style="border:1px solid black;border-collapse:collapse;">Qty</th>`
            );
            h.push(
              `<th style="border:1px solid black;border-collapse:collapse;">Category Name</th>`
            );
            h.push(
              `<th style="border:1px solid black;border-collapse:collapse;">Supplier Name</th>`
            );
            h.push(`</tr>`);
            h.push(`</thead>`);
            h.push(`<tbody>`);
            req.body.items.forEach((item) => {
              // 받아온 아이템 배열, req.body.items의 수만큼 목록 생성
              h.push(`<tr>`);
              h.push(
                `<td style="border:1px solid black;border-collapse:collapse;">${item.product_name}</td>`
              );
              h.push(
                `<td style="border:1px solid black;border-collapse:collapse;">${item.product_no}</td>`
              );
              h.push(
                `<td style="border:1px solid black;border-collapse:collapse;">${item.original_price}</td>`
              );
              h.push(
                `<td style="border:1px solid black;border-collapse:collapse;">${item.order_qty}</td>`
              );
              h.push(
                `<td style="border:1px solid black;border-collapse:collapse;">${item.category_name}</td>`
              );
              h.push(
                `<td style="border:1px solid black;border-collapse:collapse;">${item.supplier_name}</td>`
              );
              h.push(`</tr>`);
            });
            h.push(`</tbody>`);
            h.push(`</table>`);

            const r = await nodemailer.send({
              from: "seungwon.go@gmail.com",
              to: customerEmail, // 변수를 명확하게
              subject: "주문이 정상적으로 접수되었습니다.",
              html: `<h1>주문번호: ${orderId}<h1>` + h.join(""),
            });

            res.status(200).send(rows);
          }

          await conn.release(); // 커넥션을 다 사용했다면 이후의 작업을 위해 종료시켜야함
        }
      );
    }
  });
});

module.exports = router;
