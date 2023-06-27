import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('../vue-component/home.vue') },
      { path: '/about', component: () => import('../vue-component/about.vue') },
      { path: '/child', component: () => import('../vue-component/qwik-child.vue') }
    ]
  })
}