<template>
  <v-app
    class="layout-default"
  >

    <app-navbar
      :drawer-toggle="drawerState"
    />

    <app-header
      @drawerToggle="drawerToggle"
    />

    <v-content>
      <v-row
        justify="center"
        class="px-5 py-2 fill-height"
      >

        <router-view></router-view>

      </v-row>
    </v-content>

    <app-footer/>

  </v-app>
</template>

<script>
  import AppNavbar from "./../components/Navbar"
  import AppHeader from "./../components/Header"
  import AppFooter from "./../components/Footer"

  export default {
    name: "Default",
    data: () => ({
      drawerState: true,
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