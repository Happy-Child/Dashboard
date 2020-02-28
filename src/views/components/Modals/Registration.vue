<template>

  <modal
    title="Registration"
    confirmButtonText="Registration"
    :modalShow="modalShow"
    :modalLoading="modalLoading"
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
          v-model.trim="userData.agree"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="I agree to the processing of data."
          required
        ></v-checkbox>
      </v-form>
    </template>

    <template slot="subButtons">
      <div class="flex">
        <span class="mr-2">Have an account?</span>

        <span
          @click="showLoginModal"
          class="font-weight-medium blue--text cursor-pointer"
        >Sign in</span>
      </div>
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
      showPassword: false,
      userData: {
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
        this.registration(this.userData)
          .then(() => {
            this.$router.push(this.route('admin.home'));
            this.$toasted.success(this.$messages['registration-success']);
            this.setLoading(false);
          })
          .catch(error => {
            console.log(error);
            this.setLoading(false);
          })
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
