/*28-4.   */
const { MongoClient, ObjectId } = require("mongodb");
let mongoDB = null;

// 28-4-1. indes.js가 열리면 몽고 디비에 접속하도록 실행할 함수 설정, 즉시실행 함수
(async function () {
  // MongoDB접속정보 url 유저:패스워드@host:port/maxPoolSize(제한설정)
  const urlMongoDB = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/?maxPoolSize=${process.env.MONGODB_LIMIT}`;
  const client = new MongoClient(urlMongoDB, { useUnifiedTopology: true }); // 몽고디비를 연결하기 위한 클라이언트 선언,  url, 옵션 useUnifiedTopology: true 엄밀하게 접속정보를 관리해줌. 그러나 구체적인 설명은 없음..

  // 몽고디비에 커넥션하고 정상적으로 접속되었을 경우 그 안의 db에 연결
  try {
    await client.connect();
    console.log("MongoDB에 정상적으로 접속되었습니다.");
    mongoDB = client.db(process.env.MONGODB_DB);
  } catch (err) {
    console.log(err);
  }
})();

// 28-4-2. 조회함수 구현 및 내보내기: collectionName에서 condition를 조회에서 toArray 후 리턴
const find = async (collectionName, condition = {}) => {
  const r = await mongoDB.collection(collectionName).find(condition).toArray();
  return r;
};

// 28-10. 조건검색 함수 구현 및 내보내기
const findById = async (collectionName, _id) => {
  const r = await mongoDB
    .collection(collectionName)
    .findOne({ _id: ObjectId(_id) });

  return r;
};

// 28-6. 입력함수 구현 및 내보내기 : collectionName에 한건의 data추가
const insertOne = async (collectionName, data) => {
  const r = await mongoDB.collection(collectionName).insertOne(data);
  return r;
};

// 28-7. 입력함수 구현 및 내보내기 : collectionName에 여러건의 data추가
const insertMany = async (collectionName, data) => {
  const r = await mongoDB.collection(collectionName).insertMany(data);
  return r;
};

// 28-8. 데이터 수정 함수 작성 및 내보기 : id는 자동으로 생성됨, updateOne는 한개씩 업데이트
const updateById = async (collectionName, data, _id) => {
  const r = await mongoDB.collection(collectionName).updateOne(
    { _id: ObjectId(_id) }, // 조회조건 _id는 오브젝트가 아니라서 오브젝트 함수를 사용해야함
    { $set: data, $currentDate: { lastModified: true } } // 수정할 데이터(수정할 데이터, 업데이트한 날짜(추가하면 자동으로 넣어줌))
  );

  return r;
};

// 28-9. 한개의 데이터 수정하기
const deleteById = async (collectionName, _id) => {
  const r = await mongoDB
    .collection(collectionName)
    .deleteOne({ _id: ObjectId(_id) });

  return r;
};

// 참고 전체삭제
const deleteMany = async (collectionName, condition) => {
  // {"email": /gmail/}
  const r = await mongoDB.collection(collectionName).deleteMany(condition);

  return r;
};

// 28-4-3. 내보내기
module.exports = {
  find,
  findById,
  insertOne,
  insertMany,
  updateById,
  deleteById,
  deleteMany,
};
