<template>
  <div>
    <input type="radio" name="" id="ai" value="AI" v-model="favoriteField" />
    <label for="ai">인공지능</label>
    <input
      type="radio"
      name=""
      id="blockchain"
      value="BC"
      v-model="favoriteField"
    />
    <label for="blockchain">블록체인</label>
    <input type="radio" name="" id="iot" value="IOT" v-model="favoriteField" />
    <label for="iot">사물인터넷</label>
    <input
      type="radio"
      name=""
      id="other"
      value="OTH"
      v-model="favoriteField"
    />
    <label for="other">기타</label>
    <div v-show="favoriteField === 'OTH'">
      <input type="text" name="" id="" />
    </div>
    <!-- <div v-if="favoriteField === 'OTH'">
      <input type="text" name="" id="" />
    </div> -->
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      favoriteField: ''
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
  * 6-2강 Vue.js 렌더링조건(v-if,v-show)
  ** v-show
    - v-if처럼 조건문으로 특정 태그의 노출여부를 설정할 수 있음
    - v-if와의 차이 : 차이점을 이해하고 상황에 맞게 사용해야함
      - v-show는 조건이 true면 설정한 태그의 style display:none;가 사라짐, false면 style display:none;로 설정되어 보이지 않음(노출/비노출을 자주해야하는 태그에 사용, radio, checkbox 선택에 따른 노출)
      - v-if는 조건이 true면 설정한 태그가 나타남, false면 태그는 보이지 않고 --v-if-- 로 표시됨, 객체트리가 생성되어 있지 않음(회원 등급에 따른 노출여부)
-->
