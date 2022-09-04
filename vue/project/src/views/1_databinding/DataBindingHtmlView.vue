<template>
  <div>
    <div>{{ htmlString }}</div>
    <div v-html="htmlString"></div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      htmlString: '<p style="color:red;">빨간색 문자</p>'
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
  * 4-2강
  ** 기본구조 등록
  - 자주쓰는 코드로 등록해 사용 : https://github.com/thegreat-jeremy/bootcamp003/issues/33
  - 위 링크로 들어가서 기본 구분을 등록하자

  ** 중간작업
  - 라우터에 링크 정의 및 App.vue에서 추가한 페이지 링크 걸기

  ** html 바인딩
  - data에 htmlString: '<p style="color:red;">빨간색 문자</p>'추가 후 {{ htmlString }}로 바인딩하면 문자열로 바인딩 됨
  - <div v-html="htmlString"></div> :  v-html : innerhtml과 같은 기능을 해서 작성한 구문을 html로 바인딩해줌
-->
