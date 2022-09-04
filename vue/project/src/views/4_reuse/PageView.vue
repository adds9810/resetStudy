<template>
  <div class="container">
    <page-title title="고객목록" />
    <h3 style="border-left: 5px solid red; padding-left: 3px; text-align: left">
      고객목록
    </h3>
    <button class="btn btn-danger">클릭</button>
  </div>
</template>
<script>
// 9-1강. @ : src, PageTitle을 등록했으나 사용하지 않으면 오류가 남
// import PageTitle from '@/components/fragments/PageTitle.vue'
// import PageTitle from '@/'
export default {
  // components: { PageTitle },
  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
