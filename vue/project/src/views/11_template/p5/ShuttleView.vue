<template>
  <div class="mt-3">
    <div class="row">
      <div class="col-5">
        <div class="row gx-3 gy-2 align-items-center">
          <div class="col-6">
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
            <button class="btn btn-primary me-1" @click="doSearch">
              Search
            </button>
          </div>
        </div>
        <table class="table table-striped table-bordered mt-2">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="customer.id" v-for="customer in customers">
              <td>
                <input
                  type="checkbox"
                  class="form-check-input"
                  :value="customer.id"
                  v-model="checkedItems"
                />
              </td>
              <td>{{ customer.name }}</td>
              <td>{{ customer.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-2">
        <div class="d-flex flex-column justify-content-center h-100">
          <button class="btn btn-danger mb-2" @click="doAdd">
            <i class="fa-solid fa-chevron-right"></i>
          </button>

          <button class="btn btn-danger" @click="doRemove">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
        </div>
      </div>
      <div class="col-5">
        <div class="row gx-3 gy-2 align-items-center">
          <div class="col-6">
            <select name="" id="" class="form-select">
              <option value="">재무팀</option>
              <option value="">영업팀</option>
              <option value="">인사팀</option>
            </select>
          </div>
          <div class="col-auto">
            <button class="btn btn-danger">Save</button>
          </div>
        </div>
        <table class="table table-striped table-bordered mt-2">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="customer.id" v-for="customer in customers2">
              <td>
                <input
                  type="checkbox"
                  class="form-check-input"
                  :value="customer.id"
                  v-model="checkedItems2"
                />
              </td>
              <td>{{ customer.name }}</td>
              <td>{{ customer.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchName: '',
      customers: [],
      customers2: [],
      checkedItems: [],
      checkedItems2: []
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
    doAdd() {
      if (this.checkedItems.length > 0) {
        const selectedCustomers = []
        this.checkedItems.forEach((id) => {
          const item = this.customers.filter(
            (customer) => customer.id === id
          )[0]
          selectedCustomers.push(item)
        })

        const existCustomer = [...this.customers2]
        selectedCustomers.forEach((selectedCustomer) => {
          if (
            existCustomer.filter((c) => c.id === selectedCustomer.id).length ===
            0
          ) {
            existCustomer.push(selectedCustomer)
          }
        })

        this.customers2 = existCustomer
        this.checkedItems = []
      }
    },
    doRemove() {
      const existCustomer = [...this.customers2]
      this.checkedItems2.forEach((id) => {
        existCustomer.forEach((customer, idx) => {
          if (customer.id === id) {
            existCustomer.splice(idx, 1)
          }
        })
      })

      this.customers2 = existCustomer
      this.checkedItems2 = []
    }
  }
}
/* 35. Vue.js 템플릿 Shuttle 패턴 - 좌축의 데이터를 우측으로 보내거나, 우측의 데이터를 좌측을 뺄때 사용
  - 폼만들기 row를 크게 3개로 만듬
  1. 1row 조회조건, 조회결과 목록
    - 이전의 폼 가졍와 만들기 data에 선언한 변수들고 함께 가져온다
  - 체크박스 추가, 고객의 아이디가 체크박스의 value에 들어가도록
    <input
      type="checkbox"
      class="form-check-input"
      :value="customer.id"
      v-model="checkedItems"
    />
  - 체크박스 변수 선언
  2. 2row 우측, 좌측을 오갈 수 있도록 버튼 만들기 - 데이터를 특정 그룹(혹은 카테고리)으로 옮기고 삭제할 때 사용
    - 좌우 화살표는 폰트어썸 무료 아이콘 사용, 부트스트랩 사용해서 가운데 정렬
  3. 1row에서 선택한 데이터만 보이는 목록
    - 1row와 동일한 조건조회, 결과 목록 폼 만들기
    - 커스토머 데이터는 기본, 새로운 배열과 데이터(커스토머 2) 추가
  4. 좌우로 데이터가 오갈 수 있도록 이벤트 구현
      - doAdd()
        - 선택한 데이터가 1개라도 있으면 옮길 수 있도록, 선택한 데이터를 배열, 데이터에 넣고 목록에 출력할 수 있도록 한다.
        - 체크박스 새배열(checkedItems2: []) 만들어서 리셋되도록 수정
        - 데이터를 우측으로 추가하고 나면 좌측에 체크박스한 목록을 리셋한다.
        - 중복입력 방지를 위한 이이 등록된 데이터 선택시 들어가지 않도록 로직 추가
          const existCustomer = [...this.customers2]
          selectedCustomers.forEach((selectedCustomer) => {
            if (
              existCustomer.filter((c) => c.id === selectedCustomer.id).length ===
              0
            ) {
              existCustomer.push(selectedCustomer)
            }
          })
      - doRemove()
        - 우측 데이터를 선택하고 좌측 버튼을 누르면 좌측에 추가되는 것이 아닌 데이터가 지워져야 함
        - for문으로 선택한 데이터의 순서를 비교해 해당순서의 데이터를 1개 제거한다.
    5. 선택박스, 우측에 저장 버튼 추가 및 이벤트
      - 선택박스 - 카테고리 선택(많이 사용) 카테고리에 해당하는 데이터를 이동 및 추가하고 저장할 수 있도록 함
      - 우측에 저장 버튼 - 구현 데이터 이동이 완료되면 저장해 우측의 데이터를 전달 할 수 있도록 해야함

  header에 p1~p5를 메뉴로 등록해보자.
*/
</script>
