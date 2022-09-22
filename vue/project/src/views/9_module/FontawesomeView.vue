<template>
  <div>
    <font-awesome-icon icon="user-secret" />
    <font-awesome-icon icon="user-clock" />
    <i class="fa-solid fa-envelope"></i>
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
  methods: {}
}
/*  24. Vue.js Fontawesome https://fontawesome.com/
    * Fontawesome
      - 전세계적으로 아이콘을 이용할 때 사용, 개발자들이 많이 사용
      - 프로와 프리 버전이 있음
      - https://fontawesome.com/start / vue를 선택하면 설치방법을 알 수 있음(그러나 2버전..)
      - 설치 및 사용
        1. 컴포넌트에 적용해 사용
          1. npm vue fontawesome / https://www.npmjs.com/package/@fortawesome/vue-fontawesome
          2. npm i --save @fortawesome/fontawesome-svg-core / npm i --save @fortawesome/free-solid-svg-icons / npm i --save @fortawesome/vue-fontawesome@prerelease(3버전 프리사용시)
          3. src/main.js 에 임포트
            - import { library } from '@fortawesome/fontawesome-svg-core' 라이브러리
            - import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons' solid-svg-icons의 무료버전 사용
            - import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
            - library.add(faAngleDown, faAngleUp) // 사용할 아이콘이름을 라이브러리에 넣고 사용하겠단 의미
            - app.component('font-awesome-icon', FontAwesomeIcon) // FontAwesomeIcon을 vue컴포넌트로 사용하겠다 의미
          4. 필요한 페이지에 사용 <font-awesome-icon icon="user-clock" /> // src/main.js에 선언한 아이콘 불러오기
        - 많은 아이콘을 사용할때는 이 방법이 비효율적, 한번에 불러오기도 가능하지만 무거워 지니 주의가 필요, 필요한 아이콘만 적용해서 사용하자
      2. 태그로 가져와서 사용
        1. font-awesome cdn > https://cdnjs.com/libraries/font-awesome 에서 소스 받아 public/index.html에 추가
        2. 사이트에서 원하는 태그를 검색해 복사 붙여넣기 <i class="fa-solid fa-envelope"></i>
        - 모튼 아이콘을 한번에 불러오는 거라 무거움, 컴포넌트에 적용해 사용 방법으로 필요한 아이콘만 가져올 수 있도록 하자
      - 상황헤 따라 필요한 방법으로 적용해 사용하자
*/
</script>
