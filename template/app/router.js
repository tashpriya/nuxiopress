import Vue from 'vue';
import Router from 'vue-router';
import { scrollBehavior } from '~~/nuxiopress/utils/index';
import i18nConfig from './config/i18n';

// Route Components
import Index from '~/pages/Index';
import About from '~/pages/About';
// Auth Route Components
import Login from '~/pages/auth/Login';
import Register from '~/pages/auth/Register';
import ForgotPassword from '~/pages/auth/ForgotPassword';
// Authenticated Route Components
import Home from '~/pages/authenticated/Home';

Vue.use(Router);

const baseRoutes = [
  { path: '/', name: 'index', component: Index },
  { path: '/about', name: 'about', component: About },

  // Authenticated Route
  { path: '/home', name: 'home', component: Home },

  // Auth Routes
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  {
    path: '/forgot-password',
    name: 'password.request',
    component: ForgotPassword
  }
];

/**
 * Check if the argument localeCode is configured as the App default locale.
 *
 * @param localeCode
 * @returns {boolean}
 */
const isDefaultLocale = localeCode => localeCode === i18nConfig.defaultLocale;

/*
 * Generate a localized route for a generic, non-localized route.
 * Handles route children recursively.
 *
 */
const createLocalizedRoute = (route, locale) => {
  let routeName = `${route.name}___${locale.code}`;
  let routePath = `${route.path}`;

  if (!isDefaultLocale(locale.code)) {
    routePath = `/${locale.code}${route.path}`;
  }
  const localizedRoute = {
    ...route,
    path: routePath,
    name: routeName
  };
  if (route.children && route.children.length) {
    localizedRoute.children = route.children.map(childRoute =>
      createLocalizedRoute(childRoute, locale)
    );
  }
  return localizedRoute;
};
/*
 * Generate all localized routes.
 *
 */
const createLocalizedRoutes = (routes, locales) => {
  return routes.reduce((i18nRoutes, route) => {
    locales.forEach(locale => {
      i18nRoutes.push(createLocalizedRoute(route, locale));
    });
    return i18nRoutes;
  }, []);
};

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: createLocalizedRoutes(baseRoutes, i18nConfig.locales),
    scrollBehavior
  });
}
