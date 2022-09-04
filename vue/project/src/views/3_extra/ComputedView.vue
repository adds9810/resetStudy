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
    <p>{{ fullName }}</p>
    <div>
      <label for="age">당신의 나이는?</label>
      <input type="number" name="" id="age" v-model="age" />
    </div>
    <p>{{ age >= 20 ? '성인' : '미성년자' }}</p>
    <p>{{ isAdult }}</p>
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
      age: 0
    }
  },
  computed: {
    fullName() {
      return this.title + ' ' + this.firstName + ', ' + this.lastName
    },
    isAdult() {
      return this.age >= 20 ? '성인' : '미성년자'
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
  * 7-1강
  ** computed
  - 복잡한 구조하에 한번 함수로 만들어서 여러곳에 사용할 수 있음
  - 여러곳에서 data에 있는 내용들을 합쳐서 사용하게 될 경우가 있음 그럴때 방법
  - computed안에 함수를 구현하면 data안에 함수를 설정하는 것과 같음, 관련 변수가 수정되면 실시간으로 반영됨(리액티브, 아래 설명 참조)
    1. {{ title }} {{ firstName }}, {{ lastName }}로 사용
    2. computed에 관련 기능함수 구현 : computed안에 함수 구현
    - fullName() { return this.title + ' ' + this.firstName + ', ' + this.lastName } : data(){fullName:...}과 같은 효과가 있음, 세개의 문자열을 하나로 합한 값으로 보여줌

  ** 반응형(리액티브)
  - 하나 수정되면 연관될 것들이 동시에 변경됨
    - js data에 firstName: 'John'정의 후, input에 v-model="firstName" 설정
    - 변경되면 실시간으로 반영되어 fullName() 안의 this.firstName로 반영 됨
-->
