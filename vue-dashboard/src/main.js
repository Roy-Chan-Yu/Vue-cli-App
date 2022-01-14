// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate from 'vee-validate';
import './bus'
import currencyFilter from './filters/currency';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.component('Loading',Loading);
Vue.filter('currency',currencyFilter);

Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW',zhTWValidate);

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.$ajax = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  
});

router.beforeEach((to, from, next) => {
  console.log(to,from, next);

  if (to.meta.requiresAuth) {
    console.log(`需要驗證`);
    const api = `${process.env.APIPATH}/api/user/check`;
    // if (Cookies.get('login')){
    //     this.$router.push({name: '/'})
    // }
    const vm = this;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
        // Cookies.set('login','success')
      } else {
        next({  
          path: '/login',
        })
      }
    })

  } else {
    next();
  }
  next();
});
