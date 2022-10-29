// 사용할 모든 sql 쿼리문 작성 및 내보내기
module.exports = {
  // itemList: `select * from table_name`,
  // itemDetail: `select * from table_name where id=?`,
  // itemInsert: `insert into table_name set ?`,
  // itemUpdate: `update table_name set ? where id=?`,
  // itemDelete: `delete from table_name where id=?`,
  categoryList: `select * from product_category`,
  categoryListByCondition: `select * from product_category where `,
  categoryDetail: `select * from product_category where product_category_id=?`,
  categoryInsert: `insert into product_category set ?`,
  categoryUpdate: `update product_category set ? where product_category_id=?`,
  categoryDelete: `delete from product_category where product_category_id=?`,
};
