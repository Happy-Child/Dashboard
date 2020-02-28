<template>

  <modal
    title="Password recovery"
    :customButton="true"
    :modalShow="modalShow"
    :modalLoading="modalLoading"
    confirmButtonText="Reset the password"
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

  export default {
    name: 'Registration',

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
      userData: {
        email: '',
      }
    }),

    methods: {
      ...mapActions('auth', [
        'forgotPassword',
      ]),

      validateForm () {
        if (this.$refs.form.validate()) {
          this.setLoading(true);
          this.sendForm();
        }
      },

      close() {
        this.$emit('close');
      },

      confirm() {
        this.validateForm();
      },

      sendForm() {
        this.forgotPassword(this.userData.email)
          .then(() => {
            this.userData.email = '';
            this.$toasted.success(this.$messages['forgot-password-success']);
            this.setLoading(false);
          })
          .catch(error => {
            console.log(error);
            this.setLoading(false);
          })
      },

      setLoading(status) {
        this.modalLoading = status;
      },

      showLoginModal() {
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
