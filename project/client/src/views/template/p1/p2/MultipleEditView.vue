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
        <button
          class="btn btn-success me-1"
          :disabled="selectedCustomers.length === 0"
          @click="doSave"
        >
          Save
        </button>
        <button
          class="btn btn-danger"
          :disabled="selectedCustomers.length === 0"
          @click="doDelete"
        >
          Delete
        </button>
      </div>
    </div>
    <table class="table table-bordered mt-2">
      <thead>
        <tr>
          <th></th>
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
            <input
              type="checkbox"
              class="form-check-input"
              :value="customer.id"
              v-model="selectedCustomers"
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.name"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.company"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.email"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.phone"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.address"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
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
      customers: [],
      searchName: '',
      selectedCustomers: []
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
    async doSave() {
      const selectedCustomerData = []
      this.selectedCustomers.forEach((id) => {
        selectedCustomerData.push(
          this.customers.filter((customer) => customer.id === id)[0]
        )
      })

      console.log(selectedCustomerData)

      let isEmptyName = false
      let isEmptyCompany = false
      let isEmptyEmail = false
      let isEmptyPhone = false
      let isEmptyAddress = false

      const regexpEmail =
        /^([a-z]+\d*)+(\.?[a-z]+\d*)+@([a-z]+\d*)+(\.[a-z]{2,3})+$/
      const isWrongEmails = []
      selectedCustomerData.forEach((customer) => {
        if (customer.name === '') {
          isEmptyName = true
        }

        if (customer.company === '') {
          isEmptyCompany = true
        }

        if (customer.email === '') {
          isEmptyEmail = true
        } else {
          if (!regexpEmail.test(customer.email)) {
            isWrongEmails.push(customer.email)
          }
        }

        if (customer.phone === '') {
          isEmptyPhone = true
        }

        if (customer.address === '') {
          isEmptyAddress = true
        }
      })

      if (isEmptyName) {
        return this.$swal('입력되지 않은 Name이 있습니다.', '', 'info')
      }

      if (isEmptyCompany) {
        return this.$swal('입력되지 않은 Company가 있습니다.', '', 'info')
      }

      if (isEmptyEmail) {
        return this.$swal('입력되지 않은 Email이 있습니다.', '', 'info')
      }

      if (isEmptyPhone) {
        return this.$swal('입력되지 않은 Phone이 있습니다.', '', 'info')
      }

      if (isEmptyAddress) {
        return this.$swal('입력되지 않은 Address가 있습니다.', '', 'info')
      }

      if (isWrongEmails.length > 0) {
        return this.$swal(
          '올바르지 않은 Email이 있습니다.',
          `${isWrongEmails.join(', ')}는 올바른 형식의 이메일이 아닙니다.`,
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

          let isSuccess = true

          selectedCustomerData.forEach(async (customer) => {
            const r = await this.$put(`/customers/${customer.id}`, customer)
            if (r.status !== 200) {
              isSuccess = false
            }
          })

          loader.hide()

          if (isSuccess) {
            this.$swal(
              '저장 되었습니다.',
              '고객 정보가 수정 되었습니다',
              'success'
            )
          } else {
            this.$swal(
              '저장에 실패한 데이터가 있습니다',
              '재시도하세요.',
              'error'
            )
          }

          this.selectedCustomers = []
          this.doSearch()
        }
      })
    },
    async doDelete() {
      this.$swal({
        title: '정말 삭제 하시겠습니까?',
        text: '삭제된 데이터는 복구할 수 없습니다!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
      }).then(async (result) => {
        if (result.isConfirmed) {
          // 저장 로직 구현
          const loader = this.$loading.show()

          let isSuccess = true

          this.selectedCustomers.forEach(async (id) => {
            const r = await this.$delete(`/customers/${id}`)
            if (r.status !== 200) {
              isSuccess = false
            }
          })

          loader.hide()

          if (isSuccess) {
            this.$swal(
              '삭제 되었습니다.',
              '고객 정보가 삭제 되었습니다',
              'success'
            )
          } else {
            this.$swal(
              '삭제에 실패한 데이터가 있습니다',
              '재시도하세요.',
              'error'
            )
          }

          this.selectedCustomers = []
          this.doSearch()
        }
      })
    }
  }
}
/* 32.Vue.js 템플릿 p2 MultipleEdit 패턴
  1. 부트스트랩에서 필요한 폼을 가져와 커스터마이징한다.
  2. 데이터를 가져와서 출력할 수 있도록 data customers 배열, table 바인딩 수정
  3. doSearch 조회 버튼 클릭하면 로드창이 나오고 데이터를 가져와 테이블에 출력되도록 이벤트 추가
    async doSearch() {
      const loader = this.$loading.show()
      this.customers = await this.$get(
        `/customers`
      )

      loader.hide()
    },
  4. 고객이름을 바인딩, 검색창에 이름 입력 후 검색 시 고객이름을 검색할 수 있는 이벤트 추가
    searchName: '',
    async doSearch() {
      const loader = this.$loading.show()
      this.customers = await this.$get(
        `/customers?name_like=${this.searchName}` // 고객이름 들어가도록
      )

      loader.hide()
    },
  5. 클릭이벤트 추가
    <input
      type="text"
      class="form-control"
      id="customerName"
      placeholder="Customer Name"
      v-model="searchName"
      @keyup.enter="doSearch"
    />
  6. 저장버튼 추가, 선택한 이름이 없으면 버튼 비활성화
    <button
      class="btn btn-success me-1"
      :disabled="selectedCustomers.length === 0"
      @click="doSave"
    >
      Save
    </button>
  7. 삭제 버튼 및 data selectedCustomers: [], 삭제 이벤트 추가, 선택한 이름이 없으면 버튼 비활성화
    <button
      class="btn btn-danger"
      :disabled="selectedCustomers.length === 0"
      @click="doDelete"
    >
      Delete
    </button>
  8. 저장 이벤트 추가
    - 회원 배열을 반복문으로 선택한 목록을 filter로 걸러 담아냄
    - put으로 선택한 배열을 엄데이트 하도록 수정
    - proxy es6 뷰에서는 의미있게 사용하지만 오브젝트처럼 사용하면 된다.
    - 필수값 빈값체크 : 선택한 열의 입력창 중 하나라도 빈값이 있을 경우 this.$swal 팝업 출력
      if (customer.name === '') {
        isEmptyName = true
      }
      if (isEmptyName) {
        return this.$swal('입력되지 않은 Name이 있습니다.', '', 'info')
      }
    - 이메일(올바르지 않는 이유 축력되도록 작성), 폰 정규식 확인
    - 정규식, 빈값확인이 완료되면 저장확인, 확인 선택 시 배열로 선택한 목록들이 put으로 수정하도록 실행(31의 저장버튼 참고), 전송 완료 성공, 실패에 따른 안내문 출력
      - 서버를 사용하면 한번에 수정을 전송하지만, 현재는 서버를 사용하지 않으므로 반복문으로 실행해 보내고 성공하면 성공안내 후 체크박스 초기화, 1건이라도 싶패하면 실해한 데이터가 무엇인지 알도록 작성
  9. 입력창 비활성화, 체크 후 수정 클릭시 체크한 입력창이 활성화 되도록 수정
    <input
      type="text"
      class="form-control"
      v-model="customer.name"
      :disabled="
        selectedCustomers.filter(
          (selectedId) => selectedId === customer.id
        ).length === 0
      "
    />

  10. 삭제 이벤트 추가 : 선택한 데이터를 삭제
    - 삭제할 건지 재확인, delete사용

  ** 지금까지 배운 것을 완벽하게 이해할 수 있는 시간을 갖고 복습해야함.
*/
</script>
