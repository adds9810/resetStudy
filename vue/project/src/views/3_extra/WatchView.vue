<template>
  <div>
    <div>
      <input type="text" name="" id="" v-model="firstName" />
      <input type="text" name="" id="" v-model="lastName" />
    </div>
    <h1>{{ fullName }}</h1>
    <p>{{ title }} {{ firstName }}, {{ lastName }}</p>
    <p>{{ title }} {{ firstName }}, {{ lastName }}</p>
    <p>{{ title }} {{ firstName }}, {{ lastName }}</p>
    <div>
      <select name="" id="" v-model="selected">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      title: 'Mr.',
      fullName: '',
      selected: '',
      changeHistory: []
    }
  },
  watch: {
    firstName(newValue, oldValue) {
      console.log('oldValue', oldValue)
      console.log('newValue', newValue)
      this.fullName = this.title + ' ' + this.firstName + ', ' + this.lastName
    },
    lastName(newValue, oldValue) {
      console.log('oldValue', oldValue)
      console.log('newValue', newValue)
      this.fullName = this.title + ' ' + this.firstName + ', ' + this.lastName
    },
    selected(newValue, oldValue) {
      this.changeHistory.push(newValue)
      console.log(this.changeHistory)
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
  * 7-2강
  ** watch
  1. data에 설정된 특정 데이터 변수를 값이 변경했을 때를 감지해 변경하고자 할 때, 직접 관리하고 싶을 때 사용
  - watch 안에 data 안의 직접 관리할 변수와 이름을 똑같이 만들면 함수가 바로 호출해 기능 실행, 변경이 일어날 때만 감지 및 기능실행
  - computed와 차이 : computed에 새로운 함수명을 만들에 관련 데이터 변수가 있는지 확인해 실시간으로 실행, 변경이 일어나지 않았어도 감시 및 실행
  2. 변경값을 추적하고 싶을때 사용, 함수 안에 두가지 피라미터를 받을 수 있음 data안과 동일한 함수명(newValue, oldValue)
    - newValue : 변수안에 변경된 값
    - oldValue : 이전의 변수에 있던 값
    - 유용한 사용법 : select의 섵렉값 순서를 추적감시 배열, 사용자의 패턴, 행동양식을 분석하기 위해 값을 감시할 수 있음, 사용자거 어느 영역에서 오래 있었는지를 수집해 분석하는데 도움이 될 수 있음
-->
