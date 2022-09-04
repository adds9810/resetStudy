<template>
  <div>
    <provide-inject />
  </div>
</template>
<script>
import ProvideInject from '@/components/fragments/ProvideInject.vue'
export default {
  components: { ProvideInject },
  provide() {
    return {
      size: 5,
      str: this.sampleData
    }
  },
  data() {
    return {
      sampleData: 'AAA'
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
/*
provide & inject
부모와 자식의 자식간의 데이터 전달이 필요할 때 사용할 수 있는 기능
아무리 깊이 들어가도 inject 이로 데이터를 전달받고 부모에서는 provide 전달할 수 있음

1. 폴더 및 파일 생성
@/components/fragments/ProvideInject.vue
@/view/5_advanced/ProvideView.vue
2. ProvideView.vue에 ProvideInject.vue연결
3. ProvideInject안에 정의했던 sampleData를 provide에 불러와 연결
4. ProvideInject페이지는 부모인 ProvideView.vue에서 가져올 것을 inject: ['size', 'str'], 정의 및 사용

부모와 자식의 자식은 한번에 데이터를 전달받을 수 있지만 부모의 자식은 데이터를 받지않는 경우가 있어, 데이터가 어디서 오는지 추적하기 쉽지 않음
props와 provide & inject를 선택적으로 잘 사용해야함
 */
</script>
