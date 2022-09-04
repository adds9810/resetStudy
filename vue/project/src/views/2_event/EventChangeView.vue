<template>
  <div>
    <select name="" id="" @change="changeCity($event)" v-model="selectedCity">
      <option value="">==도시선택==</option>
      <option
        :value="city.cityCode"
        :key="city.cityCode"
        v-for="city in cityList"
      >
        {{ city.title }}
      </option>
    </select>
    <select name="" id="">
      <option
        :value="dong.dongCode"
        :key="dong.dongCode"
        v-for="dong in selectedDongList"
      >
        {{ dong.dongTitle }}
      </option>
    </select>
    <!-- <select name="" id="">
      <option
        :value="dong.dongCode"
        :key="dong.dongCode"
        v-for="dong in dongList.filter(
          (dong) => dong.cityCode === selectedCity
        )"
      >
        {{ dong.dongTitle }}
      </option>
    </select> -->
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      selectedCity: '',
      cityList: [
        { cityCode: '02', title: '서울' },
        { cityCode: '051', title: '부산' },
        { cityCode: '064', title: '제주' }
      ],
      dongList: [
        { cityCode: '02', dongCode: '1', dongTitle: '서울 1동' },
        { cityCode: '02', dongCode: '2', dongTitle: '서울 2동' },
        { cityCode: '02', dongCode: '3', dongTitle: '서울 3동' },
        { cityCode: '02', dongCode: '4', dongTitle: '서울 4동' },
        { cityCode: '051', dongCode: '1', dongTitle: '부산 1동' },
        { cityCode: '051', dongCode: '2', dongTitle: '부산 2동' },
        { cityCode: '051', dongCode: '3', dongTitle: '부산 3동' },
        { cityCode: '064', dongCode: '1', dongTitle: '제주 1동' },
        { cityCode: '064', dongCode: '2', dongTitle: '제주 2동' }
      ],
      selectedDongList: []
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    changeCity(event) {
      console.log(event.target.tagName)
      this.selectedDongList = this.dongList.filter(
        (dong) => dong.cityCode === this.selectedCity
      )
    }
  }
}
</script>
<!--
  * 5-2강
  ** event
  - @: v-on의 약어, v-on:click == @click
  - $event로 함수 피라미터에 보내면 이벤트가 발생한 태그를 확인할 수 있음, js에서 console.log(event.target)

  ** change event : 주로 select, checkbox, radio에서 발생
  - 이벤트를 추가할 태그에 @change="이벤트함수명(피라미터)", 이벤트 호출 함수는 method에 추가
  - 멀티 셀렉터 예제(셀렉터 1을 선택하면 셀렉터 2에 옵션이 변경됨)
    1. 1번 셀렉터의 데이터를 data영역에 추가
    2. 1번 셀렉터의 option을 data에서 불러와 for문으로 추가(실무에서는 서버에 저장되어 있는 데이터를 불어오게됨)
    3. 이벤트에 따라 바뀔 데이터 목록을 data에 json형식으로 추가
    4-1-1. 1번 select에 @change="changeCity($event)" v-model="selectedCity" 추가
    4-1-2. 1번 셀렉터의 value값에 따라 list가 변하도록 기능 구현(filter로 동일한 cityCode에 맞는 목록만 추출해 출력)
    4-2-1. 1번 select에 @change="changeCity($event)" v-model="selectedCity"추가 없이 2번 셀렉터에 for문 추가 filter로 1번 셀렉터에서 선택한 value값에 따라 출력되도록 기능 구현, 가독성이 떨어지는 방법, 4-1-1. 방법 추천
-->
