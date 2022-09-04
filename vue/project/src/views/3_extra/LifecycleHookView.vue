<template>
  <div>
    <div>{{ sampleData }}</div>
    <div>
      <label for="">태어난 도시는?</label>
      <select name="" id="">
        <option value="" :key="city.code" v-for="city in cities">
          {{ city.title }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
/* Lifecycle Hook
 - 각 단계마다(라이프사이클) 지정된 이벤트 훅이 있음
 - 전체적인 흐름과 단계별 상태에 대해 파악하면 좋음 : https://vuejs.org/guide/essentials/lifecycle.html
 - before~ 단계는 사용하지 않아도 지장은 없으나 파악하고자 기술
 - 아래 단계는 강사가 주로 사용하는 순서 위주, 많이 사용하는 4단계만 잘 활용해도 구현하기 좋음
  - setup : 강사가 많이 사용
    - composition api : 3버전에서 출시 중요한 기능이지만 실무에서는 아직 사용빈도가 낮음
  - beforeCreate : 인스턴스가 초기화되면 props 설정을 처리한 후 data() 또는 computed 같은 다른 옵션을 처리하기 직전에 호출
  - created : data(), watch, computed, methods 이런 정보를 모두 가지고 준비가 끝난 상태, 강사가 많이 사용
  - beforeMount : 반응 상태 설정을 완료를 했지만, 아직 DOM 노드가 생성되지 않은 상태.(js소스 로드는 완료 DOM을 그리기 직전상태)
  - mounted : 실제 DOM이 랜더링이 끝난 상태(DOM에 접근하는 소스는 이 단계 이후에 할 수 있도록 해야함), 강사가 많이 사용
  - beforeUpdate : data 변경으로 인해 DOM을 업데이이트 하기 직전 상태
  - updated : data 변경으로 DOM이 업데이트 된 후에 호출
  - beforeUnmount : 현재 컴포넌트를 빠져 나가기 직전
  - unmounted : 현재 컴포넌트를 빠져 나갈 때, 강사가 많이 사용
 - 예) 고객 출생정보 받을 때
  - 보통 데이터를 서버에서 가져오는데 인터넷 환경에 따라 가져오는 시간이 차이남
  - 데이터 선공개 순서에 따라 created, mounted를 적절히 활용해야 함, 성능과도 연관되어 랜더링 속도에 영향을 준다
 - Lifecycle Hook 여러 단계가 있는데 이 중 돔에 랜더링 되기 전 created, 돔에 랜더링 된 시점 mounted를 잘 활용해서 서버로부터 요청하는 데이터 함수를 잘 요청하는 것이 중요함
 - unmounted : 현재 컴포넌트를 빠져 나갈 때, setInterval 해지, 복잡한 데이터를 더이상 가져올 필요가 없을때 꼭 해지하는 것이 중요
*/
export default {
  components: {},
  data() {
    return {
      sampleData: '',
      cities: [],
      fnInterval: null
    }
  },
  //   props: {

  //   },
  setup() {},

  // 인스턴스가 초기화되면 props 설정을 처리한 후 data() 또는 computed 같은 다른 옵션을 처리하기 직전에 호출
  beforeCreate() {},

  // data(), watch, computed, methods 이런 정보를 모두 가지고 준비가 끝난 상태, 돔 렌더링 직전, 사용자가 화면 로드하자마자 봐야할 데이터를 로드할 수 있게 실행함수 작성(나중에 봐도 되는 데이터는 나중에 하더라도...)
  created() {
    this.getCityList()
  },

  // 반응 상태 설정을 완료를 했지만, 아직 DOM 노드가 생성되지 않은 상태.
  beforeMount() {},

  // 실제 DOM이 랜더링이 끝난 상태, 가져온 데이터로 dom에 세팅해야할 때 해당 영역에 실행함수 추가
  mounted() {
    // this.getCityList()

    this.fnInterval = window.setInterval(() => {
      console.log('aaaa')
    }, 1000)
  },

  // data 변경으로 인해 DOM을 업데이이트 하기 직전 상태.
  beforeUpdate() {},

  // DOM이 업데이트 된 후에 호출
  updated() {},

  // 현재 컴포넌트를 빠져 나가기 직전
  beforeUnmount() {},
  // 현재 컴포넌트를 빠져 나갈 때, 다른 화면으로 빠져 나갈때 불필요한 기능은 해제하는 함수 구현, setInterval 함수 해제 등..., 가비지 콜랙션에 바로 인지하고 해지 시켜줌, 그렇지 않으면 해제하는 시간이 오래걸림.
  unmounted() {
    window.clearInterval(this.fnInterval)
    this.fnInterval = null
    this.cities = null
  },
  methods: {
    getCityList() {
      // 서버에 도시 목록을 요청.
      // 가져오는데 시간이 소요
      this.cities = [{ code: '02', title: '서울' }]
    }
  }
}
</script>
