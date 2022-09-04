<template>
  <div
    class="modal fade"
    :id="modalId"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    :aria-labelledby="`${modalId}Label`"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="`${modalId}Label`">
            <slot name="title"></slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    modalId: {
      type: String,
      default: 'myModal'
    }
  },
  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
<!--
  12. Vue.js Slot
  Slot : 재사용 컴포넌트, 부모영역에서 자식컴포넌트의 특정 영역만 html영역을 재정의해서 사용할 수 있음
        (공통된 레이아웃에 변경되는 ui가 있는 html 요소라면 공통된 부분을 컴포넌트에 변경이 필요한 부분을 부모영역에 두고 사용할 수 있게함?)
        name을 동일하게 두면 순서는 일치하지 않더라도 원하는 곳에 삽입해줌
    - 이전의 재사용 컴포넌트는 부모는 데이터를 전송하고 저장, 자식컴포넌트는 html을 구성함

  modal popup예제
  1. src/components/fragments/SlotModal.vue 생성
  2. bootstrap Static backdrop 소스를 가져와 붙여넣기
  3. html요소 중 재정의가 필요한 부분들을 slot 태그 추가 및 name지정
  4. src/views/4_reuse/SlotView.vue 생성
  5. 호출할 버튼 html 생성
  6. import src/components/fragments/SlotModal.vue 및 컴포넌트 정의
  7. <Slot-modal /> 추가, id와 버튼의 data-bs-toggle="" data-bs-target=""가 하나라면 열림
  8 <slot-modal></slot-modal>안에 <template></template>를 추가, template v-slot:컴포넌트에서 지정한 slot name에 내용을 추가하면 해당 slot name에 전달되어 보이게 할 수 있음(재정의해서 사용)

  버튼이 2개 이상일 겨우
  9. 변수가 되는 부분을 slot-modal modalId=""에 지정 props로 데이터를 전달받을 수 있게함

-->
