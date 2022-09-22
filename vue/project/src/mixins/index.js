import axios from 'axios'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

/* 31-2 추가 부분 */
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers['Access-Control-Allow-Origin'] = '*' // node.js를 고려한 설정, cors(https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)를 위한 설정, 서버와 클라이언트 주소가 다를 경우 cors위해 몇가지 설정이 필요함, 그 중 하나

export default {
  methods: {
    // get
    async $get(url) {
      return (
        await axios.get(url).catch((e) => {
          console.log(e)
        })
      ).data
    },
    // post
    async $post(url, data) {
      return await axios.post(url, data).catch((e) => {
        console.log(e)
      })
    }
  },
  // put
  async $put(url, data) {
    return await axios.put(url, data).catch((e) => {
      console.log(e)
    })
  },
  // delelete
  async $delelete(url, data) {
    return await axios.delelete(url).catch((e) => {
      console.log(e)
    })
  },
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
  },
  // 숫자 표기 포맷팅 방식 - 실무에서 많이 사용
  // #,###
  // #,###.## - 3400.1 => 3,400.1
  // #,###.#0 - 3400.1 => 3,400.10
  // #.###,##
  // $#,###.## - 3400.1 => $3,400.1
  // #,###원 - 3400 => 3,400원
  $convertNumberFormat(amount, format) {
    let currencySymbol = ''
    let lastSymbol = ''

    if (format.substr(0, 1) !== '#') {
      // 숫자의 시작이 숫자가 아닌 경우 $~
      currencySymbol = format.substr(0, 1)
    }

    if (format.slice(-1) !== '#' && format.slice(-1) !== '0') {
      // 문자의 끝이 숫자가 아닌 경우 ~월
      lastSymbol = format.slice(-1)
      // '#,###.#0%'
      format = format.substring(0, format.length - 1)
    }

    let groupingSeparator = '' // 숫자 3자리마다 구분자 기호
    let decimalSeparator = '' // 소수점 구분자 기호
    let maxFractionDigits = 0 // 소수점 몇자리까지 표기할건지

    if (format.indexOf('.') === -1) {
      // #,###
      groupingSeparator = ','
    } else if (format.indexOf(',') === -1) {
      groupingSeparator = '.'
    } else if (format.indexOf(',') < format.indexOf('.')) {
      // #,###.##
      groupingSeparator = ','
      decimalSeparator = '.'
      maxFractionDigits = format.length - format.indexOf('.') - 1
    } else {
      // #.###,##
      groupingSeparator = '.'
      decimalSeparator = ','
      maxFractionDigits = format.length - format.indexOf(',') - 1
    }

    let sign = '' // amount가 음수일 때
    let dec = 1
    for (let i = 0; i < maxFractionDigits; i++) {
      // i=0, dec = 10
      // i=1, dec = 100
      dec = dec * 10 // 소수점 이하를 없애버리고자 사용
    }

    // amount = -3500.2345
    // format = #,###.#0
    // -3500.2345 * 100 = -350023.45
    // Math.round() = -350023
    // -350023 / 100 = -3500.23

    // amount = -3500.2375
    // format = #,###.#0
    // -3500.2375 * 100 = -350023.75
    // Math.round() = -350024
    // -350024 / 100 = -3500.24

    let v = String(Math.round(parseFloat(amount) * dec) / dec)

    if (v.startsWith('-')) {
      sign = '-'
      v = v.substring(1)
    }

    // 정수든, 부동소수점이든 상관없이 무조건 소수점이하 자리수 맞춰주는 곳
    if (maxFractionDigits > 0 && format.slice(-1) === '0') {
      v = parseFloat(v).toFixed(maxFractionDigits)
    }

    let d = '' // 소수점이하만
    if (maxFractionDigits > 0 && v.indexOf('.') > -1) {
      d = v.substring(v.indexOf('.')) // .24
      // format = #.###,##
      // #,###.##
      d = d.replace('.', decimalSeparator) // .24 => ,24
      v = v.substring(0, v.indexOf('.')) // 3500
    }

    // 3500 => 3,500
    // 8,281,300 =>

    const regexp = /(\d+)(\d{3})/

    // v = 3524500
    while (regexp.test(v)) {
      // $1 = 3524
      // $2 = 500
      // 3524,500

      // $1 = 3
      // $2 = 524
      // 3,524,500
      v = v.replace(regexp, '$1' + groupingSeparator + '$2') // $1와 $2가 자동으로 치환됨
    }

    return sign + currencySymbol + v + d + lastSymbol
  },
  async $excelFromTable(
    header = [],
    rows = [],
    fileName = 'excel',
    option = {}
  ) {
    /* eslint-disable */
    header = header.filter((h) => h.title && h.key)

    const wb = new ExcelJS.Workbook()
    const ws = wb.addWorksheet()
    ws.addTable({
      name: 'myTable',
      ref: 'A1',
      headerRow: true,
      columns: header.map((h) => ({
        name: h.title
      })),
      rows: rows.map((r) => header.map((h) => r[h.key])),
      ...option
    })

    saveAs(new Blob([await wb.xlsx.writeBuffer()]), `${fileName}.xlsx`)
  },
  async $excelFromTable(
    // 기본 변수 선업
    header = [],
    rows = [],
    fileName = 'excel',
    option = {}
  ) {
    /* eslint-disable */
    header = header.filter((h) => h.title && h.key)

    const wb = new ExcelJS.Workbook() // 워크북 약자, 워크북 생성
    const ws = wb.addWorksheet() // 워크시크 추가
    ws.addTable({
      // 첫번째 워크시트에 테이블추가
      name: 'myTable', // 워크시트 이름
      ref: 'A1', // 테이블 시작점
      headerRow: true, // 헤더 있는지?
      columns: header.map((h) => ({
        // 헤더이름 추가
        name: h.title
      })),
      rows: rows.map((r) => header.map((h) => r[h.key])), // 데이터 개수만큼 받아서 열로 도출
      ...option
    })

    saveAs(new Blob([await wb.xlsx.writeBuffer()]), `${fileName}.xlsx`) // 파일세이버 엑셀로 저장해줌 / writeBuffer 내장함수, 확장자명
  }
}
