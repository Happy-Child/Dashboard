<template>
  <v-app-bar
    app
    color="primary"
    :clipped-left="true"
    dark
  >

    <v-app-bar-nav-icon @click.prevent="drawerToggle"/>

    <v-toolbar-title>
      <span class="mr-5">Application</span>
      <span>{{ curDate | date('datetime') }}</span>
    </v-toolbar-title>

    <v-toolbar-title class="ml-auto mr-8">
      <span v-if="!userLoading">
        {{ userData.bill | currency('USD') }}
      </span>
    </v-toolbar-title>

    <v-menu
      v-model="userMenu"
      :close-on-click="true"
      :offset-y="true"
    >
      <template v-slot:activator="{ on }">
        <div
          class="d-flex align-center user-btn"
          @click.prevent="userToggle"
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
            :disabled="userLoading"
            :elevation="0"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </div>
      </template>

      <v-list>
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

  </v-app-bar>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: "Header",

    data: () => ({
      curDate: new Date(),
      interval: null,
      userMenu: false
    }),

    methods: {
      ...mapActions('auth', [
        'logout'
      ]),

      ...mapActions('user', [
        'user'
      ]),

      drawerToggle() {
        this.$emit('drawerToggle');
      },

      userToggle() {
        this.userMenu = !this.userMenu;
      },

      exit() {
        this.logout()
          .then(data => {
            this.$router.push(this.route('login'));
            this.$toasted.info('You are logged out');
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    computed: {
      ...mapState('user', [
        'userData',
        'userLoading',
      ]),
    },

    mounted() {
      this.interval = setInterval(() => {
        this.curDate = new Date();
      }, 1000);
    },

    beforeDestroy() {
      clearInterval(this.interval);
    }
  }
</script>

<style lang="sass" scoped>

  .user-btn
    cursor: pointer
  
</style>