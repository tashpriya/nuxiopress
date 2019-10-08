import Vue from 'vue';
import Router from 'vue-router';
import { scrollBehavior } from '~/utils/router';

import Index from '~/pages/Index';
import About from '~/pages/About';

Vue.use(Router);

const routes = [
  { path: '/', name: 'Index', component: Index },
  { path: '/about', name: 'About', component: About }
];

export function createRouter() {
  return new Router({
    mode: 'history',
    routes,
    scrollBehavior
  });
}
