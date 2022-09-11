<template>
  <div>
    <h1>
      {{ $translate(`${userInfo.lang}.welcome1`) }} {{ userInfo.name
      }}{{ $translate(`${userInfo.lang}.welcome2`) }}
    </h1>
    <h1>
      {{ $translate(`${userInfo.lang}.welcome`, userInfo) }}
    </h1>
    <h1>
      {{ $translate(`${userInfo.lang}.welcome3`, userInfo) }}
    </h1>
    <h1>{{ $translate(`${userInfo.lang}.hi`) }}</h1>
    <!-- <h1>{{ $translate('ko.hi') }}</h1> -->
    <!-- <button>{{ $translate('ko.search') }}</button> -->
    <button>{{ $translate(`${userInfo.lang}.search`) }}</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      // 사용자의 언어가 정보로 확인가능함(아래는 가정)
      userInfo: {
        name: 'John Doe',
        email: 'john@gmail.com',
        lang: 'ko'
      }
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
<!--
  17강 플러그인 : 재사용컴포넌트, 커스텀디렉티브, 믹스인 만큼 잘 만들어두면 웹애플리케이션 제작에 용이한 기능
  - 여러 컴포넌트에서 사용하는 공통 기능에 해당하는 함수를 마치 플러그인을 설치하는 것처럼 사용할 수 있게끔 제공을 함
  - 플러그인 만드는 방식도 뷰에서 제공하고 있음
  - 대표적인 플러그인 예시 : 다국어 처리
    - i18n 폴더(뷰 외의 다른 개발 언어에서도 다국어 처리 관련 라이프러리를 이런 이름으로 폴더를 둠)
      - 접속한 나라에 맞게 다국어해서 보여줄 수 있게 하는 것
      - 각 국가별 언어코드 2자리를 따서 파일명으로 지정, en, ko, cn, jp...
      - 접속한 나라의 언어에 맞게 지정하면 보이게끔 작성
    - src/plugins - 플러그인 파일 모음
      - src/plugins/i18n.js 다국어 처리 관련 js 파일 및 코드 작성
    - pluginView.vue 파일생성
  ** 다국어 사이트는 하드코딩이 아닌 지원하는 언어를 js파일로 언어별로 문구를 작성하고, 사용자 정보의 언어를 확인해 지원할 수 있도록 함. 가독성은 떨어질 수 있음

  ** 사용자의(혹은 서버로 만든 데이터를) 데이터를 포함한 문구를 출력해야 하는 경우
  ** 플러그인, 재사용컴포넌트, 커스텀디렉티브, 믹스인을 사용해 뷰 자산을 만들어 빠르고 안정적인 뷰 웹 사이트를 만들자!
-->
