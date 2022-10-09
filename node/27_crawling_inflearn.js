// 18. 크롤링(인프런)
// axios - 특정 웹사이트 페이지 내용을 가져오기
// cheerio - HTML 구조를 가지고 있는 일반 텍스트를,
// 자바스크립트에서 document 객체의 내장함수를 사용해서 html 요소에 접근하는 것과 유사한 함수를 제공
// axios, cheerio 설치 npm install axios, cheerio
// 크롤링이 합번일 수도 있고 아닐수도 있다, 합법 여부를 확인해서 시도해보자
// 사이트의 구조가 달라질 수 있어 크롤링 전에 확인해봐야 한다.

const axios = require("axios");
const cheerio = require("cheerio");

// html 호출
const getHTML = async (keyword) => {
    // 가져오다 오류가 발생할 수 있어 try ..catch 사용
    try{
        const html = (
            await axios.get(
              `https://www.inflearn.com/courses?s=${encodeURI(keyword)}` // encodeURI : 국문 텍스트를 넣으면 자동으로 인코딩 형식으로 바꿔줌
            )
          ).data;

          return html;
    }catch(e){ // 오류나면 오류 알림
        console.log(e);
    }
};

// html로 가져와서 원하는 강의 목록만 cheerio으로 크롤링
// cheerio : jquery와 유사한 형태로 구성됨
const parsing = async (page) => {
    const $ = cheerio.load(page);
    const courses = [];
    const $courseList = $(".course_card_item");

    $courseList.each((idx, node) => {
        const title = $(node).find(".course_title:eq(0)").text();
        const instructor = $(node).find(".instructor:eq(0)").text();
        let price = 0;
        let originalPrice = 0;
         // 할인 여부에 따른 금액 가져오기
        if ($(node).find(".pay_price").length > 0) {
          price = $(node).find(".pay_price:eq(0)").text();
          originalPrice = $(node).find("del:eq(0)").text();
        } else {
          price = $(node).find(".price:eq(0)").text();
          originalPrice = price;
        }
    
        const rating = Math.round(
          parseFloat($(node).find(".star_solid").css("width").slice(0, -1))
        );
        const reviewCount = $(node).find(".review_cnt:eq(0)").text().slice(1, -1);
        const imgSrc = $(node).find(".card-image > figure > img").attr("src");
    
        courses.push({ // 정의한 부분들 가져오기
          title,
          instructor,
          price,
          originalPrice,
          imgSrc,
          rating,
        });
      });
    
      return courses;
}

// 
const getCourse = async (keyword) => {
    const html = await getHTML(keyword);
    const courses = await parsing(html);
    console.log(courses);
    return courses;
  };
  
  // 자바스크립트 검색 결과에서 여러 페이지의 데이터 크롤링하기
  // 존재하는 페이지 수만큼 가져오고자 할 때는 페이지가 있는지 확인하는 함수가 추가로 필요함
  const getFullCourse = async () => {
    let courses = [];
    let i = 1; 
    while (i <= 20) {
      const course = await getCourse(`자바스크립트&order=search&page=${i}`);
      courses = courses.concat(course);
      i++;
    }
  
    console.log(courses.length);
  };
  
  getFullCourse();