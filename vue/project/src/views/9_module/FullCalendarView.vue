<template>
  <FullCalendar :options="calendarOptions" />
</template>
<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
export default {
  components: { FullCalendar },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        events: [
          { title: 'event 1', date: '2022-05-28' },
          {
            title: 'event 2',
            start: '2022-06-02T10:30:00',
            end: '2022-06-04T11:30:00'
          }
        ],
        headerToolbar: {
          left: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          right: 'prevYear,prev,next,nextYear'
        }
      }
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    handleDateClick(arg) {
      console.log(arg)
    }
  }
}
/* 25.Vue.js FullCalendar - 모듈 설치해서 사용
   - 일정관리에 많이 사용되는 모듈
   - 날자표기, 이벤트 받아옴, 월,주,일간 구분해 확인가능
   - 사용 방법
    1. 설치 : fullcalendar 검색  -> https://fullcalendar.io/ 접속 -> 사용환경 선택(vue, react, 앵귤러, js 지원) -> 터미널 설치(버전에 맞는 선치 선택)) npm install --save @fullcalendar/vue3 @fullcalendar/core
    - 필요한 페이지에 컴포넌트로 불러와 모듈로 등록 후 사용
    2. 예시 페이지에서 소스 터미널 설치 후 불러와 임포트
        import '@fullcalendar/core/vdom' // solves problem with Vite
        import FullCalendar from '@fullcalendar/vue3' // npm install --save @fullcalendar/vue3(버전에 맞게 사용해야 함. 현재 3버전 사용중이라 끝에 3이 붙음)
        import dayGridPlugin from '@fullcalendar/daygrid' // npm install --save @fullcalendar/daygrid
        import timeGridPlugin from '@fullcalendar/timegrid' // npm install --save fullcalendar/timegrid
        import interactionPlugin from '@fullcalendar/interaction' // npm install --save @fullcalendar/interaction
    3. 컴포넌트 등록 및 추가 components: { FullCalendar }, <FullCalendar :options="calendarOptions" />
    4. plugins 임포트한 사용할 기능들을 추가
    5. initialView 사용할 옵션을 플러그인에서 가져와 연결하면 그에 맞게 화면이 바뀜
  - 이벤트 등록
    1. 예시 페이지에서 event 배열 부분을 data()로 가져와 필요에 따라 일정 추가 및 수정, start, end로 시작일 종료일 시간까지 설정가능(필요하면 이벤트 도큐먼트에서 확인해보자)
    2. dateClick : 날짜 클릭하면 이벤트 실행, arg 피라미터로 날짜 관련 정보를 받을 수 있음(등록된 이벤트도 확인가능? 나중에 다시 확인해보자), 이벤트를 등록해서 모달 팝업, 일정등록 등의 화면을 구현할 수 있음
  - Demos : 지원하는 기능확인가능
  - Docs : 지원기능 확인 가능
  - headerToolbar : 'dayGridMonth'모드에서 사용가능 상단에 headerToolbar가 추가됨, 좌, 우 가운데 옵션 설정할 수 있음
  - 뷰 예시는 많지 않음 바닐라 자바스크립트에 있는 예시를 보고 뷰 환경에 맞게 사용해야 한다.

  ** 실무에서 많이 사용, 직접 구현하기에는 어려움, 뷰 예시는 많지 않지만 js에서 찾아보고 수정가능, 문서 읽고 참고하면 어렵지 않음

  9_모듈은 실무에서 많이 사용하는 모듈을 설치하고 사용하는 방법임
 */
</script>
