<template>
  <div>
    <button @click="doSearch">조회</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    doSearch() {
      const loader = this.$loading.show() // 화면 보여짐
      // simulate AJAX
      setTimeout(() => {
        loader.hide() // 화면 닫힘
      }, 5000)
    }
  }
}
/* 27. Vue.js vue-loading-overlay - 뷰 로딩 모듈(https://www.npmjs.com/package/vue-loading-overlay)
- 페이지에 접속 후 로드하는 동안, 진행중 임을 보여주기 위해 사용하는 로딩 화면
- 공식문서에 예시와 옵션이 있으지 잘 확인해서 사용하자
1. 설치 : npm install vue-loading-overlay@^5.0
2. 임포트
  import VueLoading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  app.use(VueLoading);
3. 원하는 페이지에 버튼 클릭시 실행소스 구현

** 팁: 실무에서 라이브러리를 찾고자 할때 npm의 1주간 다운로드 횟수를 확인해보자, 많이 다운로드 했을수록 안정적, 검증됨, 그렇지 않다면 불안할수도?

*/
</script>
