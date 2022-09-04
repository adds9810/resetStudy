<template>
  <div>
    <div v-if="userRole === 'G'">
      <button>조회</button>
    </div>
    <div v-else-if="userRole === 'M'">
      <button>조회</button>
      <button>생성</button>
    </div>
    <div v-else>
      <button>조회</button>
      <button>생성</button>
      <button>삭제</button>
    </div>

    <!-- <div v-if="userRole === 'A'">
      <button>조회</button>
      <button>생성</button>
      <button>삭제</button>
    </div>
    <div v-else-if="userRole === 'M'">
      <button>조회</button>
      <button>생성</button>
    </div>
    <div v-else>
      <button>조회</button>
    </div> -->
    <!-- <button v-if="userRole === 'A' || userRole === 'M' || userRole === 'G'">
      조회
    </button>
    <button v-if="userRole === 'A' || userRole === 'M'">생성</button>
    <button v-if="userRole === 'A'">삭제</button> -->
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      userRole: 'M' // A(Admin) - 관리자, M(Manager) - 매니저, G(General) - 일반사용자
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>

<!--
  * 6-1강 Vue.js 렌더링조건(v-if,v-show)
  ** 렌더링조건(v-if,v-show) : 특정태그의 노출여부 조건 작성하는 방법(실무에서는 관리자에게는 버튼이 보이고, 일반회원에게는 버튼이 안 보이게)
  - v-if / v-else-if / v-else === if(){}else if(){} else{} 와 같은 기능, 조건에 따라서 버튼 노출여부를 지정할 수 있다
  - 조건문 작성시 복잡한 조건을 만든다는 가정하에 가장 많은 조건부터 설정하는 것이 중요(데이터 로드시 가장 많이 사용할 변수에 맞춰 작성) 예)일반회원>매니저>관리자
-->
