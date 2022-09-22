<template>
  <div>
    <apexchart
      width="100%"
      height="400px"
      type="bar"
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
        // 색 등 옵션 추가 가능
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        // 데이터 추가 가능
        {
          // 필요한 만큼 옵셪 추가
          name: '매출',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        },
        {
          name: '매입',
          data: [20, 30, 35, 40, 39, 50, 70, 91]
        }
      ]
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
/* 29-1.Vue Charts - 차트 라이브러리, 프레임 워크 모두 지원, 사용빈도가 많음
  https://apexcharts.com/docs/vue-charts/

  3버전 설치
  npm install --save apexcharts
  npm install --save vue3-apexcharts

  각각 혹은 main.js에 임포트
  데모를 보면 많은 예시가 있음
  비슷한 모양에서 많이 사용되기째문에 컴포넌트로 만든 후 연결

  Props 의 정보를 읽고 필요에 맞는 옵션을 사용하자

  * 예시의 차트 모두 사용
  bar차트 만들기 - 예시를 참고해 만들기, 이미 임포트에 잇는건 지우고 사용()
*/
</script>
