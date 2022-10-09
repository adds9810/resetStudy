// 23.DB 읽고 엑셀 첨부한 이메일 보내기
// 가상 워크북에 엑셀 데이터를 넣고 노드 메일러로 발송 : 담당자에게 엑셀데이터 통계보고 데이터 발송할 때 사용
// 워크북에 버퍼를 넣어 가상에서 엑셀 데이터를 만들어 메일로 발송
require("dotenv").config({ path : "nodemailer/.env" });
const nodemailer = require("./nodemailer");
require("dotenv").config({ path : "mysql/.env.test" });
const mysql = require("./mysql");
const xlsx = require("xlsx");
const express = require("express");
const app = express();

app.use(express.json({
    limit : "50mb"
}));

app.listen(3000, () => {
    console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

const sendAttachmentEmail = async (emailData, workbook) => {
    // postman에서 attachments 부분을 제외하고 작성해서 보냄
    // const emailData = {
    //     from: "seungwon.go@gmail.com",
    //     to: "seungwon.go@gmail.com",
    //     subject: "엑셀 파일 첨부 테스트",
    //     text: "엑셀 파일 첨부해서 이메일을 보내드립니다.",
    //     attachments: [ Buffer을 넣어 가상에서 파일을 만들어서 보낼 수 있게함, 복수일 수 있어 배열로 받음
    //         {
    //             filename: "Categories.xlsx",
    //             content: Buffer.from(xlsx.write(workbook, {type:"base64"}), "base64")
    //         }
    //     ]
    // }

    emailData.attachments = [ // 복수 자료 첨부 가능
        { // 가상에서 테이터를 만들어 첨부
          filename: "Categories.xlsx",
          content: Buffer.from(xlsx.write(workbook, { type: "base64" }), "base64"),
        },
        { // 물리적인 파일 첨부
          filename: "ERD 다이어그램.png",
          path: "./uploads/1664558590590.png",
        },
      ];

    const r = await nodemailer.send(emailData);
    return r;
};

app.post("/api/email/attachment", async (req, res) => {
    const categoryList = await mysql.query("categoryList");
    const workbook = xlsx.utils.book_new();

    const firstSheet = xlsx.utils.json_to_sheet(categoryList, {
        header: [
          "product_category_id",
          "category_name",
          "category_description",
          "use_yn",
        ],
        skipHeader: false,
    });

    firstSheet["!cols"] = [{ wpx: 160 }, { wpx: 160 }, { wpx: 160 }, { wpx: 80 }];

    xlsx.utils.book_append_sheet(workbook, firstSheet, "Categories");

    const r = await sendAttachmentEmail(req.body.param, workbook);

    res.send(r);
});

// 서버 실행 후 postman에서 sendEmailXlsx, post, http://localhost:3000/api/email/attachment 메일내용 적어서 발송
