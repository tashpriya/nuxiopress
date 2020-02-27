<template>
  <div class="nuxiopress-auth-view"></div>
</template>

<script>
import { Component, mixins } from 'nuxt-property-decorator';
import NuxioPress from '~~/nuxiopress/mixins/nuxiopress';

@Component({
  layout: 'app',
  middleware: ['guest']
})
export default class ForgotPassword extends mixins(NuxioPress) {
  data() {
    return {};
  }

  head() {
    return {
      title: 'Forgot Password',
      meta: [{ hid: '', name: '', content: '' }]
    };
  }
}
</script>
