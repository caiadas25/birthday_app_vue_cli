import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/views/homepage'
import addPerson from '@/components/addPerson'
import catalog from '@/views/catalog'


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
      path: '/:catalog',
      name: 'catalog',
      component: catalog,
    }
  ]
})
