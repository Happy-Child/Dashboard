<template>
  <v-col>

    <span class="display-1">Chat with registered users</span>
    <v-divider class="my-3"></v-divider>

    <page-content/>

  </v-col>
</template>

<script>
  import PageContent from './Chat/PageContent'

  export default {
    name: 'Report',
    components: {
      PageContent
    }
  }
</script>
