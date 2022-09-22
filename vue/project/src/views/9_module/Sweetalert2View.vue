<template>
  <button @click="showAlert">Hello world</button>
</template>

<script>
export default {
  methods: {
    showAlert() {
      // Use sweetalert2

      // $swal의 $ - 전역에 사용하는 기능임을 구분하기 위해 표시
      // 기본예제 this.$swal('Any fool can use a computer')
      // info option this.$swal('The Internet?', 'That thing is still around?', 'info')

      // 실무에서 많이 사용하는 예제 옵션 - confirm
      this.$swal({
        title: '정말 삭제하시겠습니까?',
        text: '삭제된 데이터는 복구할 수 없습니다!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6', // 미설정시 기본값
        cancelButtonColor: '#d33', // 미설정시 기본값
        confirmButtonText: '네, 삭제하겠습니다!',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          // yes로 선택했을 경우 기능구현, 삭제 로직 구현
          this.$swal(
            '삭제되었습니다!',
            '선택한 데이터가 정상적으로 삭제되었습니다.',
            'success'
          )
        }
      })
    }
  }
}
/* 26.Vue.js Sweetalert2 - 대표적인 오픈소스 라이브러리(https://www.npmjs.com/package/vue-sweetalert2)
  - 설치 npm install -S vue-sweetalert2
  - npm 공식문서를 확인해 main.js에 버전에 맞는 소스 임포트 import VueSweetalert2 from 'vue-sweetalert2';import 'sweetalert2/dist/sweetalert2.min.css'; app.use(VueSweetalert2);
    (alert, confirm 등 공통으로 사용하는 팝업이라 main.js에 연결 후 사용하면 좋음)
  - npm 공식문서의 기본예제 구현으로 테스트
  - 공식문서(https://sweetalert2.github.io/)의 예시와 옵션을 참고해 원하는 옵션을 가져와 사용가능(바닐라js로 되어 실행구문(this.$swal)은 다르지만 옵션은 가져다 사용할 수 있음)
*/
</script>
