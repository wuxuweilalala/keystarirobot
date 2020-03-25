import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Table ,TableColumn,Progress,Switch,Pagination,Select,Option,  Carousel, CarouselItem,Checkbox } from 'element-ui'
import  'element-ui/lib/theme-chalk/index.css'
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Progress);
Vue.use(Switch);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Checkbox);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')