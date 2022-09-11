export default {
  created() {
    console.log('formatter의 created')
  },
  mounted() {
    console.log('formatter의 mounted')
    // 서버 데이터베이스 현재 시간, 분,초, 사용자 아이디, 현재 라우터 패스확인하는 방법
    console.log(this.$route.path)
  },
  methods: {
    // 날짜를 원하는 포맷으로 만들기
    $convertDateFormat(d, f) {
      let year = ''
      let month = ''
      let day = ''
      // '20220601', Date()로 오는지 확인을 해야함
      if (typeof d === 'string' && d.length === 8) {
        year = d.substr(0, 4)
        month = d.substr(4, 2)
        day = d.substr(6, 2)
      } else if (typeof d === 'object') {
        year = d.getFullYear()
        month = (d.getMonth() + 1).toString().padStart(2, 0)
        day = (d.getDate() + 1).toString().padStart(2, 0)
      }

      // f - 'YYYY-MM-DD' 'MM-DD-YYYY'로 들어올 것을 고려한 구현
      return f.replace('YYYY', year).replace('MM', month).replace('DD', day)
    }
  }
}
