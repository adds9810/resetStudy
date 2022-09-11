/* eslint-disable */
// eslint 규칙 무시

export default {
  install: (app, options) => {
    // app - 플러그인, options 언어 옵션
    app.config.globalProperties.$translate = (key, params = {}) =>
      // en.hi => ['en','hi']
      // globbalProperites -  전역으로 사용할 글로벌 프로퍼티
      // $translate - 함수임을 의미
      // install을 통해 $translate 함수를 globbalProperites로 등록하는 과정
      key
        .split('.')
        .reduce((o, i) => {
          if (o) return o[i]
        }, options)
        .replace(/{\w+}/g, (match) => params[match.slice(1, -1)])
    // 두번째 params 오브젝트 안의 값이 {} 안에 매치되는 데이터가 있다면 그 값으로 입력될 수 있도록
  }
} // 플로그인 설치 함수
