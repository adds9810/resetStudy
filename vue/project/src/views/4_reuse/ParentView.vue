<template>
  <div>
    <button @click="changeValue" ref="btn">변경</button>
    <child-component
      :str="strParent"
      :num="numParent"
      :isOk="isOkParent"
      :arr="arrParent"
      :obj="objParent"
      @change-num="getData"
      ref="child1"
    /><!-- 속성을 직접 넣을수도 있고 데이터 바인딩으로 data의 데이터로 추가할 수 있음 -->
    <!-- 데이터를 태그에 직접 추가할 때 숫자, 불리언, 배열로 데이터를 전달할 때 해당 키 앞에 :가 있어야 원하는 값으로 인식하고 전달됨, 없으면 모두 문자열로 인식되어 전달됨, 에로는 안나지만 원하는 데이터 타입으로 전달받을 수 없음 -->
  </div>
</template>
<script>
/*
  9-2강
  * 정의한 ChildComponent는 ChildComponent 또는 child-component로 사용가능
  * 만약 정의한 이름과 다른 이름으로 사용하고 싶다면 변경해서 정의 가능 components: { 'child-com' : ChildComponent }, 같은 이름이면 두번 쓸 필요없음(생략가능)
*/
import ChildComponent from '@/components/fragments/ChildComponent.vue'
export default {
  components: { ChildComponent },
  // components: { 'child-com' : ChildComponent },
  data() {
    return {
      sampleData: '',
      strParent: '개발자의품격2',
      numParent: 12,
      isOkParent: true,
      arrParent: [1, 2, 3, 4, 5],
      objParent: { name: 'Jeremy' }
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    getData(data) {
      console.log('자식 컴포넌트에서 이벤트 호출')
      console.log(data)
    },
    changeValue() {
      this.$refs.child1.str2 = 'Seoul'
      this.$refs.child1.printMessage()
    }
  }
}
/*
  9-3강
  커스텀 이벤트 @change-num="getData"를 정의하고 이를 자식컴포넌트 this.$emit(커스텀 이벤트명)으로 적으면 사용가능, this.$emit('change-num')하면 @change-num안에 있는 이벤트가 실행됨
  자식컴포넌트에서 부모컴포넌트를 호출하면서 데이터를 실어 보낼 수 있음

  9-4
  ref="child1" id와 동일, 뷰에서 유일한 값을 정의할 때 사용, 자식컴포넌트에서 이것을 통해 접근할 수 있음
  : this.$refs.를 통해 ref에 접근, ref 중 this.$refs.child1로 child1에게 접근할 수 있음
  자식의 메소드 안의 함수도 호출해서 사용가능 this.$refs.child1.printMessage()

  * 재사용 컴포넌트의 핵심
  - 부모 -> 자식 호출 ref 정의 후 this.$refs.로 접근해 호출 및 사용가능
  - 자식 -> 부모 this.$emit('커스텀 이벤트명', 전달할 데이터명), 부모 컴포넌트에서 @커스텀 이벤트명=실행함수를 추가하면 자식컴포넌트에서 호출해 부모컴포넌트에 데이터를 전달할 수 있다.
  - 많은 페이지에서 공통으로 사용하는 페이지는 글로벌로 사용할 수 있도록 지원 main.js에 공통 컴포넌트 정의 및 필요한 페이지에 정의한 컴포넌트 사용
    - import PageTitle from './components/fragments/PageTitle.vue' 추가
    - const app = createApp(App) 추가(추가되는 것들이 많아 정의 및 필요한 옵션을 각각 추가)
      app.use(store)
      app.use(router)
      app.mount('#app')
    - 전역 컴포넌트 설정 app.component('실제로 사용햘 컴포넌트명 'page-title'', 가져온 컴포넌트 PageTitle)
    - PageView.vue 이전에 가져왔던 경로 삭제
*/
</script>
