<template>

  <modal
    title="Password recovery"
    :customButton="true"
    :modalShow="modalShow"
    :modalLoading="modalLoading"
    confirmButtonText="Reset the password"
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
      </v-form>
    </template>

    <template slot="customButton">
      <v-btn
        class="modal-btn"
        color="danger"
        @click="showLoginModal"
        large
      >Back</v-btn>
    </template>
  </modal>

</template>

<script>
  import { mapActions } from 'vuex'
  import Modal from './../../components/Modal'
  import FormRules from './../../../mixins/form-rules'
  import ModalMethods from './../../../mixins/modal-methods'
  import FormReset from './../../../mixins/form-reset'
  import ResetPassword from './../../../mixins/reset-password'

  export default {
    name: 'ForgotPassword',

    mixins: [FormRules, ModalMethods, FormReset, ResetPassword],

    props: {
      modalShow: {
        type: Boolean,
        default: false
      },
    },

    data: () => ({
      formData: {
        email: '',
      }
    }),

    methods: {
      ...mapActions('auth', [
        'forgotPassword',
      ]),

      sendForm() {
        this.resetPassword()
          .then(() => {
            this.formReset();
          });
      },

      showLoginModal() {
        this.formReset();
        this.$emit('showLoginModal');
      }
    },

    computed: {

    },

    components: {
      Modal
    }

  }
</script>
