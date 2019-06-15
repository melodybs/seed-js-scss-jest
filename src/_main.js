import Vue from 'vue'
import App from './App.vue'
import router from './_router'
import store from './_store'
import './_registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
