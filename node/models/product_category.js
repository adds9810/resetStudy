// 26-6.
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_category.init(
    {
      // 26-6. sequelize-cli에 설정했던 내용들 확인,
      // product_category_id: DataTypes.INTEGER,
      // category_name: DataTypes.STRING,
      // category_description: DataTypes.STRING,
      // use_yn: DataTypes.STRING
      // 26-8. 위 설정이 단순하게 되어 있음 구체적으로 아래와 같이 설정가능, 설정하지 않아도 문제되지 않음
      // 구체적으로 설정할 수 있는 기능들.. type, primaryKey, allowNull, unique, defaultValue, autoincreament
      product_category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }, // primaryKey : 유일값, autoIncrement 자동생성
      category_name: { type: DataTypes.STRING, allowNull: false },
      category_description: DataTypes.STRING,
      use_yn: { type: DataTypes.STRING, defaultValue: "Y" },
    },
    {
      sequelize,
      timestamps: false, // 26-7. createdAt, updatedAt 컬럼 없음 / 타임스템프를 기록하기 위한 설정이 없지만 기본값으로 사용하게 됨, 사용하지 않을 경우 별도의 설정 필요
      modelName: "product_category", // customer -> customers, product_category -> product_categories 복수형을 탐색함, 없으면 sync로 인해 새로운 테이블이 생성됨
      tableName: "product_category", // 반드시 명시적으로 실제 테이블명 기재, 없으면 modelName으로 복수형을 찾고 테이블을 생성해버림
    }
  );
  return product_category;
};

// 26-10. categories를 product_category로 통일 : db명과 동일한 파일명이어야 인식하고 연동해줌
