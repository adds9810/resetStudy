// 사용할 모든 sql 쿼리문 작성 및 내보내기
module.exports = {
    productList: `select * from product`,
    categoryList: `select * from product_category`,
    categoryDetail: `select * from product_category where product_category_id=?`,
    categoryInsert: `insert into product_category set ?`, // ?가 한개면 단일데이터, 여러개면 순차적으로 데이터를 받아 치환됨
    // insert into product_category set category_name="Etc", category_description="etc", use_yn="Y"
    categoryUpdate: `update product_category set ? where product_category_id=?`, // 첫번째 ? 는 전달받을 데이터
    categoryDelete: `delete from product_category where product_category_id=?`,
  };