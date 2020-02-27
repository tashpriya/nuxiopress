<template>
  <div class="nuxiopress-about"></div>
</template>

<script>
import { Component, mixins } from 'nuxt-property-decorator';
import NuxioPress from '~~/nuxiopress/mixins/nuxiopress';

@Component({
  layout: 'app'
})
export default class About extends mixins(NuxioPress) {}
</script>
