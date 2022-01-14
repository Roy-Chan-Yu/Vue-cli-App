import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/components/DashBoard'
import Login from '@/components/pages/Login'
import Products from '@/components/Products'
import CustomerOrder from '@/components/pages/CustomerOrders';
import Coupons from '@/components/pages/Coupons';

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
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          // meta: { requiresAuth: true },
        }
      ]
    },
    {
      path: '/',
      name: 'DashBoard',
      component: DashBoard,
      children: [
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
      ]
    }
  ]
})
