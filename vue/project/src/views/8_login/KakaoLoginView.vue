<template>
  <div>
    <a id="custom-login-btn" @click="kakaoLogin">
      <img
        src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="222"
        alt="카카오 로그인 버튼"
      />
    </a>
    <button class="btn btn-danger" @click="kakaoLogout">카카오 로그아웃</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email, gender', // 내가 받아올 정보에 대한 범위, 여기에서는 닉네임, 이메일, 성별 해당
        success: this.getKakaoAccount,
        // 성공시 계정 관련 배열 중 refresh_token 은 중요(이걸로 동의하고 사용한지 여부 확인)
        fail: function (err) {
          alert(JSON.stringify(err))
        }
      })
    },
    getKakaoAccount(authObj) {
      console.log(authObj)
      window.Kakao.API.request({
        // 사용자 정보 받아오기
        url: '/v2/user/me',
        success: (res) => {
          const kakaoAccount = res.kakao_account // 카카오 계정 변수화
          console.log('kakaoAccount', kakaoAccount)
          // 동의항목의 닉네임, 이메일, 성별 가져오기
          const nickname = kakaoAccount.profile.nickname
          const email = kakaoAccount.email
          const gender = kakaoAccount.gender

          console.log('nickname', nickname)
          console.log('email', email)
          console.log('gender', gender)

          // store 유저 정보 입력하기 예제
          //   this.$store.commit('user/setUserInfo', {
          //       nickname: nickname,
          //       email: email,
          //       gender: gender
          //   })

          // 로그인하면 메인으로 이동되게
          this.$router.push({ path: '/login/main' })
        }
      })
    },
    kakaoLogout() {
      if (!window.Kakao.Auth.getAccessToken()) {
        // 로그인을 하지 않았거나 시간이 만료되어 정보가 없을 경우
        console.log('로그인 하지 않았습니다.')
        return
      }

      window.Kakao.Auth.logout((res) => {
        // 로그아웃
        console.log('access token', window.Kakao.Auth.getAccessToken())
        console.log('logout', res)
      })
    }
  }
}
/* 20. Vue.js 카카오로그인
  - 개인정보를 받지 않고 카카오 혹은 네이버 등으로 로그인을 받는 경우가 많음

  ** 카카오 로그인
  - 카카오 개발자 센터에서 키를 발급받아야 함 https://developers.kakao.com/
  - 내 애플리케이션에 계정(?) 생성
      - 네이티브 앱 키 : 안드로이드 폰이나 아이폰에서 사용할 경우
      - REST API 키 : 서버에서 주고받을 경우
      - JavaScript : 뷰, 리액트 등을 사용할때
  - 플랫폼 > 웹 플랫폼 등록, 로그인을 사용할 경우 하단의 등록하러 가기(혹은 카카오 로그인 메뉴) 클릭, 활성화
  - 사용자의 정보를 받을 수 있는 Redirect URI에 url을 입력하기 위해 vue페이지 생성 및 입력(vue route에 등록한 url을 입력하면 된다.)
  - 카카오 로그인 > 동의항목 : 카카오 로그인시 사용자에게 받을 정보, 그 정보의 동의단계 선택 및 동의목적 작성(작성한대로 로그인시 동의 화면에 나옴)
    - ID : 정보를 받을 때 가져올 동의항목 범위
    - 이메일, 성별 수집동의 필수선택 : 출시한 사이트만 카카오측의 서류제출 및 검수를 통해 사용가능, 테스트 시에는 선택동의로, 사용자에게 값이 없는 경우 카카오 계정 정보 입력을 요청하여 수집 선택
  - https://developers.kakao.com/docs/latest/ko/kakaologin/js
    - 자바스크립트 버전 로그인 사용방법 문서
    - JS SDK 데모를 클릭하면 버튼 및 로그인시 화면을 볼 수 있다.

  1. https://developers.kakao.com/docs/latest/ko/getting-started/sdk-js#supported-browser
    JavaScript SDK 에서 소스 가져와 public > index.html head에 복사 붙여넣기
  2. src > main.js 에 발급받은 키 등록 Kakao.init('JAVASCRIPT_KEY');
  3. 사용할 페이지에 구현방법에 맞는 소스를 선택해 복사 붙여넣기
    - href="javascript:loginWithKakao()" 해당하는 부분을 @click으로 변경 및 method에 추가
    - vue에서 객체에 접근할 때는 window.객체명 으로 접근
    - 사용자 정보 가져오기 카카오 로그인 > javascript(https://developers.kakao.com/docs/latest/ko/kakaologin/js#req-user-info) 문서에 있음 .request()로 요청해 가져오기
    - 로그인 후 로그아웃을 하지 않으면 refresh_tokeen_expires_in의 정보가 갱신이 됨
    - 카카오 정책상 동의하면 1년 동안 동의한 사이트 별도 동의없이 사용가능

  ** 로그인 여부를 확인하고 관련 서비스를 제공할 수 있도록 하면 좋음
    - 스토어 유저정보 관련 js페이지 sns로그인 계정에 따라 로그인 여부 확인
    - 믹스인으로 로그인 체크관련 함수 구현해 사용(특정페이지에서 실행될 수 있도록 해야한다.)
    - 로그인 관련 페이지에 로그인 여부 확인하는 함수 구현 등...
 */
</script>
