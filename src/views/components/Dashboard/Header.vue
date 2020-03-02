<template>
  <v-app-bar
    app
    color="primary"
    :clipped-left="true"
    dark
  >

    <v-app-bar-nav-icon @click.prevent="drawerToggle"/>

    <v-toolbar-title class="d-none d-md-flex">
      <span class="mr-5">{{ language.header.siteName }}</span>
      <span>{{ curDate | date('datetime') }}</span>
    </v-toolbar-title>

    <v-toolbar-title class="ml-auto mr-1 mr-md-5">
      <span v-if="!userLoading">
        {{ userData.bill | currency('USD') }}
      </span>
    </v-toolbar-title>

    <lang/>

    <user-menu class="ml-1 ml-md-5"/>

  </v-app-bar>
</template>

<script>
  import { mapState } from 'vuex'
  import UserMenu from "../UserMenu";
  import Lang from "./../Lang";

  export default {
    name: "Header",

    data: () => ({
      userMenuToggle: false,
      curDate: new Date(),
      interval: null
    }),

    methods: {
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
    },

    components: {
      Lang,
      UserMenu,
    }
  }
</script>

<style lang="sass">

</style>