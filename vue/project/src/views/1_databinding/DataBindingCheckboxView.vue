<template>
  <div>
    <div>
      <input
        type="checkbox"
        name=""
        id="html"
        value="HTML"
        v-model="favoriteLang"
      />
      <label for="html">HTML</label>
    </div>
    <div>
      <input
        type="checkbox"
        name=""
        id="css"
        value="CSS"
        v-model="favoriteLang"
      />
      <label for="css">CSS</label>
    </div>
    <div>
      <input
        type="checkbox"
        name=""
        id="js"
        value="JS"
        v-model="favoriteLang"
      />
      <label for="js">JavaScript</label>
    </div>
    <div>선택한 지역: {{ favoriteLang }}</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      favoriteLang: ['JS']
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
  * 4-5강
  ** checkbox
  - label, input에 연결하고자 id를 사용, 바닐라 자바스크립트처럼 값을 가져오기 위해 사용하지 않음
  - v-model=을 같은이름으로 지정하면 name을 동일이름으로 설정하는 것과 같게 됨
  - input과 select는 value와 양방향 데이터 바인딩이 되지만 checkbox의 경우에는 checked와 양방향 바인딩이 됨, 체크된 속성을 표시해줌
  - 다중선택이 가능해 체크된 속성이 배열로 전달됨, []로 설정되어야함
-->
