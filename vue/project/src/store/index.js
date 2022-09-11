import { createStore } from 'vuex'
import { todo } from './todo'
import { user } from './user'
import persistedstate from 'vuex-persistedstate'

export default createStore({
  modules: {
    todo: todo,
    user: user
  },
  plugins: [persistedstate({ paths: ['todo.todos'] })] // 새로고침 하더라도 영구적으로 지정한 데이터는 보존해줌, 로컬스토리지에 저장된걸 확인할 수 있음
})

/*
  18-3.  store에 데이더가 2개 이상이 되면 복잡하고 관리가 어려워짐
  - todo작업한 데이터를 todo.js파일 생성 및 이동, 불필요한 피일 수정, export const todo로 지정
  - namespaced: true 추가
  - index.js에 todo 임포트, modules에 key:value 방식으로 todo 연결
*/
