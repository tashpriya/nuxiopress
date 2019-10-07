import Vue from 'vue'
import Router from 'vue-router'
import { scrollBehavior } from '~/utils/router'

import Index from '~/pages/Index'

Vue.use(Router)

const routes = [
  { path: '/', name: 'Index', component: Index }
]

export function createRouter () {
  return new Router({
    mode: 'history',
    routes,
    scrollBehavior
  })
}
