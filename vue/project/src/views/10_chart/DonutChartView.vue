<template>
  <div>
    <apexchart
      width="380"
      type="donut"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      options: {
        labels: ['자바', '파이썬', '자바스크립트', 'Node.js', 'DB'], // 옵션에서 레이블 추가가능
        legend: {
          show: false
        },
        dataLabels: {
          // 툴팁 추가
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
          }
        }
      },
      series: [44, 55, 41, 17, 15]
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
/* 29-3.Vue Charts - DonutChartView
  - 원형으로 데이터를 추가하면 전체 100%에서 차지하는 비율이 표시됨
  - 커스터마이징 필요시 옵션에 추가해서 본다

  ** 기본예시에서 더 발전할수 있는 방향을 생각해보자 자주사용하는 옵션에 대해?

  ** https://apexcharts.com/vue-chart-demos/ 데모 보고 필요한대로 커스터마이징 가능, 외울 가치는 없어서 필요할때 찾아보고 자주쓰는건 컴포넌트로 만들어 저장해두자
*/
</script>
