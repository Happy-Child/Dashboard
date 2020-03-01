<template>

  <modal
    title="registration"
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
          v-model.trim="formData.name"
          :counter="20"
          :rules="rules.name"
          :label="language.form.name"
          required
        ></v-text-field>

        <v-text-field
          v-model.trim="formData.email"
          :rules="rules.email"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model.trim="formData.bill"
          :rules="rules.bill"
          :label="language.form.bill"
          prefix="$"
          required
          type="number"
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

        <v-checkbox
          v-model.trim="formData.agree"
          :rules="rules.checkbox"
          :label="language.form.processingData"
          required
        ></v-checkbox>
      </v-form>
    </template>

    <template slot="subButtons">
      <div class="flex">
        <span class="mr-2">{{ language.modals.haveAnAccount }}</span>

        <span
          @click="showLoginModal"
          class="font-weight-medium blue--text cursor-pointer"
        >{{ language.modals.singIn }}</span>
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
    name: 'Registration',

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
        name: '',
        email: '',
        bill: '',
        password: '',
        agree: false
      }
    }),

    methods: {
      ...mapActions('auth', [
        'registration'
      ]),

      sendForm() {
        this.setLoading(true);

        this.registration({...this.formData})
          .then(() => {
            this.$router.push(this.route('admin.home'));
            const messageType = this.language.toasted['registration-success'];
            this.$toasted.success(messageType);
            this.setLoading(false);
          })
          .catch(error => {
            console.log(error);
            const messageType = this.language.toasted[error.code];
            this.$toasted.error(messageType);
            this.setLoading(false);
          })
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
