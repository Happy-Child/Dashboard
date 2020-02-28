<template>
  <v-col>

    <span class="display-1">Categories</span>
    <v-divider class="my-3"></v-divider>

    <page-content/>

  </v-col>
</template>

<script>
  import PageContent from './Categories/PageContent'

  export default {
    name: 'Categories',
    components: {
      PageContent
    }
  }
</script>
