<template>
  <div>
    <h1>Hello {{ userName }}</h1>
    <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: 'John Doe',
      message: 'Welcome 개발자의 품격',
      arr: [],
      obj: {}
    }
  }
}
</script>
<style scoped>
.text-red {
  color: red;
}
</style>

<!--
  * 4강-1
  - 3버전부터 이름이 통일하는 방향으로 가이드하고 있음 ~View.vue
  - template, script, style를 입력하면 가이드가 나옴, 각각의 페이지에 html,css,js를 분리해 적고 관리할 수 있음(리액트는 구분되어 있지 않음), 적은 노력으로 관리가능(리액트가 맞는 프로젝트가 있고 뷰가 맞는 프로젝트가 있음)
  - style scoped는 현재 화면의 디자인에만 적용됨, 보통 asset폴더에 한번에 적용하지만 이 페이지메만 적용하고 싶은 css가 있을 경우 사용
  - 뷰는 한 페이지에 template 안에 div태그가 있고 그 안에 컨텐츠 관련 태그들이 있어야 함 template > div > p+img...(2버전 필수조건, 3버전은 오류는 안 나지만 2버전에서도 재사용이 될 수 있도록 사용하면 좋음)

  * 데이터 바인딩 : 단방향, 양방향 가능, 데이터타입에 따라 작성방법이 다름
  ** 단방향 데이터 바인딩 : 자바스크립트에서 html로 데이터를 전달해서 보이도록 함
  - 문자 바인딩
   - data() {return {userName: 'John Doe',}}로 입력 후 html 태그안에 {{ userName }}로 입력하면 그 문자를 출력
   - message: 'Welcome 개발자의 품격', 추가 및 <p>{{ message }}</p> 추가
  - router index.js에 현재 페이지가 보이도록 아래 추가
    {
      path: '/databinding/string',
      name: 'DataBindingStringView',
      component: () =>
        import(
          /* webpackChunkName: "databinding", webpackPrefetch:true */ '../views/1_databinding/DataBindingStringView.vue'
        )
    }
  ** 양방향 데이터 바인딩 :자바스크립트에서 html로 데이터를 전달해서 보이고, html내에서 값이 번경되면 자바스크립트에서도 반영이 되도록 함
-->
