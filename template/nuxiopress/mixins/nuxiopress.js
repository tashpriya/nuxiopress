import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class NuxioPress extends Vue {
  /**
   * This define the name of the app
   * @type {string}
   */
  appName = process.env.APP_NAME || 'nuxiopress';
}
