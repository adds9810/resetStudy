export const todo = {
  namespaced: true,
  // 중앙 데이터 저장소
  state() {
    return {
      todos: [
        { id: 1, title: 'todo 1', done: true },
        { id: 2, title: 'todo 2', done: false },
        { id: 3, title: 'todo 3', done: false }
      ]
    }
  },
  // Store를 위한 computed라고 생각하면 됨.
  getters: {
    todosCount(state) {
      return state.todos.length
    },
    donetodosCount(state) {
      return state.todos.filter((todo) => todo.done).length
    },
    notDoneTodosCount(state) {
      return state.todos.filter((todo) => !todo.done).length
    }
  }, // 상태(state)를 변경시킬 수 있는 유일한 방법(함수)
  mutations: {
    add(state, item) {
      state.todos.push(item)
    },
    remove(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id)
    },
    doneYN(state, doneStatus) {
      state.todos.filter((todo) => todo.id === doneStatus.id)[0].done =
        doneStatus.done
    }
  },
  // mutations 하고 비슷한데, actions에 정의된 함수에서는 결국은 mutations에 정의한 함수를 커밋(commit)시켜서 state를 변경
  // 비동기 처리가 가능 mutations는 비동기 안됨..
  actions: {
    add({ commit }, item) {
      // 첫번째 피라미터로 context가 오는데 그 안에 있는 것만 사용하고자 한다면 그것만 사용가능, 두번째 파라미터에 넣고가 하는 것을 넣으면 죔
      // const {commit, state} = context
      // context.commit, context.state

      // 서버랑 통신. fetch, axios을 사용할 수 있음 add2 참고
      // mutations 안의 메소드 add를 커밋해서 데이터를 수정
      commit('add', item)

      // mutations에 정의된 함수가 없다면 state로 직접 커밋도 가능
      // 위 방법은 가능하지만 mutations의 함수를 커믹해서 state의 데이터를 수정하는 방법을 권장..
    }
    // add2: async ({ commit }, item) => {
    //   await fetch('', {})
    // }
  },
  modules: {}
}
// Vuex는 모든 컴포넌트를 위한 중앙 집중식 저장소를 제공해 준다.
// 중앙 저장소에 저장된 데이터는 쉽게 바꿀 수 있는게 아니고,
// 특정 함수(mutations, actions)를 통해서만 데이터 변경이 가능하고,
// 변경 상태를 관리할 수 있다.
