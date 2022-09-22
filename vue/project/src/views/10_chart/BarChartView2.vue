<template>
  <div>
    <bar-chart
      height="400px"
      :series="bar.series"
      :categories="bar.categories"
      title="Bar차트 타이틀"
      legendPosition="right"
    />
  </div>
</template>
<script>
import BarChart from '@/components/charts/BarChart.vue'
export default {
  components: {
    'bar-chart': BarChart
  },
  data() {
    return {
      bar: {
        series: [
          {
            name: '매출',
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          },
          {
            name: '매입',
            data: [20, 30, 35, 40, 39, 50, 70, 91]
          }
        ],
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
/* 29-5. Vue Charts - BarChartView2
  - 페이지 생성 후 컴포넌트 불러오기
  - 컴포넌트에 전달할 데이터 등록
  - 가변성이 있는 것들은 변경 가능하도록 만들어두고 데이터만 받아서 작업할 수 있도록 만들어 두면 좋음, 편함
*/
</script>
