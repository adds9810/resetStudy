<template>
  <div>
    <div id="naverIdLogin">
      <a id="naverIdLogin_loginButton" href="#" role="button"
        ><img src="https://static.nid.naver.com/oauth/big_g.PNG" width="320"
      /></a>
    </div>
    <button class="btn btn-danger" @click="naverLogout($event)">
      로그아웃
    </button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      email: '',
      naverLogin: null
    }
  },
  setup() {},
  created() {},
  mounted() {
    this.naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'WA4DtYzZKWZxWJMcfAW3',
      callbackUrl: 'http://localhost:8080/login/naver',
      isPopup: true, // 팝업 형태여부
      loginButton: { color: 'green', type: 3, height: 60 } // 로그인 버튼 디자인 설정
    })
    /* (4) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
    this.naverLogin.init()

    /* (4-1) 임의의 링크를 설정해줄 필요가 있는 경우 */
    // $("#gnbLogin").attr("href", naverLogin.generateAuthorizeUrl());

    /* (5) 현재 로그인 상태를 확인 */
    this.naverLogin.getLoginStatus((status) => {
      // 화살표 함수 안의 this vue내의 this와 동일 function(){}로 사용하면 this가 윈도우 객체가 됨. 구분해사 사용하자
      if (status) {
        /* (6) 로그인 상태가 "true" 인 경우 로그인 버튼을 없애고 사용자 정보를 출력합니다. */
        // setLoginStatus();
        // 이메일, 닉네임, 성멸 가져와 확인
        console.log(this.naverLogin.user.getEmail())
        console.log(this.naverLogin.user.getNickName())
        console.log(this.naverLogin.user.getGender())
        this.email = this.naverLogin.user.getEmail()
      }
    })
  },
  unmounted() {},
  methods: {
    naverLogout(event) {
      event.preventDefault()
      this.naverLogin.logout() // 네이버 로그인 로그아웃
    }
  }
}
/* 21. Vue.js 네이버로그인 : 카카오 로그인과 유사
  1. 네이버 로그인(개발자 센터) https://developers.naver.com/products/login/api/api.md로 접속 후 로그인
  2. https://developers.naver.com/apps/#/register?api=nvlogin
    - 애플리케이션 이름 등록
    - 사용 api '네이버 로그인 선택', 필요에 맞는 제공정보 선택(이름, 이메일, 별명, 성별 선택)
    - 서비스 환경 pc웹 url 입력(localhost)
    - Callback URL : 카카오톡 Redirect URI과 유사, 로그인 후 유저 정보를 전달받을 페이지 주소 입력(추가 페이지가 필요하면 +클릭)
  3. Client ID, Client Secret를 개발때 사용
    - 네이버 로그인 - 개발상태 개발중 옆의 검수 요청 버튼을 누르면 검수가 진행됨, 검수가 완료된 사이트면 사용할 수 있는 네이버 기능이 많아진다.
    - API 설정 : 로그인 등록시 설정 내용 수정가능 로고 등록가능
    - 정보제공동의창 미리보기 : 어째선지 등록 완료된 다음에 클릭하면 확인가능
    - 네이버 로그인 검수상태 - 검수 진행시 확인가능한 기능, 검시 요청전에 해야할 것들이 많다.
    - 멤버관리 : 관리자 id, 테스터 id 등록가능, 관리자 계정에 추가한 id는 테스터 id로 따로 등록 안해도됨, 애플리케이션 등록자는 관리자에 따로 등록 안해도 된다.
  4. https://developers.naver.com/products/login/userguide/userguide.md 적용가이드
     로그인 적용 디자인 가이드 등이 있음 확인하고 따라야 한다.
  5. Documents > 네이버 로그인
    - 개발 가이드 : https://developers.naver.com/docs/login/devguide/devguide.md 개발, 로그인 버튼 디자인 가이드를 명시
    - SDK 다운로드 : https://developers.naver.com/docs/login/sdks/sdks.md 사용 언어에 맞게 다운로드 하자(수업은 4번 사용)
    - 네이버 로그인 API 명세 : https://developers.naver.com/docs/login/api/api.md#%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%A1%9C%EA%B7%B8%EC%9D%B8-api-%EB%AA%85%EC%84%B8
      - 적용예제가 있음, 뷰는 순수 바닐라 자바스크립트 파일 예제를 사용해야함.
  6. SDK 소스 가져와 public > index.html head에 복사 붙여넣기
  7. 샘플예제 https://static.nid.naver.com/oauth/sample/javascript_sample.html
    - data()에 가져올 유저 정보 변수 선언
    - 샘플예제 중 필요한 부분만 복사해 해당 페이지 mounted에 적용 및 수정
    - clientId, callbackUrl 정보 맞게 입력
  8. 로그아웃 버튼 만들기
    8-1. 로그아웃 버튼 만들기 및 함수구현, method 이벤트 등록

  ** 카카오보다 자바스크립트로 구현하는 방법 설명이 불친절함, 로그인 외의 구현 방법은 비슷하다.
*/
</script>
