import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component:  () => import( '@/views/index/index.vue')
  },
  {
    path:'/inspection',
    name:'inspection',
    component:  () => import( '@/views/inspection/inspection.vue')
  },
  {
    path:'/taskDetail/:id',
    name:'taskDetail',
    component:  () => import( '@/views/taskDetail/taskDetail.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
