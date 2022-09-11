<template>
  <div></div>
</template>
<script>
import Formatter from '@/mixins/formatter'
// import Axios from '@/mixins/axios'
export default {
  components: {},
  mixins: [Formatter],
  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {
    console.log('MixinView의 created')
    // console.log(Math.round(-350023.7))
  },
  mounted() {
    console.log('MixinView의 mounted')
    console.log(this.$convertDateFormat('20220601', 'YYYY-MM-DD'))
    console.log(this.$convertDateFormat('20220601', 'MM.DD.YYYY'))

    // 숫자 표기포맷터에 따라 출력
    console.log(this.$convertNumberFormat(2547500, '#,###'))
    console.log(this.$convertNumberFormat(2547500, '#,###.#0'))
    console.log(this.$convertNumberFormat(2547500.4, '#,###.#0'))
    console.log(this.$convertNumberFormat(2547500.4, '#,###.##'))
    console.log(this.$convertNumberFormat(-2547500.4, '#,###.##'))
    console.log(this.$convertNumberFormat(-2547500.4, '$#,###.##'))
    console.log(this.$convertNumberFormat(125.23, '#,###.#0%'))
    console.log(this.$convertNumberFormat(125.5, '#,###.#0%'))
    console.log(this.$convertNumberFormat(125, '#,###원'))

    this.getCustomers()
  },
  unmounted() {},
  methods: {
    async getCustomers() {
      const customers = await this.$get('http://localhost:3000/customers')
      console.log(customers)
    }
  }
}
</script>
<!--
  * 16. mixins
  - vue에서 가장 중요한 기능, 재사용 컴포넌트, 커스텀디렉티브와 더불어 mixins을 어떻게 활용하느냐에 따라 웹애플리케이션 속도나 품질에 영향을 줄 수 있음
  1. src/views/5_advanced/MixinView.vue, mixins/formatter.js 추가
  2. ~view.vue 안에 script에 해당하는 부분을 mixin으로 저장해 두었다 사용할 수 있음
  3. mixins/formatter.js에 날짜를 원하는 포맷으로 만들기
  4. MixinView.vue에 작성한 formatter.js를 임포트하고 mixins 생성 및 연결
    - mixin한 내용이 해당 vue의 js 영역 부분에 병합됨
    - mixin한 파일에 먼저 나오고 view.vue파알의 내용이 나오는 순서
    - 출력한 날짜 확인하기 예제
    * mixin으로 사용하는 함수명은 이름앞에 $를 붙여 구분해 사용
  5. mixins/status.js에 서버 데이터베이스 현재 시간, 분,초, 사용자 아이디, 현재 라우터 패스 저장
    - 사용자가 어느 페이지에 얼마나 머물고 갔는지 알 수 있음
    * 자주 사용하는 필요한 믹스인만 만들어서 사용하는 것이 중요, 불필요한 믹스인 파일은 ㄴㄴ
  6. mixins/axios.js
    - axios : 오픈소스 라이브러리, 서버랑 통신할 때 사용하는 라이브러리
    https://github.com/axios/axios / https://axios-http.com/kr/docs/intro
    - 데이터 통신 및 조회를 웹사이트에서 많이 이용하기 때문에 믹스인으로 만들어두면 유용함
    6-1. axios설치 npm install axios
    6-2. async, awite방식으로 통신구현, 공식문서 보고 작성
    6-3. MixinView.vue mixin axios 연결 getCustomers으로 데이터 호출하기
  7. 자주사용하는 함수 mixins/index.js파일 만들어 모으고 main.js에 전역으로 연결하기
    - main.js에 mport imixin from './mixins'(연결할 톨더 안의 index.js일 경우 폴더명까지만 입력, 아니라면 파일명까지 다 써야함)
    - app.mixin(mixin) 추가해 전역연결
  8. mixins/index.js에 axios get, post, put, delete 방식, 날짜 함수 추가하기, 공식문서 참고해 작성
  9. $convertNumberFormat 통화금액 포맷터 만들기(어려운 부분이라 보고 나중에 공부하자)
  ** 공통으로 사용하는 함수를 믹스인으로 저장해 사용할 수 있다. mixin/index.js에 모아두고 main.js에 정의 한 다음 전역으로 사용할 수 있다
   - 서버통신 get, post, put, delete, 날짜 포맷팅, 숫자 포맷팅
   - 추후 파일 업로드, 엑셀업로드 작성 예정
  ** 재사용 컴포넌트, 커스텀디렉티브, mixins 중요, 애플리케이션에서 많이 사용함수들을 잘 구성해 두면 신규 애플리케이션 제작시 빠르고 안정적으로 만들 수 있다
-->
