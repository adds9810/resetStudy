"use strict";
// sequelize 사용을 대비한 기본 구조만 이해하자
// 외부모듈 호출
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename); // 현재 동작중인 기본 파일 이름
const env = process.env.NODE_ENV || "development"; // 기본실행 설정은 'development'
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

// sequelize 객체를 가져오는 부분, 접속정보를 가져오는 부분
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // config.use_env_variable 가져오는 부분 없어 아래의 코드를 무조건 지나가게 됨, config/config.json development 부분에 설정한 정보를 가져오게 됨
  // 이전에 작성한 mysql/indes.js파일의 접속정보로 대체가능 하지만 자동 작성된 파일대로 진행된다
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// models에서 생성한 데이터베이스 파일을 매핑하기 위해서 js 파일로 가져와서 sequelize 모델로 변환한 다음에 db에 담음
// models 폴더에서 생성된 model js 파일을 읽어와서 Squelize 모델로 변환
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model; // db 객체에 모델 정보 저장
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    // 테이블 맵핑을 위해 생성한 model 파일의 associate() 함수로 전체 모델 정보를 전달한 다음 모델 간의 연관 관계를 설정
    // 여기서 연관 관례라는 것은 RDMBS에서 외래키를 설정해서 테이블간의 관계 맺는 것과 유사
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
