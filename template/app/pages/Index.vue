<template>
  <div class="nuxiopress-index text-center row h-100">
    <div class="col-12 my-auto">
      <div class="NuxioPressLogo">
        <nuxt-link :to="localePath('index')">
          <img src="/images/logos/nuxiopress.png" :alt="title" />
        </nuxt-link>
      </div>

      <h1 class="title">
        {{ title }}
      </h1>

      <h2 class="subtitle">
        A Nuxt PWA starter template with Encrypted Cookies, Express.js, Axios,
        Vue Router, Passport.js.
      </h2>

      <div :class="['network', online ? 'online' : 'offline']">
        <div class="circle"></div>
        {{ online ? 'online' : 'offline' }}
      </div>

      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
          rel="noopener"
          >Documentation</a
        >
        <a
          href="https://github.com/RightBrainTechBD/nuxiopress"
          target="_blank"
          class="button--grey"
          rel="noopener"
          >GitHub</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Component, mixins } from 'nuxt-property-decorator';
import NuxioPress from '~~/nuxiopress/mixins/nuxiopress';

@Component({
  layout: 'app'
})
export default class Index extends mixins(NuxioPress) {
  data() {
    return {
      title: process.env.APP_NAME,
      online: true
    };
  }

  // Methods Start
  _toggleNetworkStatus({ type }) {
    this.online = type === 'online';
  }
  // Methods End

  mounted() {
    if (!window.navigator) {
      this.online = false;
      return;
    }
    this.online = Boolean(window.navigator.onLine);
    window.addEventListener('offline', this._toggleNetworkStatus);
    window.addEventListener('online', this._toggleNetworkStatus);
  }
  destroyed() {
    window.removeEventListener('offline', this._toggleNetworkStatus);
    window.removeEventListener('online', this._toggleNetworkStatus);
  }
  head() {
    return {
      meta: [{ hid: '', name: '', content: '' }]
    };
  }
}
</script>

<style lang="scss">
.NuxioPressLogo {
  display: inline-block;
  animation: turn 2s linear forwards 1s;
  transform: rotateX(180deg);
  position: relative;
  overflow: hidden;
  img {
    max-width: 320px;
  }
}

@keyframes turn {
  100% {
    transform: rotateX(0deg);
  }
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: $primary-color;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 400;
  font-size: 24px;
  color: #526488;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.network {
  font-weight: 400;
  font-size: 1rem;
}

.network .circle {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: green;
  padding: 0.1rem 0.5rem;
  border-radius: 1rem;
}

.network.offline .circle {
  background: red;
}

@media screen and (max-width: 575px) {
  .title {
    font-size: 55px;
  }
  .subtitle {
    font-size: 16px;
    padding: 0 15px 15px;
  }
  .NuxioPressLogo img {
    max-width: 190px;
  }
}
</style>
