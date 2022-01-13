import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/components/DashBoard'
import Login from '@/components/pages/Login'
import Products from '@/components/Products'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'HelloWorld',
      component: DashBoard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
