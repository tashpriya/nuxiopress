<template>
  <div class="nuxiopress-home"></div>
</template>

<script>
import { Component, mixins } from 'nuxt-property-decorator';
import NuxioPress from '~~/nuxiopress/mixins/nuxiopress';

@Component({
  layout: 'app',
  middleware: 'auth'
})
export default class Home extends mixins(NuxioPress) {}
</script>
