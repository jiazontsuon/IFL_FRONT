import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/user/users.vue'
import IFL_Paser from "../components/ifl_parser.vue"

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/parse' },
    {path: '/parse',component:IFL_Paser},
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users }
      ]
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // const strToken = window.sessionStorage.getItem('token')
  // if (!strToken) return next('/login')
  next()
})

export default router
