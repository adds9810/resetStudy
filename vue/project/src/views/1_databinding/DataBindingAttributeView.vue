<template>
  <div>
    <input type="text" name="" id="" v-bind:value="userId" readonly />
    <input type="text" name="" id="" :value="userId" readonly />
    <br />
    <img :src="imgSrc" alt="" style="width: 100px; height: auto" />
    <br />
    <input type="search" name="" id="" v-model="txt1" />
    <button :disabled="txt1 === ''">조회</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      userId: 'seungwongo',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png',
      txt1: ''
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
  * 4-7
  ** html 요소의 속성으로 데이터 바인딩, 제어
  - v-bind:속성 혹은 :속성으로 사용
  - readonly(읽기전용)일 경우, v-bind:value설정으로 사용자가 값을 입력하지 못하게 막을 수 있음, 양방향 데이터 바인딩인 v-model보다 v-bine로 직접 데이터를 바인딩하는 것이 좋음
  - v-bind는 생략이 가능해서 :value="userId"로도 사용가능
  - img일 경우, :src에 추가, :src="imgSrc"
  - 조건문도 만들 수 있음 :disabled="txt1 === ''" -> 입력란이 공백이면 비활성화 되도록
-->
