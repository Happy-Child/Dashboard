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

    <v-menu
      v-else
      v-model="userMenuToggle"
      :close-on-click="true"
      :offset-y="true"
    >
      <template v-slot:activator="{ on }">
        <div
          class="d-flex align-center user-btn"
          :class="{'disabled': userLoading}"
          @click.prevent="elementToggle('userMenu')"
        >
          <span class="font-weight-medium mr-3">
            {{ userData.name }}
          </span>

          <v-btn
            class="ml-auto"
            fab
            small
            color="warning"
            :loading="userLoading"
            :elevation="0"
          >
            <v-icon v-if="!userData.avatarUrl">mdi-account</v-icon>
            <img class="user-avatar" v-else :src="userData.avatarUrl" alt="">
          </v-btn>
        </div>
      </template>

      <v-list>
        <v-list-item
          :to="route('admin.home')"
        >
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>

          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>

        <v-list-item
          :to="route('admin.profile')"
        >
          <v-list-item-action>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-action>

          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>

        <v-list-item
          @click.prevent="exit"
        >
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>

          <v-list-item-title>Exit</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

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
  import Login from "./../../components/Modals/Login";
  import Registration from "./../../components/Modals/Registration";
  import ForgotPassword from "./../../components/Modals/ForgotPassword";
  import ElementToggle from './../../../mixins/element-toggle'
  import Exit from './../../../mixins/exit'

  export default {
    name: "Header",

    mixins: [ElementToggle, Exit],

    data: () => ({
      userMenuToggle: false,
      loginShow: false,
      registrationShow: false,
      forgotPasswordShow: false,
    }),

    methods: {
      ...mapActions('auth', [
        'logout'
      ]),

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
      ...mapState('user', [
        'userData',
        'userLoading',
      ]),

      ...mapState('auth', [
        'isAuth'
      ]),
    },

    mounted() {

    },

    beforeDestroy() {

    },

    components: {
      Login,
      Registration,
      ForgotPassword,
    }
  }
</script>

<style lang="sass" scoped>



</style>