import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/databinding/string',
    name: 'DataBindingStringView',
    component: () =>
      import(
        /* webpackChunkName: "databinding", webpackPrefetch:true */ '../views/1_databinding/DataBindingStringView.vue'
      )
    // 4-1
  },
  {
    path: '/databinding/html',
    name: 'DataBindingHtmlView',
    component: () =>
      import(
        /* webpackChunkName: "databinding", webpackPrefetch:true */ '../views/1_databinding/DataBindingHtmlView.vue'
      )
    // 4-2
    // webpackChunkName: "databinding" 가 동일하면 둘 중 하나만 접속해도 다른 한 페이지의 데이터를 받아와 저장해줌, 로드하는 속도 절약,(그룹핑 가능)
    // 연관성이 있는 페이지들끼리 그룹핑을하며 라우터 설계하는 것이 중요
  },
  {
    path: '/databinding/input',
    name: 'DataBindingInputView',
    component: () =>
      import(
        /* webpackChunkName: "databinding", webpackPrefetch:true */ '../views/1_databinding/DataBindingInputView.vue'
      )
    // 4-3
  },
  {
    path: '/databinding/select',
    name: 'DataBindingSelectView',
    component: () =>
      import(
        /* webpackChunkName: "databinding", webpackPrefetch:true */ '../views/1_databinding/DataBindingSelectView.vue'
      )
  },
  {
    path: '/databinding/check',
    name: 'DataBindingCheckboxView',
    component: () =>
      import(
        /* webpackChunkName: "databinding", webpackPrefetch:true */ '../views/1_databinding/DataBindingCheckboxView.vue'
      )
  },
  {
    path: '/databinding/radio',
    name: 'DataBindingRadioView',
    component: () =>
      import(
        /* webpackChunkName: "databinding", webpackPrefetch:true */ '../views/1_databinding/DataBindingRadioView.vue'
      )
  },
  {
    path: '/databinding/attr',
    name: 'DataBindingAttributeView',
    component: () =>
      import(
        /* webpackChunkName: "databinding", webpackPrefetch:true */ '../views/1_databinding/DataBindingAttributeView.vue'
      )
  },
  {
    path: '/databinding/list',
    name: 'DataBindingListView',
    component: () =>
      import(
        /* webpackChunkName: "databinding", webpackPrefetch:true */ '../views/1_databinding/DataBindingListView.vue'
      )
  },
  {
    path: '/databinding/class',
    name: 'DataBindingClassView',
    component: () =>
      import(
        /* webpackChunkName: "databinding", webpackPrefetch:true */ '../views/1_databinding/DataBindingClassView.vue'
      )
  },
  {
    path: '/databinding/style',
    name: 'DataBindingStyleView',
    component: () =>
      import(
        /* webpackChunkName: "databinding", webpackPrefetch:true */ '../views/1_databinding/DataBindingStyleView.vue'
      )
  },
  {
    path: '/event/click',
    name: 'EventClickView',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/2_event/EventClickView.vue'
      )
  },
  {
    path: '/event/change',
    name: 'EventChangeView',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/2_event/EventChangeView.vue'
      )
  },
  {
    path: '/event/key',
    name: 'EventKeyView',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/2_event/EventKeyView.vue'
      )
  },
  {
    path: '/extra/if',
    name: 'RenderingIfView',
    component: () =>
      import(
        /* webpackChunkName: "extra", webpackPrefetch:true */ '../views/3_extra/RenderingIfView.vue'
      )
  },
  {
    path: '/extra/show',
    name: 'RenderingShowView',
    component: () =>
      import(
        /* webpackChunkName: "extra", webpackPrefetch:true */ '../views/3_extra/RenderingShowView.vue'
      )
  },
  {
    path: '/extra/computed',
    name: 'ComputedView',
    component: () =>
      import(
        /* webpackChunkName: "extra", webpackPrefetch:true */ '../views/3_extra/ComputedView.vue'
      )
  },
  {
    path: '/extra/watch',
    name: 'WatchView',
    component: () =>
      import(
        /* webpackChunkName: "extra", webpackPrefetch:true */ '../views/3_extra/WatchView.vue'
      )
  },
  {
    path: '/extra/lifecycle',
    name: 'LifecycleHookView',
    component: () =>
      import(
        /* webpackChunkName: "extra", webpackPrefetch:true */ '../views/3_extra/LifecycleHookView.vue'
      )
  },
  {
    path: '/reuse/pagetitle',
    name: 'PageView',
    component: () =>
      import(
        /* webpackChunkName: "reuse", webpackPrefetch:true */ '../views/4_reuse/PageView.vue'
      )
  },
  {
    path: '/reuse/parent',
    name: 'ParentView',
    component: () =>
      import(
        /* webpackChunkName: "reuse", webpackPrefetch:true */ '../views/4_reuse/ParentView.vue'
      )
  },
  {
    path: '/reuse/list',
    name: 'ListView',
    component: () =>
      import(
        /* webpackChunkName: "reuse", webpackPrefetch:true */ '../views/4_reuse/ListView.vue'
      )
  },
  {
    path: '/reuse/slot',
    name: 'SlotView',
    component: () =>
      import(
        /* webpackChunkName: "reuse", webpackPrefetch:true */ '../views/4_reuse/SlotView.vue'
      )
  },
  {
    path: '/advanced/provide',
    name: 'ProvideView',
    component: () =>
      import(
        /* webpackChunkName: "advanced", webpackPrefetch:true */ '../views/5_advanced/ProvideView.vue'
      )
  },
  {
    path: '/advanced/directive',
    name: 'CustomDirectiveView',
    component: () =>
      import(
        /* webpackChunkName: "advanced", webpackPrefetch:true */ '../views/5_advanced/CustomDirectiveView.vue'
      )
  },
  {
    path: '/advanced/mixin',
    name: 'MixinView',
    component: () =>
      import(
        /* webpackChunkName: "advanced", webpackPrefetch:true */ '../views/5_advanced/MixinView.vue'
      )
  },
  {
    path: '/advanced/plugin',
    name: 'PluginView',
    component: () =>
      import(
        /* webpackChunkName: "advanced", webpackPrefetch:true */ '../views/5_advanced/PluginView.vue'
      )
  },
  {
    path: '/vuex/todo',
    name: 'TodoView',
    component: () =>
      import(
        /* webpackChunkName: "vuex", webpackPrefetch:true */ '../views/6_vuex/TodoView.vue'
      )
  },
  {
    path: '/vuex/login',
    name: 'LoginView',
    component: () =>
      import(
        /* webpackChunkName: "vuex", webpackPrefetch:true */ '../views/6_vuex/LoginView.vue'
      )
  },
  {
    path: '/vuex/login',
    name: 'LoginView',
    component: () =>
      import(
        /* webpackChunkName: "vuex", webpackPrefetch:true */ '../views/6_vuex/LoginView.vue'
      )
  },
  {
    path: '/composition/setup',
    name: 'SetupView',
    component: () =>
      import(
        /* webpackChunkName: "composition", webpackPrefetch:true */ '../views/7_composition/SetupView.vue'
      )
  },
  {
    path: '/composition/ref',
    name: 'RefView',
    component: () =>
      import(
        /* webpackChunkName: "composition", webpackPrefetch:true */ '../views/7_composition/RefView.vue'
      )
  },
  {
    path: '/composition/func',
    name: 'FuncView',
    component: () =>
      import(
        /* webpackChunkName: "composition", webpackPrefetch:true */ '../views/7_composition/FuncView.vue'
      )
  },
  {
    path: '/login/kakao',
    name: 'KakaoLoginView',
    component: () =>
      import(
        /* webpackChunkName: "login", webpackPrefetch:true */ '../views/8_login/KakaoLoginView.vue'
      )
  },
  {
    path: '/login/main',
    name: 'MainView',
    component: () =>
      import(
        /* webpackChunkName: "login", webpackPrefetch:true */ '../views/8_login/MainView.vue'
      )
  },
  {
    path: '/login/naver',
    name: 'NaverLoginView',
    component: () =>
      import(
        /* webpackChunkName: "login", webpackPrefetch:true */ '../views/8_login/NaverLoginView.vue'
      )
  },
  {
    path: '/module/postcode',
    name: 'DaumPostcodeView',
    component: () =>
      import(
        /* webpackChunkName: "module", webpackPrefetch:true */ '../views/9_module/DaumPostcodeView.vue'
      )
  },
  {
    path: '/module/map',
    name: 'KakaoMapView',
    component: () =>
      import(
        /* webpackChunkName: "module", webpackPrefetch:true */ '../views/9_module/KakaoMapView.vue'
      )
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

// 3강
//  - path : key,
//  - name : 브라우저의 독립적인 패스, 독립적인 ui로 작동가능한 모든 페이지, 유일한 값을 가짐(동일값 x)
//  - component : path로 접근했을 때 불러올(연결할) 페이지 이름, 정보
//  - vue파일은 배포하면 자바스크립트 파일로 연결
//   - chunk-vendors.js : 설정한 모듈에 대한 정보가 포함되어 있다.
//   - app.js : 페이지에 관련 js파일이 포함되어 있다.
//   - component: () => import(/* webpackChunkName: "about" * '../views/AboutView.vue') 로 설정하면 about.js 파일이 생성되어 관련 소스들이 기재됨
// - 코딩규칙으로 오류 발생
//  - 프로그램의 프리터 설정과, 뷰 설치시 지정한 코딩규칙과의 충돌발생 -> 설정변경
//  // .prettierrc
//  {
//   "semi": false, 세미콜론 사용안함
//   "bracketSpacing": true,
//   "singleQuote": true, 싱글쿼터
//   "useTabs": false,
//   "trailingComma": "none",
//   "printWidth": 80
// }
// // package.json
// "eslintConfig" : 코딩큐칙
// "rules": { "space-before-function-paren": "off" } 추가 함수명과 () 가 기본이였으나 함수명()으로 수정, 안쓰겟다 설정
// { path: '/databinding/string', name: 'DataBindingString', component: () => import(/* webpackPrefetch:true, webpackChunkName: "databinding" */ '../views/1_databinding/DataBindingString.vue') }
// prefetch 기능
// - 웹 앱 접속시 캐시로 미리 다운로드하고, 사용자가 해당 메뉴 접속시 미리 다운로드 한 화면을 가져 옴.
// - 미래에 사용될 것이라고 예상되는 리소스들을 prefetch해야함.
// - 브라우저는 미래에 사용될 리소스들을 가져와 캐시에 저장. 저장해두었다 필요시 바로 사용할 수 있어서 속도 절약, 사용가능성이 높은 데이터를 저장하도록 함(가져오는 시간이 캐시가 소요되어서 설계를 잘 해야함.)(prefetch삭제 설정: vue.config.js)
// - https://github.com/thegreat-jeremy/bootcamp003/issues/34 끝나고 읽어보쟙

// 성능향상을 위한 라우팅 화면설계: 바인딩 방법에 따라 선택
// 1. 무조건 접속이 필요한 페이지는 { path: '/', name: 'home',  component: HomeView }으로 연결
// 2. 나중에 받아와도 무방한 소스, 접속빈도가 낮은 페이지 webpackPrefetch:true 빼고 사용
// 3. 사용가능성이 높거나 무거운 페이지워서 미리 가져오면 좋은 페이지는 webpackPrefetch:true, 추가 설정
