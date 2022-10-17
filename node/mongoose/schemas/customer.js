// 29-5. Schema 함수 구현
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema 사용해서 몽고디비 데이터를 조회, 생성, 수정 삭제 구현
// mysql table Schema 정의하는 것과 동일한 효과, 작성규칙에 제한은 없지만 mongoose Schema를 통해 정의된 값을 받고자 함
const customerSchema = new Schema({
  name: {
    type: String,
    required: true, // 필수값
  },
  email: {
    type: String,
    required: true,
    unique: true, // 유니크값
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
  },
  address: {
    type: String,
  },
});

// 몽고DB에서 collection 이름을 customers, 앞글자는 대문자 뒤의 s를 삭제해야함 - "Customer"
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
