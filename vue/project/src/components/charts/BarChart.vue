<template>
  <apexchart
    type="bar"
    :width="width"
    :height="height"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>
<script>
export default {
  components: {},
  props: {
    // 부모에게 받아올거
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    title: {
      type: String,
      default: ''
    },
    legendPosition: {
      type: String,
      default: 'bottom'
    },
    series: {
      type: Array, // 배열로 받아와야 함
      default: function () {
        return []
      }
    },
    categories: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      chartOptions: {
        // 이 컴포넌트 불러올 때 설정헤 사용할거
        plotOptions: {
          bar: {
            // borderRadius: 4,
            horizontal: true,
            dataLabels: {
              position: 'top'
            }
          }
        },
        // stroke: { svn으로 만들어짐, 선 옵션
        //   width: 1,
        //   colors: ['#000000']
        // },
        xaxis: {
          categories: []
        },
        legend: {
          show: true,
          position: this.legendPosition
        },
        title: {
          text: this.title
        }
      }
    }
  },
  setup() {},
  created() {},
  mounted() {
    this.chartOptions.xaxis.categories = this.categories
    // categories 받아올 카테고리를 여기에 mounted에 넣어야함
  },
  unmounted() {},
  methods: {}
}
/* 29-4. Vue Charts - BarChart
  - 컴포넌트화하기 : components/charts 생성 후 컴포넌트 만들기
  - https://apexcharts.com/vue-chart-demos/bar-charts/
  - 예시를 참고해 바 만들기
  - 개발자에게 받아와야 할 부분, 유연성이 필요한 부분은 props, data추가 후 태그로 v-bind로 추가, legendPosition, title은 옵션에서 찾아옴
  - categories 받아올 카테고리를 여기에 mounted에 넣어야함, 데이터를 받아서 적용하는 부분은 바로 적용이 되자만 카테고리는 bind처리 되어서 제대로 전달 안될 수 있음
  - 필요에 따라 추가하면 좋다.

*/
</script>
