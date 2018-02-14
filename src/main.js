import Vue from 'vue'
import router from './router'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import VueGoodTable from 'vue-good-table'
Vue.use(VueGoodTable)

import App from './App.vue'

new Vue(Vue.util.extend({ router }, App)).$mount('#app');