<template>
  <div>
    <button @click="increaseCounter">Add 1</button>
    <p>{{ counter }}</p>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      counter: 0
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    increaseCounter() {
      this.counter += 1
    }
  }
}
</script>
<!--
  * 5-1강
  ** click event
  - 이벤트를 추가할 태그에 @click="이벤트 함수", 이벤트 호출 함수는 method에 추가
  - 데이터 바인딩을 할 데이터를 data에 key:value로 추가

-->
