<template>
  <div>
    <h2>Calculator</h2>
    <div>
      <input type="text" v-model.number="num1" />
      <span>+</span>
      <input type="text" v-model.number="num2" />
      <span>=</span>
      <span>{{ result }}</span>
    </div>
  </div>
</template>
<script>
// import { ref, computed, toRefs } from 'vue'

// function plusNumber2() {
//   const state = ref({
//     // 실시간 변경사항에 대한 반응형
//     num1: 0,
//     num2: 0,
//     result: computed(() => state.num1 + state.num2)
//   })

//   return toRefs(state) // 반응형으로 선언된 num1, num2, result가 외부 function에서 정상적으로 동작하기 위해서 toRefs를 사용해야함
// }

import { plusNumber2 } from '@/api/common' // 여러개의 공통함수를 정의하고 필요한 함수를 가져와 사용할 수 있는 예시

export default {
  components: {},
  data() {
    return {
      //   num1: 0,
      //   num2: 0
      //   result: 0
    }
  },
  //   computed: {
  //     result() {
  //       return this.num1 + this.num2
  //     }
  //   },
  // Composition API
  // 컴포지션 API
  setup() {
    const { num1, num2, result } = plusNumber2() // 외부 function
    return {
      num1,
      num2,
      result
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
/* 19-3. 함수 밖에서 ref사용하기 : 외부의 변수, 함수를 가져와 setup함수에 연결
    1. 사용하기 위해서 반드시 computed, toRefs 임포트 -> import { ref, computed, toRefs } from 'vue'
        toRefs : 반응형으로 선언된 num1, num2, result가 외부 function에서 정상적으로 동작하기 위해서 toRefs를 사용해야함
        toRefs : 변수가 두개 이상일 경우 / toRef : 변수가 한개일 때
    2. 함수 밖에서 plusNumber2() 작성, result에 computed로 화살표 함수 구현
    3. setup()에 외부함수 가져오는 코드 작성
    ** 컴포지션 api
        - 장점: 여러개의 공통함수를 정의하고 필요한 함수를 가져와 사용할 수 있음
        - 단점 : 소스를 분석해야만 어떤 함수인지 알 수 있음
    ** 결론 : 옵션즈, 컴포지션 중에 아직 좋다고 확정하는데는 무리가 있음 그래도 알아두쟈..

*/
</script>
