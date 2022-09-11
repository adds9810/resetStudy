<template>
  <div>
    <h2>Calculator</h2>
    <div>
      <input type="text" v-model.number="num1" @keyup="plusNumber" />
      <span>+</span>
      <input type="text" v-model.number="num2" @keyup="plusNumber" />
      <span>=</span>
      <span>{{ result }}</span>
    </div>
    <br />
    <div>
      <input type="text" v-model.number="state.num1" @keyup="plusNumber2" />
      <span>+</span>
      <input type="text" v-model.number="state.num2" @keyup="plusNumber2" />
      <span>=</span>
      <span>{{ state.result }}</span>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  components: {},
  data() {
    return {
      num1: 0,
      num2: 0
      // result: 0
    }
  },
  computed: {
    result() {
      return this.num1 + this.num2
    }
  },
  // Composition API
  // Composition API : setup() 함수 내에서 모든걸 구현
  setup() {
    const state = reactive({
      // 실시간 변경사항에 대한 반응형
      // 변수 선언 후 html요소에 변수명.오브젝트명으로 지정해 사용가능
      num1: 0,
      num2: 0,
      result: 0
    })

    function plusNumber2() {
      this.result = state.num1 + state.num2
    }

    // 사용하고자 하는 변수와 함수를 return 해줘야함
    return {
      state, // 실제 참조하는 변수
      plusNumber2 // 함수
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    plusNumber() {
      this.result = this.num1 + this.num2
    }
  }
}
/*
19-1. Composition API
- 뷰 2->3으로 넘어가면서 생긴 변화 중에 하나
- 핵심 기술로 강조하지만 실무에서는 잘 사용하지 않음
- setup() 함수 내에서 모든걸 구현
- 2버전에서 복잡한 애플리케이션 구현 시 관리가 힘들다는 단점이 있음 : 하나의 기능을 처리하기 위한 함수, 변수들이 너무 흩어져 있음(Options API)
    -> 복잡하거나 계층구조가 많은 프로젝트에서는 관리가 어려움 -> Composition API 등장
- 관련된 함수, 변수들이 모여있음, 관리하기 쉽다 3버전에서 강조, 그라나 그렇지 않음
    -> 이전 방식이 오히려 장점이고 편하게 느껴 이전방식대로 사용중, 이전방식으로 많이 개발해온 작업자들은 오히려 변경된 방식이 불편할 수 있음
- 나중에 활용할 것을 대비해 알아두면 좋음, 아직까지는 Options API를 많이 사용

* 변수 2개의 합을 구하는 방법
  1. event로 추가
  2. computed 실시간 반영되도록
  3. (Composition API) : reactive 사용
    - import { reactive } from 'vue' : Composition API를 사용하기 위한 플러그인??
      -> reactive : setup() 함수에 실행한 함수들도 reactive함수안에 넣어주면 반응형으로 실행할 수 있음
    - setup 함수에 구문 실행
*/
</script>
