<template>
  <v-footer
    app
    padless
  >

    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="primary py-4 text-center white--text"
        cols="12"
      >
        {{ curYear }} — <strong>Egor Lazuka</strong>
      </v-col>
    </v-row>

  </v-footer>
</template>

<script>
  export default {
    name: "Footer",

    data: () => ({
      curYear: new Date().getFullYear()
    }),
  }
</script>

<style scoped>

</style>