<template>
  <header
    id="NuxiopressHeader"
    ref="nuxiopressHeader"
    class="nuxiopress-header"
  >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <nuxt-link class="navbar-brand" :to="localePath('index')">
        <img :src="headerLogo" :alt="appName" />
      </nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto"></ul>

        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              id="localeDropdown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <font-awesome-icon :icon="['fas', 'globe']" />
              {{ currentLocale.name }}
            </a>
            <div class="dropdown-menu" aria-labelledby="localeDropdown">
              <nuxt-link
                v-for="locale in availableLocales"
                :key="locale.code"
                :to="switchLocalePath(locale.code)"
                class="dropdown-item"
                :class="{ 'bengali-font': locale.code === 'bn' }"
              >
                {{ locale.name }}
              </nuxt-link>
            </div>
          </li>
          <li
            v-if="
              !$auth.check() && $route.name !== 'login___' + currentLocale.code
            "
            class="nav-item"
          >
            <nuxt-link class="nav-link" :to="localePath('login')">
              {{ $t('auth.login') }}
            </nuxt-link>
          </li>
          <li
            v-if="
              !$auth.check() && $route.name === 'login___' + currentLocale.code
            "
            class="nav-item"
          >
            <nuxt-link class="nav-link" :to="localePath('register')">
              {{ $t('auth.register') }}
            </nuxt-link>
          </li>
          <li v-if="$auth.check()" class="nav-item dropdown">
            <a
              id="navbarDropdown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Account
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item disabled" href="#">Profile</a>
              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item"
                href="javascript:void(0)"
                @click.prevent="logout"
                >Logout</a
              >
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { Component, Vue, State } from 'nuxt-property-decorator';

@Component
export default class NuxiopressHeader extends Vue {
  @State appName;

  get headerLogo() {
    return this.$ua.isFromMobilephone() || this.$ua.isFromSmartphone()
      ? '/images/logos/nuxiopress.png'
      : '/images/logos/nuxiopress-horizontal.png';
  }

  get availableLocales() {
    return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
  }

  get currentLocale() {
    return this.$i18n.locales.find(locale => locale.code === this.$i18n.locale);
  }

  async logout() {
    this.$toast.show('Logging out...');
    await this.$auth.logout();
  }

  mounted() {}
}
</script>

<style lang="scss">
.navbar-brand > img {
  max-height: 45px;
}
</style>
