import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: ()=>import('@/views/display')
    },
    {

      path:'/main',
      name:'main',
      component:()=> import('@/views/index')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
