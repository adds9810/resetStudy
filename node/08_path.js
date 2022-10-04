// 3-5. path: 파일이나 디렉토리 경로 작업을 위한 다양한 한수 제공, 사용빈도 높은 편 , 파일경로 관련
// path.작업한 파일 주어진 파일에 대해 다양한 함수를 제공해 path에 대한 정보를 출력할 수 있도록 기능 제공
const path = require("path");

console.log(__dirname); // 현재 실행되고 있는 파일의 디렉토리 경로
console.log(__filename); // 현재 실행되고 있는 파일의 경로

console.log(path.basename(__filename)); // 경로의 마지막 부분
console.log(path.basename(__filename, ".js")); // 경로의 마지막 부분에서 확장자를 제거한 이름

console.log(path.dirname(__filename)); // 파일의 디렉토리 경로
console.log(path.dirname("dir1/dir2/dir3/file.js")); // 특정 파일의 경로를 설정할 때

console.log(path.extname(__filename)); // 파일의 확장자

console.log(path.parse("/home/user/dir/file.txt")); // 경로 오브젝트를 출력해줌
const path1 = path.parse("/home/user/dir/file.txt");
console.log(path1.name);
// {
//     root: '/',
//     dir: '/home/user/dir',
//     base: 'file.txt',
//     ext: '.txt',
//     name: 'file'
//   }
// 파일 이름 가져오기,  파일 확장자 가져오는 것 많이 사용? 업로드 된 파일 원하는 확장자가 맞는지 비교할 때 사용

 // path1에서 받은 정보로 반대로 경로를 가져올 수 있음
const path2 = path.format({
  root: "/",
  dir: "/home/user/dir",
  base: "file.txt",
  ext: ".txt",
  name: "file",
});

console.log(path2);

// 하나의 문장으로 합치고자 할 때
console.log(path.join("/home", "user", "dir", "file.txt"));
