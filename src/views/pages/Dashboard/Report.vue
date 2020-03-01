<template>
  <v-col class="d-flex flex-column flex-grow-1">

    <span class="display-1">
      {{ language.common.report }}
    </span>
    <v-divider class="my-3"></v-divider>

    <page-content/>

  </v-col>
</template>

<script>
  import PageContent from './Report/PageContent'

  export default {
    name: 'Report',

    metaInfo() {
      return {
        title: this.language.common.report
      }
    },

    components: {
      PageContent
    }
  }
</script>
