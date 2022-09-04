<template>
  <h3>{{ title }}</h3>
</template>
<script>
/* 9-1강
  * 뷰의 큰 장점
  재사용가능: 여러 화면에서 사용하는, 사용빈도가 높은 서버 데이터를 포함한 ui요소를 잘라 호출해서 사용할 수 있게 해줌, 애플리케이션을 빠르게 만들 수 있음, 한번 잘 만들어두면 다른 프로젝트에서도 재활용 할 수 있음, 화면 전체인지 단위인지에 따라서 재사용해서 사용할 수 있음, 사소하지만 잘 만들어두면 효율적으로 사용가능
*/
export default {
  components: {},
  props: {
    // 부모컴포넌트로부터 데이터 값을 전달받아 사용할때
    title: {
      type: String, // 데이터 유형 : 부모로부터 받은 데이터의 속성:값
      default: '페이지 제목' // 부모가 데이터를 전달하지 않았을때 기본값
    }
  },
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
</script>
