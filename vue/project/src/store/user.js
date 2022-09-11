import VueCookies from 'vue-cookies'

export const user = {
  // 중앙 데이터 저장소
  namespaced: true,
  state() {
    return {
      userInfo: {
        name: '',
        email: '',
        phone: '',
        lang: ''
      }
    }
  },
  // Store를 위한 computed라고 생각하면 됨.
  getters: {
    isLogin(state) {
      if (VueCookies.get('userInfo')) {
        // 데이터가 저장되어 있으면, 네이버로그인 카카오 로그인 구분해서 확인하고 회원관련 정보를 제공할 수 있도록 해야한다.
        return true
      } else {
        return false
      }
    },
    isKakaoLogin() {
      if (window.Kakao.Auth.getAccessToken()) {
        return true
      } else {
        return false
      }
    }
  },
  // 상태(state)를 변경시킬 수 있는 유일한 방법(함수)
  mutations: {
    setUserInfo(state, userInfo) {
      // 유저정보를 오브젝트로 받는다
      console.log(userInfo)
      state.userInfo = userInfo
      VueCookies.set('userInfo', userInfo, '30s') // key: value(전달받은 오브젝트), 유지시간(공식문서에 시간 설정방법이 있음)
    },
    clearUserInfo(state) {
      // 유저정보를 초기화한다.
      state.userInfo = {}
      VueCookies.remove('userInfo') // vue-cookies에 저장된 데이터를 초기화한다.
    },
    getUserInfo(state) {
      if (VueCookies.get('userInfo')) {
        return state.userInfo
      } else {
        return {}
      }
    }
  },
  actions: {}
}
/* 18-6
    - vuex-persistedstate설치 : 새로고침해도 데이터가 날아가지 않도록 함. 영구적으로 저장할 데이터에 사용
        - npm install vuex-persistedstate --legacy-peer-deps
        - store/index.js에 vuex-persistedstate 임포트 plugins 연결 : 지정한 데이터가 오브젝트로 로컬스토리지에 저장된걸 확인할 수 있음
    - vue-cookie : 지정한 데이터가 설정한 시간동안만 유지되도록 하는 플러그인
        - 유저데이터의 경우 로컬스토리지에 남으면 로그아웃 에도 데이터가 남아 문제가 될 수 있음 쿠키에 저장될 수 있도록 해야함
        - npm install vue-cookies --save

 */
