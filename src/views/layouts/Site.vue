<template>
  <v-app class="layout-site">

    <site-header/>

    <v-content>
      <router-view/>
    </v-content>

    <site-footer/>

  </v-app>
</template>

<script>
  import SiteHeader from "../components/Site/Header";
  import SiteFooter from "../components/Footer";

  export default {
    name: "Site",

    components: {
      SiteHeader,
      SiteFooter,
    }
  }
</script>

<style scoped>

</style>