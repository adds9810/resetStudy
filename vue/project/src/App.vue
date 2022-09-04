<template>
  <header-layout />
  <div class="container">
    <router-view />
  </div>
  <footer-layout />
</template>
<script>
import HeaderLayout from '@/components/layouts/HeaderLayout.vue'
import FooterLayout from '@/components/layouts/FooterLayout.vue'
export default {
  components: { HeaderLayout, FooterLayout }
}
</script>
<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
<!--
  * 13. 레이아웃 컴포넌트 : 화면 레이아웃을 분리해 재사용 컴포넌트로 생성
    1. layouts 폴더 및 FooterLayout.vue, HeaderLayout.vue 생성
     - 파일 이름의 끝을 동일하게 사용할 수 이름으로 지정해야함, 단일 이름으로 작성이 오류 발생
     - 레이아웃 파일은 이름을 ~Layout.vue 통일
    2. HeaderLayout.vue 헤더 영역 및 부트스트랩 적용
     - a태그를 사용하고 해당 메뉴로 갈 수 있도록 클릭이벤트 추가 @click="gotoMenu('/')"
     - 피라미터를 메뉴 path명으로, 클릭시 라우터를 호출해 해당 메뉴로 이동할 수 있도록 method에 추가(router-link to로 이동할수도 있지만 클릭 이벤트로도 구현가능함)
     goToMenu(path) {
      this.$router.push({ path: path })
     }
    3. FooterLayout.vue 푸터 영역 및 부트스트랩 추가 및 커스터마이징
    4. 헤더와 푸터를 app.vue에 임포트 및 컴포넌트 추가, 태그로 추가
-->
