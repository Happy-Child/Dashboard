<template>

  <v-row>
    <v-col cols="6">
      <loader v-if="userLoading"/>

      <v-form
        v-else
        ref="form"
        v-model.trim="formValid"
        lazy-validation
      >

        <v-text-field
          v-model.trim="resultData.name"
          :counter="20"
          :rules="rules.name"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model.trim="resultData.email"
          :rules="rules.email"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model.trim="old_password"
          :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showOldPassword ? 'text' : 'password'"
          :rules="[rules.old_password.required, rules.old_password.min]"
          name="Password"
          label="Password"
          counter
          @click:append="showOldPassword = !showOldPassword"
        ></v-text-field>

        <v-text-field
          v-model.trim="new_password"
          :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showNewPassword ? 'text' : 'password'"
          :rules="[rules.new_password.min]"
          name="New password"
          label="New password"
          counter
          @click:append="showNewPassword = !showNewPassword"
        ></v-text-field>

        <v-btn
          color="success"
          @click="validateForm"
          large
          :disabled="disabled"
        >
          Submit
        </v-btn>

      </v-form>
    </v-col>
  </v-row>

</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import regValidation from './../../../utils/reg-validation'

  export default {
    name: "PageContent",

    data: () => ({
      formValid: true,
      showNewPassword: false,
      showOldPassword: false,
      disabled: true,
      resultData: {
        name: '',
        email: ''
      },
      new_password: '',
      old_password: '',
      rules: {
        name: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 20) || 'Name must be less than 20 characters',
        ],
        email: [
          v => !!v || 'E-mail is required',
          v => regValidation.email.test(v) || 'E-mail must be valid',
        ],
        old_password: {
          required: value => !!value || 'Password is required',
          min: v => v.length >= 8 || 'Min 8 characters'
        },
        new_password: {
          min: true,
          required: true,
        }
      }
    }),

    watch: {
      userData: {
        handler(data) {
          this.resultData = {...data};
        },
        immediate: true,
      },

      resultData: {
        handler(data) {
          this.disabled = true;
          this.disabled = JSON.stringify(data) === JSON.stringify(this.userData);
        },
        deep: true
      },

      new_password(val) {
        this.passwordValid(val);
      }
    },

    methods: {
      ...mapActions('user', [
        'update',
        'user',
      ]),

      validateForm () {
        if(this.$refs.form.validate() && !this.disabled) this.startUpdate();
      },

      passwordValid(val) {
        this.disabled = true;

        if(val.length > 0) {
          this.rules.new_password.min = v => (v.length > 0 && v.length >= 8) || 'Min 8 characters';
          this.disabled = false;
        } else {
          this.rules.new_password.min = true;
        }
      },

      startUpdate() {
        let formData = { ...this.resultData };

        const passwords = {
          new_password: this.new_password,
          old_password: this.old_password,
        };

        formData = {
          data: formData,
          passwords
        };

        this.update(formData)
          .then(() => {
            this.user(this.userData.uid);
            this.resetForm();
          })
          .catch(error => {
            console.log(error);
            this.resetForm();
          })
      },

      resetForm() {
        this.new_password = '';
        this.old_password = '';
      }
    },

    computed: {
      ...mapState('user', [
        'userData',
        'userLoading',
      ])
    },

    components: {

    }
  }
</script>

<style scoped>

</style>