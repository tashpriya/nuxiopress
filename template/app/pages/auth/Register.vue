<template>
  <div class="nuxiopress-auth-view">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-7">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title text-center">
                {{ $t('auth.register') }}
              </h4>
              <!-- Social Login Links -->
              <div class="social-login-container text-center">
                <span class="link-item">
                  <a
                    v-tooltip="{ content: $t('auth.register_with_facebook') }"
                    href="#"
                  >
                    <font-awesome-icon :icon="['fab', 'facebook-f']" />
                  </a>
                </span>
                <span class="link-item">
                  <a
                    v-tooltip="{ content: $t('auth.register_with_google') }"
                    href="#"
                  >
                    <font-awesome-icon :icon="['fab', 'google-plus-g']" />
                  </a>
                </span>
                <span class="link-item">
                  <a
                    v-tooltip="{ content: $t('auth.register_with_github') }"
                    href="#"
                  >
                    <font-awesome-icon :icon="['fab', 'github']" />
                  </a>
                </span>
                <div class="email-login-text">
                  {{ $t('auth.or_use_email') }}
                </div>
              </div>

              <ValidationObserver
                ref="registrationForm"
                v-slot="{ invalid, untouched, handleSubmit }"
                tag="div"
              >
                <form method="POST" @submit.prevent="handleSubmit(register)">
                  <div class="row">
                    <div class="col-md-6">
                      <!-- First Name Field -- Start -->
                      <ValidationProvider
                        v-slot="{ errors, classes }"
                        :name="$t('auth.first_name')"
                        rules="required|alpha_spaces|min:4"
                        tag="div"
                        vid="name"
                      >
                        <div class="form-group" :class="classes">
                          <div class="floating-label">
                            <label for="authFirstName">
                              {{ $t('auth.first_name') }}
                            </label>
                            <input
                              id="authFirstName"
                              v-model="first_name"
                              type="text"
                              class="form-control"
                              :class="classes"
                              :placeholder="$t('auth.enter_first_name')"
                              autofocus
                            />
                            <span class="invalid-feedback">{{
                              errors[0]
                            }}</span>
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <!-- Last Name Field -- Start -->
                      <ValidationProvider
                        v-slot="{ errors, classes }"
                        :name="$t('auth.last_name')"
                        rules="required|alpha_spaces|min:4"
                        tag="div"
                        vid="name"
                      >
                        <div class="form-group" :class="classes">
                          <div class="floating-label">
                            <label for="authLastName">
                              {{ $t('auth.last_name') }}
                            </label>
                            <input
                              id="authLastName"
                              v-model="last_name"
                              type="text"
                              class="form-control"
                              :class="classes"
                              :placeholder="$t('auth.enter_last_name')"
                            />
                            <span class="invalid-feedback">{{
                              errors[0]
                            }}</span>
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>

                  <!-- Email Field -- Start -->
                  <ValidationProvider
                    v-slot="{ errors, classes }"
                    :name="$t('auth.email')"
                    rules="required|email"
                    tag="div"
                    vid="email"
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
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </div>
                  </ValidationProvider>
                  <!-- Password Field -- Start -->
                  <ValidationProvider
                    v-slot="{ errors, classes }"
                    :name="$t('auth.password')"
                    rules="required|min:8|confirmed:password_confirmation"
                    tag="div"
                    vid="password"
                  >
                    <div class="form-group" :class="classes">
                      <div class="floating-label">
                        <label for="authPassword">{{
                          $t('auth.password')
                        }}</label>
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

                  <!-- Password Confirmation Field -- Start -->
                  <ValidationProvider
                    v-slot="{ errors, classes }"
                    :name="$t('auth.password_confirmation')"
                    rules="required|min:8"
                    vid="password_confirmation"
                    tag="div"
                  >
                    <div class="form-group" :class="classes">
                      <div class="floating-label">
                        <label for="authPasswordConf">{{
                          $t('auth.password_confirmation')
                        }}</label>
                        <input
                          id="authPasswordConf"
                          v-model="password_confirmation"
                          type="password"
                          class="form-control"
                          :class="classes"
                          :placeholder="$t('auth.enter_password_confirmation')"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </div>
                  </ValidationProvider>

                  <div class="auth-action-btn">
                    <button
                      type="submit"
                      class="btn btn-info btn-theme"
                      :disabled="invalid || untouched || submitting"
                    >
                      {{ $t('auth.register') }}
                      <font-awesome-icon
                        v-if="submitting"
                        :icon="['fas', 'spinner']"
                        pulse
                      />
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
          <!-- Footer Sign Up Link -->
          <div class="auth-form-footer">
            <span class="d-block">{{ $t('auth.already_registered') }}</span>
            <nuxt-link
              v-tooltip="{ content: 'Click to Login' }"
              :to="localePath('login')"
            >
              {{ $t('auth.login') }}
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
export default class Register extends mixins(NuxioPress) {
  first_name = '';
  last_name = '';
  email = '';
  password = '';
  password_confirmation = '';

  submitting = false;

  register() {
    this.submitting = true;
    this.$toast.show('Registering...');
    this.$auth
      .register({
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password
      })
      .then(
        // eslint-disable-next-line no-unused-vars
        res => {
          this.submitting = false;
          this.$showSuccessToast('Successfully registered & logged in!');
          this.$router.push({ path: '/home' });
        },
        error => {
          const status = error.status;
          if (status === 422) {
            this.$showInvalidToast();
            // eslint-disable-next-line no-prototype-builtins
            const errors = error.data.hasOwnProperty('errors')
              ? error.data.errors
              : {};
            this.$refs.registrationForm.setErrors(errors);
          } else {
            this.$showErrorToast();
          }
          this.submitting = false;
        }
      );
  }

  head() {
    let seoFriendlyMeta = this.$seoFriendlyMeta({
      title: this.$t('auth.register'),
      locale: this.$i18n.locale
    });
    return {
      title: this.$t('auth.register'),
      meta: [
        // your custom meta
        // { hid: '', name: '', content: '' },
        ...seoFriendlyMeta
      ]
    };
  }

  created() {
    /*
     * Here You can change you api url for registering user
     */
    // this.apiUrl = '/api/auth/register';
  }
}
</script>
