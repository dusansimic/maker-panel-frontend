import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ApplicationView from '@/components/ApplicationView'
import DeviceView from '@/components/DeviceView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/application',
      name: 'Application View',
      component: ApplicationView
    },
    {
      path: '/application/device',
      name: 'Device View',
      component: DeviceView
    }
  ]
})
