<template>
  <div class="nuxiopress-auth-view">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-7">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title text-center">
                {{ $t('auth.sign_in_to_account') }}
              </h4>
              <!-- Social Login Links -->
              <div class="social-login-container text-center">
                <span class="link-item">
                  <a
                    v-tooltip="{ content: $t('auth.login_with_facebook') }"
                    href="javascript:void(0)"
                    @click.prevent="$auth.loginSocial('facebook')"
                  >
                    <font-awesome-icon :icon="['fab', 'facebook-f']" />
                  </a>
                </span>
                <span class="link-item">
                  <a
                    v-tooltip="{ content: $t('auth.login_with_google') }"
                    href="javascript:void(0)"
                    @click.prevent="$auth.loginSocial('google')"
                  >
                    <font-awesome-icon :icon="['fab', 'google-plus-g']" />
                  </a>
                </span>
                <span class="link-item">
                  <a
                    v-tooltip="{ content: $t('auth.login_with_github') }"
                    href="javascript:void(0)"
                    @click.prevent="$auth.loginSocial('github')"
                  >
                    <font-awesome-icon :icon="['fab', 'github']" />
                  </a>
                </span>
                <div class="email-login-text">
                  {{ $t('auth.or_use_email') }}
                </div>
              </div>

              <ValidationObserver
                ref="loginForm"
                v-slot="{ handleSubmit }"
                tag="div"
              >
                <form method="POST" @submit.prevent="handleSubmit(login)">
                  <!-- Email Field -- Start -->
                  <ValidationProvider
                    v-slot="{ errors, classes }"
                    :name="$t('auth.email')"
                    rules="required|email"
                    tag="div"
                  >
                    <div class="form-group" :class="classes">
                      <div class="floating-label">
                        <label for="authEmail">{{ $t('auth.email') }}</label>
                        <input
                          id="authEmail"
                          v-model="email"
                          type="email"
                          class="form-control"
                          :class="classes"
                          :placeholder="$t('auth.enter_email')"
                          autofocus
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </div>
                  </ValidationProvider>
                  <!-- Password Field -- Start -->
                  <ValidationProvider
                    v-slot="{ errors, classes }"
                    :name="$t('auth.password')"
                    rules="required|min:8"
                    tag="div"
                  >
                    <div class="form-group" :class="classes">
                      <div class="floating-label">
                        <label for="authPassword">
                          {{ $t('auth.password') }}
                        </label>
                        <input
                          id="authPassword"
                          v-model="password"
                          type="password"
                          class="form-control"
                          :class="classes"
                          :placeholder="$t('auth.enter_password')"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </div>
                  </ValidationProvider>
                  <!-- Remember Field -->
                  <div class="form-group row">
                    <div class="col-6">
                      <div class="form-check pt-2 pb-3 pl-0">
                        <div class="custom-control custom-checkbox">
                          <input
                            id="exampleCheck1"
                            type="checkbox"
                            class="custom-control-input"
                          />
                          <label
                            class="custom-control-label font-weight-bold"
                            for="exampleCheck1"
                          >
                            {{ $t('auth.remember_me') }}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-6 text-right font-weight-bold">
                      <nuxt-link
                        v-tooltip="{
                          content: $t('auth.request_password_reset')
                        }"
                        :to="localePath('password.request')"
                        class="d-inline-block pt-2 text-secondary"
                      >
                        {{ $t('auth.forgot_password') }}
                      </nuxt-link>
                    </div>
                  </div>

                  <div class="auth-action-btn">
                    <button
                      type="submit"
                      class="btn btn-info btn-theme text-uppercase"
                    >
                      {{ $t('auth.login') }}
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
          <!-- Footer Sign Up Link -->
          <div class="auth-form-footer">
            <span class="d-block">{{ $t('auth.not_registered') }}</span>
            <nuxt-link
              v-tooltip="{ content: $t('auth.become_member') }"
              :to="localePath('register')"
            >
              {{ $t('auth.register') }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, mixins } from 'nuxt-property-decorator';
import NuxioPress from '~~/nuxiopress/mixins/nuxiopress';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

@Component({
  layout: 'app',
  middleware: ['guest'],
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
export default class Login extends mixins(NuxioPress) {
  email = '';
  password = '';

  head() {
    let seoFriendlyMeta = this.$seoFriendlyMeta({
      title: this.$t('auth.login'),
      locale: this.$i18n.locale
    });
    return {
      title: this.$t('auth.login'),
      meta: [
        // your custom meta
        // { hid: '', name: '', content: '' },
        ...seoFriendlyMeta
      ]
    };
  }

  login() {
    this.$toast.show('Logging in...');
    this.$auth
      .login(this.email, this.password)
      .then(() => {
        this.$toast.success('Logged in successfully!');
        this.$router.push({ path: '/home' });
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>

<style lang="scss">
.nuxiopress-auth-view {
  .card {
    border-radius: 8px;
    .card-title {
      font-size: 1.8rem;
      font-weight: 600;
      color: $theme-color;
      margin-bottom: 40px;
      &:after {
        content: '';
        width: 70px;
        border-bottom: 4px solid $theme-color;
        display: block;
        position: relative;
        left: calc(50% - 35px);
        top: 15px;
      }
    }
    .card-body {
      padding: 50px 40px 40px;
    }
  }
  .auth-action-btn {
    position: absolute;
    width: 100%;
    text-align: center;
    left: 0;
    bottom: -25px;
    .btn-theme {
      width: 300px;
      padding: 18px;
      font-size: 16px;
      letter-spacing: 0.03em;
      border-radius: 25px;
    }
  }
  .auth-form-footer {
    text-align: center;
    margin-top: 45px;
    span {
      font-weight: 500;
      margin-bottom: 8px;
      color: #7e9cb3;
    }
    a {
      font-weight: 600;
      color: $theme-color;
      letter-spacing: 0.03em;
    }
  }
  .social-login-container {
    display: block;
    .link-item {
      display: inline-block;
      padding: 0 7px;
      a {
        display: inline-block;
        color: $primary-color;
        border: 2px solid rgba(206, 206, 206, 0.43);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        padding: 8px;
        font-size: 18px;
        &:hover,
        &:focus {
          background-color: $theme-color;
          color: #fff;
        }
      }
    }
    .email-login-text {
      padding: 30px 0 15px;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0.015em;
      color: rgba(126, 156, 179, 0.69);
    }
  }
}

@media screen and (max-width: 575px) {
  .nuxiopress-auth-view {
    .card .card-body {
      padding: 15px 15px 25px;
    }
  }
}
</style>
