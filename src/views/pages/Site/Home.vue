<template>
  <v-row
    class="text-center fill-height align-center justify-center"
  >

    <page-content />

  </v-row>
</template>

<script>
  import PageContent from "./Home/PageContent";

  export default {
    name: "Home",

    data: () => ({

    }),

    methods: {

    },

    computed: {

    },

    components: {
      PageContent
    }
  }
</script>

<style scoped>

</style>