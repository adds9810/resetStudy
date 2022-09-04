<template>
  <div>
    <div style="color: red; font-size: 30px">
      스타일 바인딩: 글씨는 red, 폰트크기:30px
    </div>
    <div :style="style1">스타일 바인딩: 글씨는 green, 폰트크기:30px</div>
    <button @click="style1.color = 'blue'">색상바꾸기</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      style1: {
        color: 'green',
        fontSize: '30px'
      }
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
  * 4-10강
  ** 스타일 바인딩
  - style는 key:value형태로 되어 있음
  - 때문에 style을 object로 받아 데이터 바인딩 가능
  - css 속성 중 -로 되어 있는 부분은 카멜표기법처럼 작성 font-size -> fontSize
  - :style="style1"로 가져와 반영가능
  - event로 변경할 때도 object로 접근해 변경가능 @click="style1.color = 'blue'", 변경하면 데이터 바인딩이 되어 자동으로 스타일이 변경됨

  *** 각각의 데이터 바인딩 방법을 숙지하고 사용해야 한다
-->
