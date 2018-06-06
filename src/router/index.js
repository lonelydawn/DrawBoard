import Vue from 'vue'
import Router from 'vue-router'
import Painter01 from '@/components/Painter01'
import Painter02 from '@/components/Painter02'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/01',
      name: 'Painter01',
      component: Painter01
    },
    {
      path: '/',
      name: 'Painter02',
      component: Painter02
    }
  ]
})
