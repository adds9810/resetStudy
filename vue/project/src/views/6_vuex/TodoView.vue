<template>
  <div>
    <div>{{ todos }}</div>
    <div>할일 목록 전체수 : {{ todosCount }}</div>
    <div>완료 목록 수 : {{ doneTodosCount }}</div>
    <div>미완료 목록 수 : {{ notDoneTodosCount }}</div>
    <div>
      <label for="todo" class="form-label">할일</label>
      <input
        type="text"
        name=""
        id="todo"
        class="form-control"
        v-model="todo"
      />
      <button class="btn btn-primary" @click="addItem">추가(mutation)</button>
      <button class="btn btn-primary" @click="addItem2">추가(action)</button>
    </div>
    <div>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Todo ID</th>
            <th>할일</th>
            <th>완료여부</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr :key="todo.id" v-for="todo in todos">
            <td>{{ todo.id }}</td>
            <td>{{ todo.title }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  :checked="!todo.done"
                  @change="doneYN(todo.id, $event)"
                />
              </div>
            </td>
            <td>
              <button
                class="btn btn-danger btn-sm"
                @click="removeItem(todo.id)"
              >
                삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      todo: ''
    }
  },
  computed: {
    todos() {
      return this.$store.state.todo.todos
    },
    todosCount() {
      return this.$store.getters['todo/todosCount']
    },
    doneTodosCount() {
      return this.$store.getters['todo/doneTodosCount']
    },
    notDoneTodosCount() {
      return this.$store.getters['todo/notDoneTodosCount']
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    // mutations을 이용할 때는 commit으로 불러오기
    addItem() {
      this.$store.commit('todo/add', { id: 4, title: this.todo, done: false })
    },
    removeItem(id) {
      this.$store.commit('todo/remove', id)
    },
    doneYN(id, event) {
      this.$store.commit('todo/doneYN', { id: id, done: !event.target.checked })
    },
    // actions을 이요할 때는 dispatch로 불러오기
    addItem2() {
      this.$store.dispatch('todo/add', { id: 4, title: this.todo, done: false })
    }
  }
}
/*
  18-2. vuex
  - 프로그램 세팅시 vuex를 선택하여 import store from './store'와 app.use(store)가 추가되었음
  - store에 접근하고 싶을때는 $store사용($store.state, $store.getter...)
  - computed 실시간으로 데이터 변동 감지
  - 할일목록 예제, 목록 데이터 상태관리, 할일추가(mutations, actions 활용 방법), 삭제, 스위치로 완료여부

  18-4. modules의 데이터에 접근할 때 namespaced 접근방식으로 수정 필요
    - state : this.$store.state.todo.todos로 접근
    - getters : this.$store.getters['todo/notDoneTodosCount']
    - mutations : this.$store.commit('todo/doneYN', { id: id, done: !event.target.checked })
    - actions : this.$store.dispatch('todo/add', { id: 4, title: this.todo, done: false })

  18-5. 유저관리데이터 예제(실무에서 많이 사용하는 것 중 하나)
  - user.js 파일 및 데이터 생성 및 store/inde.js에 연결
  ** store는 모듈형태로 만들어 관리하는 것이 좋음, 협업할 때 여럿이 필요한 데이터 만들어서 연결하면 작업 충돌이 덜함
*/
</script>
