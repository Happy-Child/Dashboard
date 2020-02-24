<template>

  <v-row justify="center">
    <v-dialog v-model.trim="modal" persistent max-width="600px">
      <v-card>

        <v-card-title>
          <span class="headline">
            {{ title }}
          </span>
        </v-card-title>

        <v-card-text>
          <v-form
            ref="form"
            v-model.trim="formValid"
            lazy-validation
          >
            <v-text-field
              v-if="type === 'registration'"
              v-model.trim="userData.name"
              :counter="20"
              :rules="rules.name"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model.trim="userData.email"
              :rules="rules.email"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-if="type === 'registration'"
              v-model.trim="userData.bill"
              :rules="rules.bill"
              label="Bill"
              prefix="$"
              required
              type="number"
            ></v-text-field>

            <v-text-field
              v-model.trim="userData.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :rules="[rules.password.required, rules.password.min]"
              name="password"
              label="Password"
              counter
              @click:append="showPassword = !showPassword"
            ></v-text-field>

            <v-checkbox
              v-if="type === 'registration'"
              v-model.trim="userData.agree"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="I agree to the processing of data."
              required
            ></v-checkbox>

            <v-btn
              color="success d-block form-btn mt-4"
              @click="validateForm"
              :loading="loginLoading"
              large
            >
              Submit
            </v-btn>

          </v-form>
        </v-card-text>

        <v-card-text class="body-2 d-flex align-center justify-center">
          <template v-if="type === 'login'">
            <span class="mr-2">No account?</span>

            <router-link
              :to="route('registration')"
              class="font-weight-medium"
            >Sign up</router-link>
          </template>

          <template v-else>
            <span class="mr-2">Have an account?</span>

            <router-link
              :to="route('login')"
              class="font-weight-medium"
            >Sign in</router-link>
          </template>
        </v-card-text>

      </v-card>
    </v-dialog>
  </v-row>

</template>

<script>
  import { mapActions } from 'vuex'
  import regValidation from './../../utils/reg-validation'

  export default {
    name: "Modal",

    props: {
      title: {
        type: String,
        default: "Modal"
      },
      type: {
        type: String,
        required: true
      }
    },

    data: () => ({
      loginLoading: false,
      modal: true,
      formValid: true,
      showPassword: false,
      userData: {
        name: '',
        email: '',
        bill: 1000,
        password: '',
        agree: false
      },
      rules: {
        name: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 20) || 'Name must be less than 20 characters',
        ],
        email: [
          v => !!v || 'E-mail is required',
          v => regValidation.email.test(v) || 'E-mail must be valid',
        ],
        bill: [
          v => !!v || 'Bill is required',
          v => (v && v >= 100) || 'Bill must be no less than 100$',
        ],
        password: {
          required: value => !!value || 'Password is required',
          min: v => v.length >= 8 || 'Min 8 characters'
        }
      }
    }),

    methods: {
      ...mapActions('auth', [
        'login',
        'registration',
      ]),

      validateForm () {
        if (this.$refs.form.validate()) {
          this.loginLoading = true;

          if (this.type === 'login') this.startLogin();
          else if(this.type === 'registration') this.startRegistration();
        }
      },

      startLogin() {
        this.login(this.userData)
          .then(data => {
            this.$router.push(this.route('admin.home'));
            this.$toasted.success(this.$messages['login-success']);
            this.loginLoading = false;
          })
          .catch(error => {
            this.loginLoading = false;
          });
      },

      startRegistration() {
        this.registration(this.userData)
          .then(data => {
            this.$router.push(this.route('login'));
            this.$toasted.success(this.$messages['registration-success']);
            this.loginLoading = false;
          })
          .catch(error => {
            this.loginLoading = false;
          })
      }

    }
  }
</script>