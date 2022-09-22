<template>
  <div>
    <column-chart
      height="400px"
      :series="bar.series"
      :categories="bar.categories"
      title="Column 차트 타이틀"
      legendPosition="bottom"
    />
  </div>
</template>
<script>
import ColumnChart from '@/components/charts/ColumnChart.vue'
export default {
  components: {
    'column-chart': ColumnChart
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

/* 29-6. Vue Charts - ColumnChart. ColumnChartView
  - ColumnChart. ColumnChartView에 바차트 컴포넌트와 뷰페이지의 소스 가져와 복붙
  - 필요에 맞게 옵션만 수정

  ** 예제를 참고해 실무에서 필요한 카트를 연습해보고 미리 컴포넌트로 만들어두고 실무에서 활용하자 - line, area, column, bar, mixed(Line & Column Chart, Multiple Y-Axis Chart), pie / 그 외의 차트는 특수한 경오에만 사용

*/
</script>
