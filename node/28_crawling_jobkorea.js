// 19.크롤링(잡코리아)
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config({ path: "nodemailer/.env" });
const nodemailer = require("./nodemailer");
const cron = require("node-cron");

const getHTML = async (keyword) => {
  try {
    const html = (
      await axios.get(
        `https://www.jobkorea.co.kr/Search/?stext=${encodeURI(keyword)}`
      )
    ).data;

    return html;
  } catch (e) {
    console.log(e);
  }
};

// cheerio jquery와 비슷하지만 완전히 동일하지 않음. 안되는 문법은 다른 방법을 고민해보자
// .trim() 공백제거
const parsing = async (page) => {
    const $ = cheerio.load(page);
    const jobs = [];
    const $jobList = $(".post");
    $jobList.each((idx, node) => {
      const jobTitle = $(node).find(".title:eq(0)").text().trim();
      const company = $(node).find(".name:eq(0)").text().trim();
      const experience = $(node).find(".exp:eq(0)").text().trim();
      const education = $(node).find(".edu:eq(0)").text().trim();
      const regularYN = $(node).find(".option > span:eq(2)").text().trim();
      const region = $(node).find(".long:eq(0)").text().trim();
      const dueDate = $(node).find(".date:eq(0)").text().trim();
      const etc = $(node).find(".etc:eq(0)").text().trim();
  
      if (
        experience.indexOf("신입") > -1 ||
        experience.indexOf("경력무관") > -1
      ) {
        jobs.push({
          jobTitle,
          company,
          experience,
          education,
          regularYN,
          region,
          dueDate,
          etc,
        });
      }
    });
  
    return jobs;
};

// 데이터 크롤링하기
const getJob = async (keyword) => {
  const html = await getHTML(keyword); // 키워드로 검색한 html 소스 가져오기
  const jobs = await parsing(html); // 가져온 html중 원하는 값으로 파싱

  console.log(jobs);
  return jobs;
};

// 이메일로 크롤링한 데이터 보내기
const crawlingJob = async (keyword) => {
  const jobs = await getJob("node.js");

  const h = [];
  h.push(`<table style="border:1px solid black;border-collapse:collapse;>"`);
  h.push(`<thead>`);
  h.push(`<tr>`);
  h.push(`<th style="border:1px solid black;">구인제목</th>`);
  h.push(`<th style="border:1px solid black;">회사명</th>`);
  h.push(`<th style="border:1px solid black;">경력</th>`);
  h.push(`<th style="border:1px solid black;">학력</th>`);
  h.push(`<th style="border:1px solid black;">정규직여부</th>`);
  h.push(`<th style="border:1px solid black;">지역</th>`);
  h.push(`<th style="border:1px solid black;">구인마감일</th>`);
  h.push(`<th style="border:1px solid black;">비고</th>`);
  h.push(`</tr>`);
  h.push(`</thead>`);
  h.push(`<tbody>`);
  jobs.forEach((job) => {
    h.push(`<tr>`);
    h.push(`<td style="border:1px solid black;">${job.jobTitle}</td>`);
    h.push(`<td style="border:1px solid black;">${job.company}</td>`);
    h.push(`<td style="border:1px solid black;">${job.experience}</td>`);
    h.push(`<td style="border:1px solid black;">${job.education}</td>`);
    h.push(`<td style="border:1px solid black;">${job.regularYN}</td>`);
    h.push(`<td style="border:1px solid black;">${job.region}</td>`);
    h.push(`<td style="border:1px solid black;">${job.dueDate}</td>`);
    h.push(`<td style="border:1px solid black;">${job.etc}</td>`);
    h.push(`</tr>`);
  });
  h.push(`</tbody>`);
  h.push(`</table>`);

  const emailData = {
    from: "ria9810@gmail.com",
    to: "ria9810@gmail.com, toto7971@naver.com",// 참조는 쉼표로 구분 
    subject: "Node.js 구인 회사 정보",
    html: h.join(""),
  };

  await nodemailer.send(emailData);
};

// 매일 아침 7시에 크롤링이 진행되고, 수집된 결과를 이메일로 전송
cron.schedule("* * * * *", async () => {
  crawlingJob("node.js");
});

// 사용예시
// 원하는 구인 사이트에 검색어를 입력해 설정한 시간에 메일로 발송하게 할 수 있음
// 찜한 아이템 할인 시 메일 안내

// 크롤링 html태그가 변경되면 사용불가, 크롤링이 불법일 수 있음 가능여부 확인하고 사용해야하는 번거로옴이 있음
