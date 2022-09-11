<template>
  <div class="row">
    <div class="col-lg-3 col-md-5">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="우편번호"
          aria-label="우편번호"
          aria-describedby="postcode"
          v-model="zonecode"
          readonly
        />
        <button
          class="btn btn-outline-secondary"
          id="postcode"
          @click="openPostcode"
        >
          검색
        </button>
      </div>
    </div>
    <div class="col-12">
      <input
        type="text"
        class="form-control"
        v-model="roadAddress"
        placeholder="주소"
        readonly
      />
      <input
        type="text"
        class="form-control"
        v-model="detailAddress"
        placeholder="상세주소"
      />
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      zonecode: '',
      roadAddress: '',
      detailAddress: ''
    }
  },
  setup() {},
  created() {
    if (!window.daum) {
      this.loadScript()
    }
  },
  mounted() {},
  unmounted() {},
  methods: {
    loadScript() {
      const script = document.createElement('script') // 스크립트 태그 생성
      script.src =
        '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
      document.head.appendChild(script)
    },
    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
          // 예제를 참고하여 다양한 활용법을 확인해 보세요.
          console.log(data)
          this.zonecode = data.zonecode
          this.roadAddress = data.roadAddress
        }
      }).open()
    }
  }
}
/* 22.Vue.js Daum 우편번호 API : 회원가입, 배송정보 입력 시 주소 찾기에 많이 사용
  - 가이드 사이트에 가면 예시를 확인할 수 있다  : https://postcode.map.daum.net/guide
  - 사용하기 위한 소스 받아오기 방법 2가지
    1. SDK 소스 가져와 public > index.html head에 복사 붙여넣기
    2.created 단계에서 daum객체가 없을 경우, 스크립트 태그 생성 및 head에 추가하는 loadScript() 항수 실행

  * Daum 우편번호 API 삽입하기
  1. SDK 소스 가져오기
  2. 부트스트랩을 활용해 입력창 만들기, 읽기만 가능하도록 input에 readonly 설정, v-model로 전달받은 정보를 전달받을 수 있도록 함
  4. data에 우편번호, 주소, 상세주소를 받을 변수 선언
  3. 버튼 클릭시 우편번호 api가 실행되도록 구현
  4. 주소 선택시 입력창에 입력되도록 oncomplete 안에 코드 구현
  5. data에 유저가 선택한 정보가 담김, 우편번호와 도로명 주소 찾아서 입력창에 추가될 수 있도록 구현
    - data에 일반적으로 사용하는 주소뿐 아니라, 시, 시군구, 영문주소 등 상세 정보를 제공함 필요헤 따라 사용할 수 있음
    - 통계를 낼 수 있도록 시군구, 로드네임코드로 분리해 저장해 두면 좋음, 시군수 코드를 저장해두면 영문주소와 국문주소가 일치하는지 여부를 확인할 수 있음
*/
</script>
