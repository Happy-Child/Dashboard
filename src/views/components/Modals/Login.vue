<template>

  <modal
    title="Login"
    :modalShow="modalShow"
    :modalLoading="modalLoading"
    confirmButtonText="Login"
    :closeInEvent="false"
    @changeLoading="setLoading"
    @close="close"
    @confirm="confirm"
    @sendForm="sendForm"
  >
    <template slot="body">
      <v-form
        ref="form"
        v-model.trim="formValid"
        lazy-validation
      >
        <v-text-field
          v-model.trim="userData.email"
          :rules="rules.email"
          label="E-mail"
          required
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
      </v-form>
    </template>

    <template slot="subButtons">
      <div class="d-flex justify-center mb-2">
        <span class="mr-2">No account?</span>

        <span
          class="font-weight-medium blue--text cursor-pointer"
          @click="showRegistrationModal"
        >Sign up</span>
      </div>

      <div class="d-flex justify-center">
        <span class="mr-2">Forgot password?</span>

        <span
          @click="showForgotModal"
          class="font-weight-medium warning--text cursor-pointer"
        >Password recovery</span>
      </div>
    </template>
  </modal>

</template>

<script>
  import { mapActions } from 'vuex'
  import Modal from './../../components/Modal'
  import FormRules from './../../../mixins/form-rules'

  export default {
    name: 'Login',

    mixins: [FormRules],

    props: {
      modalShow: {
        type: Boolean,
        default: false
      },
    },

    data: () => ({
      modalLoading: false,
      formValid: true,
      showPassword: false,
      userData: {
        email: '',
        password: '',
      }
    }),

    methods: {
      ...mapActions('auth', [
        'login'
      ]),

      validateForm () {
        if (this.$refs.form.validate()) {
          this.setLoading(true);
          this.sendForm();
        }
      },

      setLoading(status) {
        this.modalLoading = status;
      },

      close() {
        this.$emit('close');
      },

      confirm() {
        this.validateForm();
      },

      sendForm() {
        this.login(this.userData)
          .then(() => {
            this.$router.push(this.route('admin.home'));
            this.$toasted.success(this.$messages['login-success']);
            this.setLoading(false);
          })
          .catch(error => {
            console.log(error);
            this.setLoading(false);
          });
      },

      showRegistrationModal() {
        this.$emit('showRegistrationModal');
      },

      showForgotModal() {
        this.$emit('showForgotModal');
      }
    },

    computed: {

    },

    components: {
      Modal
    }
  }
</script>
