import Vue from 'vue'
import Router from 'vue-router'
import DrawBoard from '@/components/DrawBoard'
import BaseShape from '@/components/BaseShape'
import Beizer from '@/components/Beizer'
import PreserveAspect from '@/components/PreserveAspect'
import SlientNight from '@/components/SlientNight'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DrawBoard',
      component: DrawBoard
    },
    {
      path: '/base',
      name: 'BaseShape',
      component: BaseShape
    },
    {
      path: '/beizer',
      name: 'Beizer',
      component: Beizer
    },
    {
      path: '/aspect',
      name: 'PreserveAspect',
      component: PreserveAspect
    },
    {
      path: '/night',
      name: 'SlientNight',
      component: SlientNight
    }
  ]
})
