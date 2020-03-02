<template>
  <div
    class="d-flex align-center justify-center text-center fill-height"
  >

    <page-content />

  </div>
</template>

<script>
  import PageContent from "./Home/PageContent";

  export default {
    name: "Home",

    metaInfo() {
      return {
        title: this.language.common.home
      }
    },

    components: {
      PageContent
    }
  }
</script>

<style scoped>

</style>