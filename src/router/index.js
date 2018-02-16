import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = require('../components/Home.vue')
const CreateProduct = require('../components/CreateProduct.vue')

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'create_product',
      path: '/products/create',
      component: CreateProduct
    }
  ]
})