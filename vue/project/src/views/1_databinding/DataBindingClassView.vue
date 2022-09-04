<template>
  <div>
    <div :class="{ 'text-red': hasError, active: isActive }">클래스 바인딩</div>
    <div :class="class2">클래스 바인딩2</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      isActive: false,
      hasError: false,
      class2: ['active', 'hasError']
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
<style scoped>
.active {
  background-color: greenyellow;
  font-weight: bold;
}

.text-red {
  color: red;
}
</style>

<!--
  * 4-9강
  ** class 속성 바인딩 : 다른 속성들 데이터 바인딩 방식과는 다름
  - :class="{ class이름: true인 함수 혹은 조건문, active: isActive ... }" class여러개 추가 가능
  - class 안에 -가 있다면 ""으로 감싸줘야 함(안 그럼 오류남)
  - 배열 형태로 할당가능(상대적으로 사용 빈도는 낮음) class2
-->
