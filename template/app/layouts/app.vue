<template>
  <div id="app" :class="fontCssClass">
    <!-- NuxioPress Header Content -->
    <NuxiopressHeader />

    <!-- NuxioPress Main Content -->
    <main
      id="NuxiopressMain"
      ref="nuxiopressMain"
      class="nuxiopress-content"
      :class="'mt-5'"
    >
      <nuxt />
    </main>

    <!-- NuxioPress Footer Content -->
    <NuxiopressFooter />
  </div>
</template>

<script>
import { Component, Vue, State } from 'nuxt-property-decorator';
import NuxiopressHeader from '~/components/common/NuxiopressHeader';
import NuxiopressFooter from '~/components/common/NuxiopressFooter';
import { localize } from 'vee-validate';

@Component({
  components: {
    NuxiopressHeader,
    NuxiopressFooter
  }
})
export default class App extends Vue {
  title = process.env.APP_NAME;

  @State appName;

  get currentRouteName() {
    return this.$route.name;
  }

  get fontCssClass() {
    switch (this.$i18n.locale) {
      case 'en':
        return 'default-font';
      case 'bn':
        return 'bengali-font';
      default:
        return 'default-font';
    }
  }

  created() {
    localize(this.$i18n.locale);
  }

  head() {
    return this.$nuxtI18nSeo();
  }

  scrollToTop() {
    return true;
  }
}
</script>

<style lang="scss">
.default-font {
  font-family: 'Roboto', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
}

.bengali-font {
  font-family: 'SolaimanLipi', 'Roboto', 'Source Sans Pro', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid $theme-color;
  color: $theme-color;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
@media screen and (max-width: 575px) {
  .nuxiopress-content {
    margin-top: 1.5rem !important;
  }
}
</style>
