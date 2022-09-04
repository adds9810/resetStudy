<template>
  <div>
    <input type="text" v-model="userId" />
    <button @click="myFunction">클릭</button>
    <button @click="changeData">변경</button>
    <br />
    <input type="text" v-model="num1" /> +
    <input type="text" v-model="num2" /> =
    <span>{{ num1 + num2 }}</span>
    <br />
    <input type="text" v-model.number="num3" /> +
    <input type="text" v-model.number="num4" /> =
    <span>{{ num3 + num4 }}</span>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      userId: 'seungwon.go',
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    myFunction() {
      console.log(this.userId)
    },
    changeData() {
      this.userId = 'Jeremy'
    }
  }
}
</script>
<!--
  * 4-3강
  ** input v-model(양방향 데이터 바인딩)
  - v-model="userId" : data애 userId 추가 및 값을 설정하고 해당 input에 key를 추가하면 바인해서 보여줌(뷰의 큰 장점 중 하나)
  - 사용자가 값을 입력하면 해당 key값에 실시간으로 value값이 전달됨
  - 양방향 데이터 바인딩 역사
    - 구글 앵귤러에서 지원 처음 지원, 그러나 화면이 복잡해질 것에 대한 대응이 안되어 화면 로딩이 느려짐,
    - 페이스북 리액트에서 앨귤러의 느려지는 단점 보완, 돔객체트리를 컨트롤해서 가속화 필요성이 생김 -> 가상돔(버추얼돔이 생김)을 만들어 한번에 반영해 느린속도 개선(가속화), 그러나 양방향 데이터 바인딩을 제공하지 않음 그로인한 담점이 있음
    - 뷰 : 앵귤러의 양방향 바인딩, 리액트의 버츄얼 돔(빠른 화면전환)을 수용한 프레임워크
  - 이벤트 리스너(버튼 클릭으로 값 확인)
   - onclick를 @click로 사용, 이벤트 함수는 method에 추가해 실행 function는 포함하지 않고 실행
   - data안의 값에 접근하고자 할 때, this.값으로 접근
  - 숫자 입력받아 계산하기
    - type="text"로 받으면 무조건 문자열로 받아아서 기대한 값을 받을 수 없음
    - v-model.number로 숫자로 받을 수 있게 해야함
    - <span>{{ num3 + num4 }}</span>로 실시간 값이 반영될 수 있게 함
-->
