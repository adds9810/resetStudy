const mysql = require("mysql"); // 모듈사용
const sql = require("./sql"); // 가져올 쿼리모음
const logger = require("../winston/logger"); // logger.js 가져오기

// 접속정보
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  connectionLimit: process.env.MYSQL_LIMIT,
});

// alias를 키로 받아 sql.js안의 쿼리문을 받아와 결과 리턴, 조회, 생성 등의 면령 싱행
const query = (alias, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql[alias], values, (error, results) => {
      if (error) {
        logger.error(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getConnection = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        logger.error(error);
        reject({ err });
      } else {
        resolve(conn);
      }
    });
  });
};

module.exports = {
  query,
  getConnection,
};
