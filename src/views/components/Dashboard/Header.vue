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
          :to="route('home')"
        >
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-title>Site</v-list-item-title>
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

  </v-app-bar>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import ElementToggle from './../../../mixins/element-toggle'
  import Exit from './../../../mixins/exit'

  export default {
    name: "Header",

    mixins: [ElementToggle, Exit],

    data: () => ({
      userMenuToggle: false,
      curDate: new Date(),
      interval: null
    }),

    methods: {
      ...mapActions('auth', [
        'logout'
      ]),

      drawerToggle() {
        this.$emit('drawerToggle');
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

<style lang="sass">

</style>