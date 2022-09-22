/* eslint-disable */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './mixins'
import i18nPlugin from './plugins/i18n'
import en from './i18n/en'
import ko from './i18n/ko'
import PageTitle from './components/fragments/PageTitle.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faUserClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueGoodTablePlugin from 'vue-good-table-next'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import VueApexCharts from 'vue3-apexcharts'

import 'vue-good-table-next/dist/vue-good-table-next.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

library.add(faUserSecret)
library.add(faUserClock) // 사용할 아이콘이름을 라이브러리에 넣고 사용하겠단 의미

const i18nStrings = { en, ko }

const app = createApp(App)
app.use(store)
app.use(router)
app.mixin(mixin)
app.component('page-title', PageTitle)
app.component('font-awesome-icon', FontAwesomeIcon) // FontAwesomeIcon을 vue컴포넌트로 사용하겠다 의미
app.use(i18nPlugin, i18nStrings)
app.use(VueSweetalert2)
app.use(VueLoading)
app.use(VueGoodTablePlugin)
app.use(VueApexCharts)

app.directive('focus', {
  mounted(el, binding) {
    console.log(el)
    el.focus()
  }
})

app.directive('lowercase', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      console.log(event.target.value)
      event.target.value = event.target.value.toLowerCase()
    })
  }
})

app.directive('uppercase', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      console.log(event.target.value)
      event.target.value = event.target.value.toUpperCase()
    })
  }
})
app.directive('number', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      console.log(event.target.value)
      event.target.value = event.target.value.replace(/\D/g, '')
    })
  }
})

app.directive('korean', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      console.log(event.target.value)
      event.target.value = event.target.value.replace(
        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,
        ''
      )
    })
  }
})

app.mount('#app')
window.Kakao.init('b7378d7155a075f129d4cfeb94bf41d3')
