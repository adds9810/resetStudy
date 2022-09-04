<template>
  <div>
    <select name="" id="" v-model="selectedCity">
      <option value=""></option>
      <option value="02">서울</option>
      <option value="051">부산</option>
      <option value="064">제주</option>
    </select>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      selectedCity: '051'
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
  * 4-4강
  ** select값 받기(양방향 데이터 바인딩)
  - 텍스트는 입력을 받을 수 없어 단방향 데이터 바인딩 : {{  }}
  - input, select는 사용자에게 값을 받을 수 있어 양방향 데이터 바인딩 : v-model(사용자가 값을 추가할 수 있는 곳에만 사용가능)
-->
