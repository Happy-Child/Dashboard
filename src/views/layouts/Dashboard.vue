<template>
  <v-app
    class="layout-default"
  >

    <app-navbar
      v-model="drawerState"
    />

    <app-header
      @drawerToggle="drawerToggle"
    />

    <v-content>
      <v-row
        justify="center"
        class="mx-0 py-2 fill-height"
      >

        <router-view></router-view>

      </v-row>
    </v-content>

    <app-footer/>

  </v-app>
</template>

<script>
  import AppNavbar from "./../components/Dashboard/Navbar"
  import AppHeader from "./../components/Dashboard/Header"
  import AppFooter from "./../components/Footer"

  export default {
    name: "Dashboard",

    data: () => ({
      drawerState: window.innerWidth > 1260,
    }),

    methods: {
      drawerToggle() {
        this.drawerState = !this.drawerState;
      }
    },

    components: {
      AppNavbar,
      AppHeader,
      AppFooter
    },

  }
</script>

<style scoped>

</style>