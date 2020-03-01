<template>
  <v-app
    class="layout-default"
    color="primary"
  >

    <v-content>
      <v-row
        justify="center"
        align="center"
        class="fill-height light-blue darken-1 white--text flex-column"
      >

        <span class="display-4 font-weight-bold mb-4">404</span>

        <v-btn
          :to="route('home')"
          large
          color="warning"
        >
          <v-icon class="mr-2">mdi-home</v-icon>
          <span>To home</span>
        </v-btn>

      </v-row>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    name: "Error404"
  }
</script>

<style scoped>

</style>