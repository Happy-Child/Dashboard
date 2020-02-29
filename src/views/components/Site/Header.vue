<template>
  <v-app-bar
    app
    color="primary"
    dark
  >

    <v-toolbar-title>
      <span class="mr-5">Budget control</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div
      v-if="!isAuth"
      class="d-flex"
    >
      <v-btn
        class="ma-2"
        outlined
        @click="toggleModalLogin"
      >
        Sign in
      </v-btn>

      <v-btn
        class="ma-2"
        color="success"
        @click="toggleModalRegistration"
      >
        Sign up
      </v-btn>
    </div>

    <user-menu v-else />

    <login
      :modalShow="loginShow"
      @showRegistrationModal="showRegistrationModal"
      @showForgotModal="showForgotModal"
      @close="toggleModalLogin"
    />

    <registration
      :modalShow="registrationShow"
      @showLoginModal="showLoginModal"
      @close="toggleModalRegistration"
    />

    <forgot-password
      :modalShow="forgotPasswordShow"
      @showLoginModal="showLoginModal"
      @close="toggleModalForgotPassword"
    />

  </v-app-bar>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import UserMenu from "../UserMenu";
  import Login from "./../../components/Modals/Login";
  import Registration from "./../../components/Modals/Registration";
  import ForgotPassword from "./../../components/Modals/ForgotPassword";
  import ElementToggle from './../../../mixins/element-toggle'
  import Exit from './../../../mixins/exit'

  export default {
    name: "Header",

    mixins: [ElementToggle, Exit],

    data: () => ({
      loginShow: false,
      registrationShow: false,
      forgotPasswordShow: false,
    }),

    methods: {
      toggleModalLogin() {
        this.loginShow = !this.loginShow;
      },

      toggleModalRegistration() {
        this.registrationShow = !this.registrationShow;
      },

      toggleModalForgotPassword() {
        this.forgotPasswordShow = !this.forgotPasswordShow;
      },

      showLoginModal() {
        this.hideAllModals();
        this.toggleModalLogin();
      },

      showRegistrationModal() {
        this.hideAllModals();
        this.toggleModalRegistration();
      },

      showForgotModal() {
        this.hideAllModals();
        this.toggleModalForgotPassword();
      },

      hideAllModals() {
        this.loginShow = false;
        this.registrationShow = false;
        this.forgotPasswordShow = false;
      }
    },

    computed: {
      ...mapState('auth', [
        'isAuth'
      ]),
    },

    mounted() {

    },

    beforeDestroy() {

    },

    components: {
      UserMenu,
      Login,
      Registration,
      ForgotPassword,
    }
  }
</script>

<style lang="sass" scoped>



</style>