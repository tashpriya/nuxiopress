<template>
  <div id="nuxiopress">
    <!-- NuxioPress Header Content -->
    <nuxiopress-header></nuxiopress-header>

    <!-- NuxioPress Main Content -->
    <main class="nuxiopress-content" :class="{ 'vh-100': currentRouteName === 'Index' }" id="NuxiopressMain" ref="nuxiopressMain">
      <nuxt/>
    </main>

    <!-- NuxioPress Footer Content -->
    <nuxiopress-footer></nuxiopress-footer>
  </div>
</template>

<script>
  import NuxiopressHeader from '~/components/common/NuxiopressHeader'
  import NuxiopressFooter from '~/components/common/NuxiopressFooter'

  export default {
    scrollToTop: true,
    components: {
      NuxiopressHeader,
      NuxiopressFooter
    },
    data () {
      return {

      }
    },
    computed: {
      currentRouteName () {
        return this.$route.name
      }
    }
  }
</script>

<style lang="scss">
  html {
    font-family: "Quicksand", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
  }
  .vh-100 {
    height: 100vh !important;
  }
  #__nuxt {
    min-height: 100vh;
    max-width: 100%;
    overflow-x: hidden;
  }
  #__layout, #nuxiopress {
    min-height: 100%;
  }
  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
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
</style>
