<template>
  <div class="mt-3">
    <div class="row mb-3">
      <label for="selectCustomer" class="col-sm-2 col-form-label"
        >Customer</label
      >
      <div class="col-sm-10">
        <select
          class="form-select"
          id="selectCustomer"
          v-model="selectedCustomerId"
          @change="getCustomer"
        >
          <option value="">==Select Customer==</option>
          <option
            :value="customer.id"
            :key="customer.id"
            v-for="customer in customers"
          >
            {{ customer.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerName" class="col-sm-2 col-form-label">Name</label>
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          id="customerName"
          v-model="customer.name"
          :disabled="!editMode"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerCompany" class="col-sm-2 col-form-label"
        >Company</label
      >
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          id="customerCompany"
          v-model="customer.company"
          :disabled="!editMode"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerEmail" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input
          type="email"
          class="form-control"
          id="customerEmail"
          v-model="customer.email"
          :disabled="!editMode"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerPhone" class="col-sm-2 col-form-label">Phone</label>
      <div class="col-sm-10">
        <input
          type="tel"
          class="form-control"
          id="customerPhone"
          v-model="customer.phone"
          :disabled="!editMode"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerAddress" class="col-sm-2 col-form-label"
        >Address</label
      >
      <div class="col-sm-10">
        <!-- <input
          type="text"
          class="form-control"
          id="customerAddress"
          v-model="customer.address"
          :disabled="!editMode"
        /> -->
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="우편번호"
            aria-label="우편번호"
            aria-describedby="postcode"
            v-model="customer.zonecode"
            readonly
          /><!-- 카카오 api 가져옴 -->
          <button
            class="btn btn-outline-secondary"
            id="postcode"
            @click="openPostcode"
            :disabled="!editMode"
          >
            검색
          </button>
        </div>
        <input
          type="text"
          class="form-control"
          v-model="customer.roadAddress"
          placeholder="주소"
          readonly
        />
        <input
          type="text"
          class="form-control"
          v-model="customer.detailAddress"
          placeholder="상세주소"
        />
      </div>
    </div>

    <button
      class="btn btn-primary me-1"
      @click="editMode = true"
      v-show="!editMode"
      :disabled="selectedCustomerId === ''"
    >
      Edit
    </button>
    <button
      class="btn btn-secondary me-1"
      v-show="editMode"
      @click="editMode = false"
    >
      Cancel
    </button>
    <button class="btn btn-danger" v-show="editMode" @click="doSave">
      Save
    </button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      selectedCustomerId: '',
      customers: [],
      customer: {
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        zonecode: '',
        roadAddress: '',
        detailAddress: ''
      },
      editMode: false
    }
  },
  setup() {},
  created() {
    this.getCustomerList()
    if (!window.daum) {
      this.loadScript()
    }
  },
  mounted() {},
  unmounted() {},
  methods: {
    async getCustomerList() {
      this.customers = await this.$get('/customers')
    },
    async getCustomer() {
      this.editMode = false // 데이터가 바뀔 때매다 수정모드 false
      if (this.selectedCustomerId === '') {
        this.customer = {
          name: '',
          company: '',
          email: '',
          phone: '',
          address: ''
        }
      } else {
        const loader = this.$loading.show()
        this.customer = await this.$get(`/customers/${this.selectedCustomerId}`)
        loader.hide()
      }
    },
    async doSave() {
      if (this.customer.name === '') {
        return this.$swal(
          'Name을 입력하세요',
          'Name은 필수 입력값입니다',
          'info'
        )
      }

      if (this.customer.company === '') {
        return this.$swal(
          'Company을 입력하세요',
          'Company은 필수 입력값입니다',
          'info'
        )
      }

      if (this.customer.email === '') {
        return this.$swal(
          'Email을 입력하세요',
          'Email은 필수 입력값입니다',
          'info'
        )
      }

      if (this.customer.phone === '') {
        return this.$swal(
          'Phone을 입력하세요',
          'Phone은 필수 입력값입니다',
          'info'
        )
      }

      if (this.customer.zonecode === '') {
        return this.$swal(
          'Address을 입력하세요',
          'Address은 필수 입력값입니다',
          'info'
        )
      }

      // 정규식 - 이메일, 전화번호 체크 로직 추가
      const regexpTel = /^010-\d{4}-\d{4}$/
      const regexpEmail =
        /^([a-z]+\d*)+(\.?[a-z]+\d*)+@([a-z]+\d*)+(\.[a-z]{2,3})+$/

      if (!regexpTel.test(this.customer.phone)) {
        return this.$swal(
          'Phone을 올바른 형식으로 입력하세요',
          '010-0000-0000 과 같은 형식입니다',
          'info'
        )
      }

      if (!regexpEmail.test(this.customer.email)) {
        return this.$swal(
          'Email을 올바른 형식으로 입력하세요',
          '이메일은 @를 포함해야합니다',
          'info'
        )
      }

      this.$swal({
        title: '고객 정보를 저장 하시겠습니까?',
        // text: '삭제된 데이터는 복구할 수 없습니다!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '저장',
        cancelButtonText: '취소'
      }).then(async (result) => {
        if (result.isConfirmed) {
          // 저장 로직 구현
          const loader = this.$loading.show()

          this.customer.address =
            `(${this.customer.zonecode}) ${this.customer.roadAddress} ${this.customer.detailAddress}`.trim()

          const r = await this.$put(
            `/customers/${this.selectedCustomerId}`,
            this.customer
          )

          loader.hide()

          if (r.status === 200) {
            this.$swal(
              '저장 되었습니다.',
              '고객 정보가 수정 되었습니다',
              'success'
            )
            this.editMode = false
          }
        }
      })
    },
    loadScript() {
      const script = document.createElement('script')
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
          this.customer.zonecode = data.zonecode
          this.customer.roadAddress = data.roadAddress
        }
      }).open()
    }
  }
}
/* 31.Vue.js 템플릿 SingleViewEdit 패턴 - pi SingleViewEdit 패턴
  개발방법로에 있던 패턴들을 하나씩 만들어보는 시간 ~
  1. json-serve 서버 열기, 고객정보 가져오기
  2. 부트스트랩 참고해 필요한 틀 가져오기, 고객정보 데이터 for문으로 연결
  3. created시점에 불러올 수 있도록 추가 this.getCustomerList()로 json serve에 있는 데이터 불러오기
    - 데이터를 불러올 서버주소는 변경될 수 있음 이전에 mixin/index.js에 있는 파일을 연결
  4. mixin/index.js에서 변경되지 않는 기본값 변수 추가 설정 - 기본 서버 주소, axios.defaults.headers['Content-Type'], axios.defaults.headers['Access-Control-Allow-Origin']
    - 변수로 만들어 사용하면 데이터를 가져오는 페이지에 mixin/index.js를 연결할 때 추가 설정 없이 사용할 수 있음
  5. 서버에서 가져올 데이터 항목 바인팅 추가, nsme과 id 일치화, input type 타입에 맞게 수정
  6. v-model 연결, select 이벤트 추가 : this.getCustomer()(옵션선탯에 따라 데이터를 출력하도록)
  7. editMode: false 및 태그에 :disabled="!editMode" 추가 (수정 모드가 아니면 수정불가하도록)
  8. 수정버튼 및 이벤트 추가(클릭 시 수정 가능하도록)
    <button
      class="btn btn-primary me-1"
      @click="editMode = true"
      v-show="!editMode"
      :disabled="selectedCustomerId === ''" 데이터가 없으면 수정모드가 false가 되면서 버튼 비활성화
    >
      Edit
    </button>
  9. 취소, 저장 버튼 만들기 - 수정모드일 때만 노출되도록 작업
    <button
      class="btn btn-secondary me-1"
      v-show="editMode" // editMode = true면 보이게
      @click="editMode = false" // 클릭하면 수정모드 false
    >
      Cancel
    </button>
    <button class="btn btn-danger" v-show="editMode" >
      Save
    </button>
  10. this.getCustomer()클릭시 데이터를 불러올 동안 로딩화면 보이게 추가(this.$loading.show())
  11. 저장 버튼에 이벤트 추가 @click="doSave", 빈값체크(얼럿화면 this.$swal, 모든 빈값을 확인할 수 있도록 한다.)
  12. 빈값체크 완료시 정말 저장할거니 묻는 알럿 추가(this.$swal), 저장중일 때 로딩화면(this.$loading.show()), 데이터 전송 mixin/index.js put, 정산 실행시 팝업 출력(this.$swal), 팝업 클릭 후 에디터 모드 off
  13. 정규식 추가 정규식을 통과하지 못하면 팝업 노출(this.$swal)
  14. 우편벙호 검색
    - 우편번호 폼 추가 수정모드가 아니면 검색이 안되도록 수정, 우편번호 data, 이벤트 추가 / zonecode: '', roadAddress: '', detailAddress: ''
    - created 단계에 스크립트 유무 체크해 가져오가 추가 if (!window.daum) {this.loadScript()}
    - 빈값체크 우편번호 추가
    - event 부분에 데이터를 받아올 수 있도록 수정 연결 this.customer.zonecode = data.zonecode this.customer.roadAddress = data.roadAddress
    - 전제주소가 저장될 수 있도록 수정 this.customer.address = `(${this.customer.zonecode}) ${this.customer.roadAddress} ${this.customer.detailAddress}`.trim()
*/
</script>
