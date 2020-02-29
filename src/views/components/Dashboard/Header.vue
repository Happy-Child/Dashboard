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

    <user-menu/>

  </v-app-bar>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import UserMenu from "../UserMenu";

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
      UserMenu
    }
  }
</script>

<style lang="sass">

</style>