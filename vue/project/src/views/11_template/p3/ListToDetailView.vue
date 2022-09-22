<template>
  <div class="mt-3">
    <div class="row gx-3 gy-2 align-items-center">
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
        <button class="btn btn-success me-1" @click="goToCreate">Create</button>
        <button class="btn btn-secondary me-1" @click="downloadExcel">
          Excel
        </button>
      </div>
    </div>
    <table class="table table-striped table-bordered mt-2">
      <thead>
        <tr>
          <th>Name</th>
          <th>Company</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="customer.id" v-for="customer in customers">
          <td>
            <a class="link-primary" @click="goToDetail(customer.id)">{{
              customer.name
            }}</a>
          </td>
          <td>{{ customer.company }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.address }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      headers: [
        { title: 'Name', key: 'name' },
        { title: 'Company', key: 'company' },
        { title: 'Email', key: 'email' },
        { title: 'Phone', key: 'phone' },
        { title: 'Address', key: 'addres' },
        { title: 'Gender', key: 'gender' }
      ],
      customers: [],
      searchName: ''
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
    goToDetail(customerId) {
      /* router에 값을 넣어 전달할 때 두 가지 방식 중 필요헤 따라 전달
        - get 방식 : 즐겨찾기 서비스를 제공해야 하는 경우
        - post 방식 : 보안이 필요한 서비스 제공
      */
      this.$router.push({
        path: '/template/p3/detail', // 이동할 화면 get 방식으로 전달됨
        query: { id: customerId } // 쿼리스트링 상세화면에 불러올 데이터 아이디추가, 추가하면 ?id=아이디로 전달된, 추가하면 &로 추가할 수 있음
      })

      // http://localhost:8080/template/p3/detail?id=6279074d6a80184dc24175f8
      // http://localhost:3000/users/6279074d6a80184dc24175f8
      // http://localhost:3000/products/6279074d6a80184dc24175f8

      //   this.$router.push({ name: 'DetailView', params: { id: customerId } }) // 이동할 페이지명, params : 데이터를 post방식으로 전달 id가 보이지 않음
      // http://localhost:8080/template/p3/detail
    },
    goToCreate() {
      this.$router.push({ path: '/template/p3/create' })
    },
    downloadExcel() {
      this.$excelFromTable(this.headers, this.customers, 'customers', {})
    }
  }
}
/* 33-1. Vue.js 템플릿 ListToDetail 패턴 - 화면을 3개가 필요 단일페이지가 아님..
  - list 페이지 만들기
  1. 부트스트랩에서 필요한 폼을 가져온다.
  2. 조회 버튼 클릭시 데이터가 출력되도록 이벤트 추가
    <input
      type="text"
      class="form-control"
      id="customerName"
      placeholder="Customer Name"
      v-model="searchName"
      @keyup.enter="doSearch"
    />
  3. 이름에 a태그 추가, 상세화면 zmf릭시 상세보기 화면으로 이동하는 이벤트 추가
    <a class="link-primary" @click="goToDetail(customer.id)">{{ customer.name }}</a>
    goToDetail(customerId)

  33-5. 엑셀 테이터 다운받기 - 실무에서 많이 사용
    - 방법 두가지 선택적으로 사용
      1. 뷰에서 생성 및 다운로드
      2. 서버에서 생성 및 다운로드(node.js), 페이징이 있는 목록이면 서버에서 만들어서 다운로드 받을 수 있도록 하면 좋음
    - 방법(믹스인 추가)
      1. 모듈 추가 npm install exceljs / npm install file-saver
      2. mixin/index.js
        - 임포트 import ExcelJS from 'exceljs' / import { saveAs } from 'file-saver'
        - 실행함수 구현 $excelFromTable - 필요한 기능이 있으면 공식문서의 옵션을 사용하자.
      3. ListToDetailView.vue
        - 버튼추가 및 이벤트 추가
        - 헤더정보 추가 및 downloadExcel
        - 옵션정보는 필요하면 찾아서 사용하자.
        - 조회된 경과??
  * 완벽하게 익히면 다양한 화면 구현가능, 믹스인에 엑셀다운로두 추가됨
*/
</script>
