import Vue from 'vue'
import Router from 'vue-router'
import homepage from '../views/homepage'
import addPerson from '../components/addPerson'
import catalog from '../views/catalog'
import login from '../views/login'
import register from '../views/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: homepage
    },
    {
      path: '/addPerson',
      name: 'addPerson',
      component: addPerson
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: catalog,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
  ]
})
