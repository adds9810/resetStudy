<template>
  <div class="mt-3">
    <div class="row mb-3">
      <label for="customerName" class="col-sm-2 col-form-label">Name</label>
      <div class="col-sm-10">
        {{ customer.name }}
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerCompany" class="col-sm-2 col-form-label"
        >Company</label
      >
      <div class="col-sm-10">
        {{ customer.company }}
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerEmail" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        {{ customer.email }}
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerPhone" class="col-sm-2 col-form-label">Phone</label>
      <div class="col-sm-10">
        {{ customer.phone }}
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerAddress" class="col-sm-2 col-form-label"
        >Address</label
      >
      <div class="col-sm-10">
        {{ customer.address }}
      </div>
    </div>
    <button class="btn btn-secondary me-1" @click="goToList">List</button>
    <button class="btn btn-primary" @click="goToEdit">Edit</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      id: '',
      customer: {
        name: '',
        company: '',
        email: '',
        phone: '',
        address: ''
      }
    }
  },
  setup() {},
  created() {
    // console.log(this.$route.query.id)
    this.id = this.$route.query.id
    // console.log(this.$route.params)
    // this.id = this.$route.params.id
  },
  mounted() {
    this.getCustomer()
  },
  unmounted() {},
  methods: {
    async getCustomer() {
      this.customer = await this.$get(`/customers/${this.id}`)
      console.log(this.customer)
    },
    goToList() {
      this.$router.push({ path: '/template/p3/list' })
    },
    goToEdit() {
      this.$router.push({ name: 'EditView', params: { id: this.id } })
    }
  }
}

/* 33-2. Vue.js 템플릿 ListToDetail 패턴 - DetailView
  1. data에 id, customer 선언, created에서 쿼리가 있는지 확인
    created() {
      // console.log(this.$route.query.id)
      this.id = this.$route.query.id
      // console.log(this.$route.params)
      // this.id = this.$route.params.id
    }
    - 라우터로 화면 보낼때는 라우터, 받을때는 라우트
      - 쿼리로 보냈으면 쿼리도 받으면 된다.
      - 파람즈는 파람즈로 받은
  2. mounted에서 아이디를 받아 데이터 불러와 상세정보 출력
    mounted() {
      this.getCustomer()
    }
  3. 부트스트랩을 활용해 상세화면 폼 만들기, 목록, 수정 버튼추가
  4. 목록 페이지로 이동하는 이벤트 구현
  5. 수정화면 추가 및 수정페이지 이동 이벤트 구현 - id가 없으면 이동하지 못하도록 구현
  ** 생성 및 수정 겸용이 꼭 좋은 것은 아님(스크립트로 제어해서 지우고 수정할 수도 있음??), 필요에 따라 생성, 수정을 합치거나 분리하던지 하자
*/
</script>
