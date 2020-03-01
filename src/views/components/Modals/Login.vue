<template>

  <modal
    title="login"
    :modalShow="modalShow"
    :modalLoading="modalLoading"
    :closeInEvent="false"
    @close="close"
    @confirm="confirm"
    @sendForm="sendForm"
  >

    <template slot="body">
      <v-form
        @submit.prevent="confirm"
        ref="form"
        lazy-validation
      >
        <v-text-field
          v-model.trim="formData.email"
          :rules="rules.email"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model.trim="formData.password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          :rules="rules.password"
          name="password"
          :label="language.form.password"
          counter
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-form>
    </template>

    <template slot="subButtons">
      <div class="d-flex justify-center mb-2">
        <span class="mr-2">{{ language.modals.noAccount }}</span>

        <span
          class="font-weight-medium blue--text cursor-pointer"
          @click="showRegistrationModal"
        >{{ language.modals.singUp }}</span>
      </div>

      <div class="d-flex justify-center">
        <span class="mr-2">{{ language.modals.forgotPassword }}</span>

        <span
          @click="showForgotModal"
          class="font-weight-medium warning--text cursor-pointer"
        >{{ language.modals.passwordRecovery }}</span>
      </div>
    </template>
  </modal>

</template>

<script>
  import { mapActions } from 'vuex'
  import Modal from './../../components/Modal'
  import FormRules from './../../../mixins/form-rules'
  import ModalMethods from './../../../mixins/modal-methods'
  import FormReset from './../../../mixins/form-reset'

  export default {
    name: 'Login',

    mixins: [FormRules, ModalMethods, FormReset],

    props: {
      modalShow: {
        type: Boolean,
        default: false
      },
    },

    data: () => ({
      showPassword: false,
      formData: {
        email: '',
        password: '',
      }
    }),

    methods: {
      ...mapActions('auth', [
        'login'
      ]),

      sendForm() {
        this.setLoading(true);

        this.login({...this.formData})
          .then(() => {
            this.$router.push(this.route('admin.home'));
            const messageType = this.language.toasted['login-success'];
            this.$toasted.success(messageType);
            this.setLoading(false);
          })
          .catch(error => {
            console.log(error);
            const messageType = this.language.toasted[error.code];
            this.$toasted.error(messageType);
            this.setLoading(false);
          });
      },

      showRegistrationModal() {
        this.formReset();
        this.$emit('showRegistrationModal');
      },

      showForgotModal() {
        this.formReset();
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
