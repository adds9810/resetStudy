<template>
  <div>
    <p>{{ str }}</p>
    <p>{{ str2 }}</p>
    <p>{{ num }}</p>
    <p>{{ isOk }}</p>
    <p>{{ arr }}</p>
    <p>{{ obj }}</p>
    <select name="" id="" @change="callParent" v-model="selectedNum">
      <option :value="num" :key="num" v-for="num in arr">{{ num }}</option>
    </select>
    <button @click="callParent">부모로 데이터 전달</button>
  </div>
</template>
<script>
/*
  9-2강
  * 네임룰 : view폴더안의 파일들은 이름 뒤가 view가 붙으나 component폴더 안의 파일들은 그렇지 않음. 파일명 작성시 주의!
*/
export default {
  props: {
    str: {
      // 속성명
      type: String, // 데이터타입
      default: '' // 데이터가 안 들어올 때 기본값
    },
    num: {
      type: Number,
      default: 0
    },
    isOk: {
      type: Boolean,
      default: false
    },
    arr: {
      // * 주의 배열이나 오브젝트는 기본값을 반드시 함수형으로 기재해줘야 함
      type: Array,
      default: function () {
        return []
      }
    },
    obj: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {},
  data() {
    return {
      selectedNum: 1,
      str2: 'Jeju'
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    callParent() {
      this.$emit('change-num', this.selectedNum)
    },
    printMessage() {
      console.log('printMessage')
    }
  }
}
/* 9-4강
부모한테 데이터를 받아서 랜더링되는 경우도 있지만 반대로 자식이 받은 데이터를 부모한테 전달해야 할 수도 있음(예 체크한 혹은 선택한 값을 전달해야함)
@change="callParent" 값이 바뀌면 호출, 이벤트 안에 this.$emit()안에 커스텀 이벤트를 피라미터를 추가하여 사용할 수 있음

뷰는 자바스크립트 기본 이벤트 외 커스텀 이벤트를 정의해 사용할 수 있음
많이 사용, 자식컴포넌에서 받은 값을 부모 컴포넌트에서 받아서 할 수 있는 것이 많음 자식컴포넌트에서 this.$emit()으로 커스텀 이벤트를 호출할 수 있음
부모에게 받은데이터를 전달할 수도 있지만, 부모컴포넌트에 있는 데이터에 접근해서 값을 변경하거나 가져올 수 있음, 버튼이나 select로 사용자를 통해 변경된 값을 알 수 있지만, 사용자 액션 전에 데이터를 알고 싶을 때
*/
</script>
