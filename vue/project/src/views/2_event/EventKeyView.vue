<template>
  <div>
    <!-- <input
      type="search"
      name=""
      id=""
      @keyup="checkEnter($event)"
      v-model="searchText"
    /> -->
    <input
      type="search"
      name=""
      id=""
      @keyup.enter="doSearch"
      v-model="searchText"
    />
    <button @click="doSearch">조회</button>
    <button type="submit" @click.prevent="doSearch"></button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchText: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    doSearch() {
      console.log(this.searchText)
    },
    checkEnter(event) {
      // event.stopPropagation();
      if (event.keyCode === 13) {
        this.doSearch()
      }
    }
  }
}
</script>

<!--
  * 5-3강
  ** key event
  - 엔터키를 누르면 doSearch()가 살행되도록 하는 방법 2가지
    1. @keyup="checkEnter($event)" 으로 입력창에서 엔터키를 누르면 실행 되도록 기능구현
    2. @keyup.enter="doSearch" 으로 별도의 함수구현없이 엔터키를 누르면 실행되도록 함, 엔터키 뿐만 아니라 주요키에 대해 지원해줌, 1번처럼 별도의 함수구현 없이 실행가능
      // .enter
      // .tab
      // .delete
      // .esc
      // .space
      // .up
      // .down
      // .left
      // .right
      // .stop - event.stopPropagation()
      // .prevent - event.preventDefault();
-->
