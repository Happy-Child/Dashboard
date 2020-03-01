<template>
  <v-col class="d-flex flex-column flex-grow-1">

    <span class="display-1">
      {{ language.common.categories }}
    </span>
    <v-divider class="my-3"></v-divider>

    <page-content/>

  </v-col>
</template>

<script>
  import PageContent from './Categories/PageContent'

  export default {
    name: 'Categories',

    metaInfo() {
      return {
        title: this.language.common.categories
      }
    },

    components: {
      PageContent
    }
  }
</script>
