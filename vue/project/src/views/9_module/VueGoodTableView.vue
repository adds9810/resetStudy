<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :line-numbers="true"
      :row-style-class="rowStyleClassFn"
      v-on:row-click="onRowClick"
      :search-options="{
        // 검색옵션
        enabled: true,
        trigger: 'enter', // 언테키누루면 검색됨
        placeholder: 'Search this table'
      }"
      :sort-options="{
        enabled: true,
        multipleColumns: true, // 클릭시 행 전테가 클릭됨
        initialSortBy: [
          // 필터방법, 처음 클릭했을때만 적용되
          { field: 'name', type: 'asc' },
          { field: 'age', type: 'desc' }
        ]
      }"
      :pagination-options="{
        // 페이지 옵션
        enabled: true,
        mode: 'pages', // 페이지(수정가능), 레코드(수정불가, 페이지 위치 확인만 가능) 두버전
        perPage: 2, // 한 페이지에 보여질 컬럼수
        perPageDropdownEnabled: true // 한페이지당 표시할 컬럽수 사용자가 수정할 수 있게 할지 말지
      }"
    >
      <template #table-actions>
        <button class="btn btn-info btn-sm">엑셀저장</button>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
export default {
  name: 'my-component',
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name'
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number'
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd', // 인풋포맷
          dateOutputFormat: 'MMM do yy' // 출력형식 MMM - 월 영어식 약자 표현 / do - 일 영어식 표현 / yy - 년도 두자리까지
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage' // 점수를 퍼센트로 자동으로 바꿔줌
        }
      ],
      rows: [
        { id: 1, name: 'John', age: 20, createdAt: '', score: 0.03343 },
        {
          id: 2,
          name: 'Jane',
          age: 24,
          createdAt: '2011-10-31',
          score: 0.03343
        },
        {
          id: 3,
          name: 'Susan',
          age: 16,
          createdAt: '2011-10-30',
          score: 0.03343
        },
        {
          id: 4,
          name: 'Chris',
          age: 55,
          createdAt: '2011-10-11',
          score: 0.03343
        },
        {
          id: 5,
          name: 'Dan',
          age: 40,
          createdAt: '2011-10-21',
          score: 0.03343
        },
        {
          id: 6,
          name: 'John',
          age: 20,
          createdAt: '2011-10-31',
          score: 0.03343
        }
      ]
    }
  },
  methods: {
    rowStyleClassFn(row) {
      return row.age > 18 ? 'green' : 'red'
    },
    onRowClick(params) {
      // table event, 테이블에 대한 정보를 제공해줌
      console.log(params)
    }
    // myFunc(row, col, cellValue, searchTerm) { searchFn 이벤트 추가가능하나 무엇을 컨트롤할 수 있을지 확인하고 사용필요, 대부분 지원 기능해서 사용가능해 실무에서 빈도가 낮을수도...
    //   console.log('row', row)
    //   console.log('col', col)
    //   console.log('cellValue', cellValue)
    //   console.log('searchTerm', searchTerm)
    //   return cellValue.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    // }
  }
}
</script>

<style>
.green {
  background-color: green;
}

.red {
  background-color: red;
}
</style>
<!--
28. Vue.js vue-good-table
 - 심플그리드로 만들기 연습은 했으나 그보다 많은 기능을 요구함, 직접 만들어 사용해도 무관하지만 가능하다면 라이브러리를 설치해 사용하면 시간 절약됨
  - 설치
    1. 2버전 vue-good-table(https://xaksis.github.io/vue-good-table/), 3버전 vue-good-table-next(https://borisflesch.github.io/vue-good-table-next/) 맞게 설치
    2. 등록 main.js에 전역 설치 혹은 컴포넌트로 등록해 사용
  - https://borisflesch.github.io/vue-good-table-next/guide/#basic-example - 기본구성이지만 많은 기능 지원
  - 지원옵션 확인가능 : 행, 열, 최대너비, 스크롤, row-style-class, Table Actions Slot(예시의 슬록을 추가해주면 테이블 상단에 영역이 추가됨) 사용하는 버전에 기능을 지원하는지 잘 확인하고 사용하자 - vue3보다 2을 많이 사용하는 이유
  - row-style-class 데이터가 특정 조건을 충족하면 조건에 맞게 class를 추가해줌, css에 scope를 빼야 사용가능
  - https://borisflesch.github.io/vue-good-table-next/guide/configuration/table-events.html 테이블 이벤트
    - v-on:cell-click 셀에 대한 정보 확인가능
    - v-on:row-click 헹에 대한 정보를 받을 수 있음
    - v-on:page-change 페이지 이동할때 정보를 전달 수 있음
  - https://borisflesch.github.io/vue-good-table-next/guide/configuration/search-options.html 검색옵션, 검색창 생성 및 검색 지원
    - searchFn 직접 기능을 만들어서 연결가능, row, col, cellValue, searchTerm 피아미터 맞게 작성
    - externalQuery 별도의 검색관련 ui 추가가 필요할 때 사용가능 https://borisflesch.github.io/vue-good-table-next/guide/configuration/search-options.html#placeholder
  - 페이지 옵션 : https://borisflesch.github.io/vue-good-table-next/guide/configuration/pagination-options.html
    - pagination label/text options : 페이쪽 문구 수정시 사용
  - 체크박스, 컬럼, 테마 지원
  - 조회에만 특화되어 있음, 쓰기 드의 화면은 지원, 부트스트랩과 디자인이 비슷
  - css scope
    - vue는 빌드할 때 개발자의 설정에 따라 파일을 합치거나 분리하도 이름을 임의로 변경하는데 scope를 적용하면 class명이 변경되어 html태그에 있는 선택자 명과 일치하기 않게됨
    - 없으면 전역 css파일로 합쳐지고 이름도 변경되지 않음

  ** 커스터마이징이 가능하다면 3버전도 괜찮지만 부담되면 2버전을 많이 사용
-->
