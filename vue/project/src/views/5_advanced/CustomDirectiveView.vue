<template>
  <div>
    <div>
      <label for="email" class="form-label">이메일주소</label>
      <input type="email" name="" id="email" class="form-control" v-focus />
    </div>
    <div>
      <label for="pw" class="form-label">비밀번호</label>
      <input type="password" name="" id="pw" class="form-control" />
    </div>
    <div>
      <button class="btn btn-primary">로그인</button>
    </div>
    <div v-color="color" style="height: 50px"></div>
    <div v-demo="{ color: 'red', text: 'hello!' }"></div>
    <div>
      <input type="text" name="" id="" v-lowercase class="form-control" />
    </div>
    <div>
      <input type="text" name="" id="" v-uppercase class="form-control" />
    </div>
    <div>
      <input type="text" name="" id="" v-number class="form-control" />
      <input type="number" name="" id="" class="form-control" />
    </div>
    <div>
      <input type="text" name="" id="" v-korean class="form-control" />
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  directives: {
    // focus: {
    //   mounted(el, binding) {
    //     console.log(el)
    //     el.focus()
    //   }
    // },
    // lowercase: {
    //   mounted(el) {
    //     el.addEventListener('input', (event) => {
    //       console.log(event.target.value)
    //       event.target.value = event.target.value.toLowerCase()
    //     })
    //   }
    // },
    // uppercase: {
    //   mounted(el) {
    //     el.addEventListener('input', (event) => {
    //       console.log(event.target.value)
    //       event.target.value = event.target.value.toUpperCase()
    //     })
    //   }
    // },
    // number: {
    //   mounted(el) {
    //     el.addEventListener('input', (event) => {
    //       console.log(event.target.value)
    //       event.target.value = event.target.value.replace(/\D/g, '')
    //     })
    //   }
    // },
    // korean: {
    //   mounted(el) {
    //     el.addEventListener('input', (event) => {
    //       console.log(event.target.value)
    //       event.target.value = event.target.value.replace(
    //         /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,
    //         ''
    //       )
    //     })
    //   }
    // },
    color: {
      mounted(el, binding) {
        console.log(binding.value)
        el.style.backgroundColor = binding.value
      }
    },
    demo: {
      mounted(el, binding) {
        el.innerText = binding.value.text
        el.style.color = binding.value.color
      }
    }
  },
  data() {
    return {
      sampleData: '',
      color: 'red'
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
  * 15강 Vue.js Custom Directive
  - 기본으로 vue에서 지원하는 Directive : v-on, v-if 기타등등
  - html v-커스텀 디렉티브를 추가하고,script directives : 커스텀 디렉티브를 추가해 사용가능
  - directives안에 입력시에는 v-를 제외한 커스텀 디렉티브 명을 추가해야함
  - 커스텀 디렉티브에 라이프사이클 훅을 추가해 원하는 단계에 이벤트가 실행되게 할 수 있음
    - 라이프사이클훅단계(el- 앨리멘탈, bindding - 바인딩한 데이터가 있다면 그 데이터)
    - el.focus로 지정하면 해당 앨리멘탈에 포커스가 가게 할 수 있음
    - focus게 되도록, 색상 이벤트 예제
    - v-lowercase(영문 소문자로 변환), v-uppercase(영문 대문자로 변환), v-number(숫자만 입력), v-korean(한글만 입력) 강사가 주로 사용하는 폼 이벤트
  - directives를 모든 컴포넌트에서 공통으로 사용할 경우 main.js에 추가
  * 커스텀 디렉티브도 재사용 컴포넌트처럼 잘 만들면 여러곳에 사용 가능, 효율적인 작성 방법을 생각하고 만들어보자
-->
