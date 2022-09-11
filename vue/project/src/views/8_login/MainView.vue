<template>
  <div>
    {{ isLogin }}
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
  computed: {
    isLogin() {
      return this.$store.getters['user/isKakaoLogin'] // store/user.js안에 카카오 로그인 여부 확인할 수 있는 함수 구현 및 접속하면 확인하게끔 수정
    }
  },
  setup() {},
  created() {
    // 토큰으로 로그인 여부를 확인해고 로그인을 안했으면 로그인 페이지로 이동되게 수정
    // if (!window.Kakao.Auth.getAccessToken()) {
    //   this.$router.push({ path: '/login/kakao' })
    // }
  },
  mounted() {
    // 카카오 로그인 후 이동되어 왔을때 유저 정보가 있는지 확인, 토큰이 있으면 관련 정보를 제공해 주면 된다.
    console.log('access token', window.Kakao.Auth.getAccessToken())
  },
  unmounted() {},
  methods: {}
}
</script>
