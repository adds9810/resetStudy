<template>
  <div class="mt-3">
    <div class="row gx-3 gy-2 align-items-center mb-2">
      <div class="col-sm-3">
        <label class="visually-hidden" for="customerName">Name</label>
        <input
          type="text"
          class="form-control"
          id="customerName"
          placeholder="Customer Name"
          v-model="searchName"
          @keyup.enter="doSearch"
        />
      </div>
      <div class="col-auto">
        <button class="btn btn-primary me-1" @click="doSearch">Search</button>
      </div>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="customers"
      v-on:cell-click="onCellClick"
      :sort-options="{
        enabled: true
      }"
      :pagination-options="{
        enabled: true,
        mode: 'pages',
        perPage: 5,
        perPageDropdownEnabled: true
      }"
    >
    </vue-good-table>
    <div class="mt-3 customer-form" v-show="selectedId !== ''">
      <div class="row mb-3">
        <label for="customerName" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input
            type="text"
            name=""
            id="customerName"
            class="form-control"
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
            name=""
            id="customerCompany"
            class="form-control"
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
            name=""
            id=""
            class="form-control"
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
            name=""
            id=""
            class="form-control"
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
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="우편번호"
              aria-label="우편번호"
              aria-describedby="postcode"
              v-model="customer.zonecode"
              readonly
            />
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
            :disabled="!editMode"
          />
        </div>
      </div>
      <button
        class="btn btn-primary me-1"
        @click="editMode = true"
        v-show="!editMode"
        :disabled="selectedId === ''"
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
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          tdClass: 'link-primary'
        },
        {
          label: 'Company',
          field: 'company'
        },
        {
          label: 'Email',
          field: 'email'
        },
        {
          label: 'Phone',
          field: 'phone'
        },
        {
          label: 'Address',
          field: 'address'
        }
      ],
      customers: [],
      searchName: '',
      selectedId: '',
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
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    async doSearch() {
      const loader = this.$loading.show()
      this.customers = await this.$get(
        `/customers?name_like=${this.searchName}`
      )
      loader.hide()
    },
    onCellClick(params) {
      console.log(params)
      if (params.column.field === 'name') {
        this.selectedId = params.row.id
        this.editMode = false
        this.getCustomer()
      }
    },
    async getCustomer() {
      this.customer = await this.$get(`/customers/${this.selectedId}`)
      console.log(this.customer)
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
            `/customers/${this.selectedId}`,
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
    }
  }
  /* 34-1.Vue.js 템플릿 MasterDetail 패턴
  상단에 조회 조건이 있고 하단에 목록이 나옴 선택하면 하던에(혹은 팝업에) 상세정보가 나옴
  - 하단에 상세정보
  1. p3/ListToDetailView 소스 가져와 불필요한 내용 삭제
  2. 페이징 처리 추가
    - 9_module/VueGoodTableView.vue의 소스 가져오기 및 수정
    - 공식문서에서 a태그 추가 tdClass, css 추가
  3.데이터를 받아 저장할 수 있도록 변수설정
  4. onCellClick 이름 셀 클릭하면 상세 데이터를 가져오도록 수정
    - 행 클릭시 아이디 정보를 받을 수 있도록 설정
    - 아이디를 받아 서버 통신으로 데이터를 받아올 수 있도로 this.getCustomer() 실행
  5. 상세보기 화면이 정보선택시 보일 수 있도록 수정 , 디자인 수정 <div class="mt-3 customer-form" v-show="selectedId !== ''">
  6. 수정버튼 클릭시 폼을 수정가능하도록 수정
    - p1/SingleViewEditView.vue에서 수정, 삭제 버튼 data 에디터 모드 가져와 수정
    - input에 :disabled="!editMode" 추가 및 수정
  7. 다른 정보 선택시 수정모드는 닫히도록 onCellClick에 editMode 끄기
  8. 저장하기 소스 가져와 저장하기 클릭시 에디터모드 끄도록 수정
*/
}
</script>
<style>
.link-primary {
  text-decoration: underline;
  cursor: pointer;
}

.customer-form {
  border: 1px solid #dcdfe6;
  padding: 10px;
  background: linear-gradient(#f4f5f8, #f1f3f6);
}
</style>
