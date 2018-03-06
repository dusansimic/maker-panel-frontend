// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import VueSession from 'vue-session'
import config from './config.json'
import moment from 'moment'
import VueMoment from 'vue-momentjs'
import Trend from 'vuetrend'

Vue.use(BootstrapVue)
Vue.use(VueSession)
Vue.use(VueMoment, moment)
Vue.use(Trend)

Vue.prototype.$config = config

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
