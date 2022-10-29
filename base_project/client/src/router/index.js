import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
  // {
  //   path: '/template/p1/single',
  //   name: 'SingleViewEditView',
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "template" */ '../views/template/p1/SingleViewEditView.vue'
  //     )
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
