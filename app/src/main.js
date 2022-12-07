import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueRouter);
Vue.use(Vuetify);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  vuetify: new Vuetify()
})
// new Vue({
//   render: h => h(App),
// }).$mount('#app');