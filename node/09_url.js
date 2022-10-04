// 3-6. url : url 정보 출력하기 위한 모듈, 주어진 url에서 필요한 정보를 출력하기 위함
const myURL = new URL( // 객체를 이용해 임포트 없이 사용가능, 복잡한 정보도 정리해 제공함, 복잡한 형태의 url을 받았다 가정
    "https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash"
  );
  
  console.log(myURL); // 오리진 : 오리지널 도메인, 서지 : 쿼리스트링
  console.log(myURL.username); // username
  console.log(myURL.password); // 비번
  
  const myURL2 = new URL("https://example.org?user=abc&query=xyz&sort=asc");
  
  // searchParams 정보를 검색하고자 할 때, get으로 원하는 정보 호출가능
  const user = myURL2.searchParams.get("user");
  const query = myURL2.searchParams.get("query");
  const sort = myURL2.searchParams.get("sort");
  
  console.log(myURL2.searchParams.keys()); // keys를 모를 때
  console.log(myURL2.searchParams.values()); // values값을 가져오가자 할 때
  
  myURL2.searchParams.append("user2", "def"); // 새로운 키로 추가 가능
  myURL2.searchParams.append("user", "def"); // 기존에 있는 키로 값을 추가하면, 동일한 키가 있으면 그대로 유지하고 하나 더 추가
  myURL2.searchParams.set("user", "def"); // 동일한 키가 있으면, 기존 키를 삭제하고 새로 추가해야
  console.log(myURL2);
  
  console.log(myURL2.searchParams.getAll("user")); // key안의 두개 이상의 값을 호출하고 싶을 때
  myURL2.searchParams.delete("user"); // 해당 키를 삭제
  
  console.log(myURL2.searchParams.toString());
  