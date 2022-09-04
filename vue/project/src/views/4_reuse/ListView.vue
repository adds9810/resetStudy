<template>
  <div class="container">
    <button class="btn btn-primary me-1" @click="doSearch">조회</button>
    <button class="btn btn-danger" @click="doDelete">삭제</button>
    <!-- <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>제품코드</th>
          <th>제품명</th>
          <th>제품가격</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="drink.drinkId" v-for="drink in drinkList">
          <td>{{ drink.drinkId }}</td>
          <td>{{ drink.drinkName }}</td>
          <td>{{ drink.price }}</td>
        </tr>
      </tbody>
    </table> -->
    <simple-grid
      :headers="headers"
      :items="drinkList"
      :selectType="selectType"
      checkedKey="drinkId"
      checkedEventName="change-item2"
      @change-item2="changeCheckedValue"
    />
  </div>
</template>
<script>
import SimpleGrid from '@/components/fragments/SimpleGrid.vue'
// import SimpleGrid from '../../components/fragments/SimpleGrid.vue'
export default {
  components: { SimpleGrid },
  data() {
    return {
      selectType: 'checkbox',
      sampleData: '',
      headers: [
        { title: '제품코드', key: 'drinkId' },
        { title: '제품명', key: 'drinkName' },
        { title: '제품가격', key: 'price' }
      ],
      drinkList: [],
      checkedItems: [],
      checkedItem: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    doSearch() {
      this.drinkList = [
        {
          drinkId: '1',
          drinkName: '코카콜라',
          price: 700,
          qty: 1
        },
        {
          drinkId: '2',
          drinkName: '오렌지주스',
          price: 1200,
          qty: 1
        },
        {
          drinkId: '3',
          drinkName: '커피',
          price: 500,
          qty: 1
        },
        {
          drinkId: '4',
          drinkName: '물',
          price: 700,
          qty: 1
        },
        {
          drinkId: '5',
          drinkName: '보리차',
          price: 1200,
          qty: 1
        },
        {
          drinkId: '6',
          drinkName: '포카리',
          price: 1000,
          qty: 1
        },
        {
          drinkId: '7',
          drinkName: '뽀로로',
          price: 1300,
          qty: 1
        }
      ]
    },
    doDelete() {
      // 삭제 실행 - 삭제할 아이템에 대한 제품번호는 this.checkedItems
    },
    changeCheckedValue(data) {
      console.log('선택된 아이템', data)
      if (this.selectType === 'checkbox') {
        this.checkedItems = data
      } else if (this.selectType === 'radio') {
        this.checkedItem = data
      }
    }
  }
}
</script>
<!--
  11. 재사용 컴포넌트 SimpleGrid
      실무에서 사용빈도가 높은 재사용 컴포넌트 만들기, 대부분 데이터는 서버에서 가져오지만 data()데이터를 가져옴을 전제로 한다.

  * 심플그리드 기본
  1. src/components/fragments/SimpleGrid.vue
    - 조회버튼 생성 및 @click="doSearch" 추가
    - 목록을 불러올 테이블 기본 구조 작성(for)
  2. src/views/4_reuse/ListView.vue
   2-1. src/components/fragments/SimpleGrid.vue 불러오기 및 <simple-grid />태그 추가
    - component파일이 만들어져 있다면 태그 앞부분만 작성해도 가이드로 나오고 자동완성으로 연결해줌(상대경로로 자동완성되기때문에 절대경로로 바꿔줘야함)
    - 가급적이면 절대경로 사용 : 상대경로사용시 추후 변경될 파일 위치에 오류가 발생할 수 있음
   2-2. 음료목록과 음료목록 구분을 data에 저장
    - header은 이름과 함께 key값이 어떤 것인지를 설명해주는 값도 같이 포함됨
    - simple-grid 컴포넌트에 전달할 데이터 이름 추가 :headers="headers" :items="drinkList"
  3. src/components/fragments/SimpleGrid.vue
    - props로 받을 수 있게 정의
    - 제품목록 헤더을 데이터로 받아와 for문으로 출력 :key는 header.key로 받아옴
    - 제품목록은 행은 제품목록 개수, 열은 목록헤더의 key대로, 데이터는 헤더의 키값에 맞게 목록에서 순서대로 가져옴

  * 심플그리드 심화(체크박스로 체크여부 확인)
  4. 삭제 체크여부를 받아줄 selectType 추가 및 prop로 연결
  5. v-if로 selectType가 checkbox면 나타날 체크박스 태그 추가
  6. 체크시 체크한 데이터의 값을 받아줄 checkedItem 및 prop로 연결
  7. checkedItem에 id가 들어오도록 checkedKey="drinkId" 및 :value="item[checkedKey]" 추가
  8. v-model="checkedItems"과 data checkedItems: []로 선택한 값을 받을 수 있게함
  9. 부모에서 커스텀 이벤트 @change-item2="changeCheckedValue"로 데이터를 불러올 수 있게 함
  10. 체크값이 변경될 때 부모에게 알려줄 수 있도록 이벤트 @change="doChecked" 와 메소드에 change-item2, 데이터를 실어 보냄
  11. 자식한테 받은 데이터를 부모의 data에 받아올 수 있게 data에 checkedItems정의 및 이벤트 실행시 받아올 수 있게 함
  12. 전체 삭제 이벤트 @change와 method 추가, 전체선택여부가 체크일 때 데이터가 전부 들어갈 수 있도록 구현

  * 심플그리드 심화(커스텀 이벤트 이름 수정)
  - 이벤트 이름에 변경이 필요할 경우를 대비한 구현
  13. 커스텀 이벤트 이름을 담을 checkedEventName 추가 및 props에 정의, 별도의 설정이 없을 경우 change-item가 되도록 지정
  14. 자식 컴포넌트에서 this.$emit으로 커스텀이벤트 네임을 받아올 수 있게 함  -> this.$emit(this.checkedEventName, this.checkedItem)

  * 커스텀 이벤트명을 수정할 수 있다는 건 자유도는 좋아지나, 연관성을 생각하기가 어려움(일관성이 떨어질 수 있음) - 상황을 고려한 코딩 필요

  * 심플그리드 심화(라디오 버튼 만들기)
  15. v-if로 selectType가 radio면 나타날 radio 태그 추가
  16. 체크시 값을 전달해야 하므로 :value와 v-model 추가, 이벤트 @change 추가
  17. 데이터를 받을 별수 checkedItem 추가 및 연결
  18. 자식컴포넌트 doChecked() 에서 체크박스인지 라디오인지에 따라 데이터를 달리 전달할 수 있도록 코드 수정
  19. 부모 changeCheckedValue(data) 에서 체크박스 라이오 여부에 따라 받은 데이터를 전달할 변수를 달리할 수 있도록 수정

  ** 기타 추가 기능을 구현해서 만들 수 있음
  ** ui+data로 다양한게 만들 수 있음
  ** 심플 그리드 데이터를 많이 가질 수록 나중에 간단한 페이지는 빠르게 만들 수 있음
  ** 재사용 컴포넌트로 만드는 페이지는 정해져 있음, 잘 만들어서 쌓아두면 자산이 될 수 있음
  ** 플로그인이나 안정적인 페이지들을 잘 만들어두자
-->
