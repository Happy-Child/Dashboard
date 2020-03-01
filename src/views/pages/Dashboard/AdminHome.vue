<template>
  <v-col>

    <span class="display-1">
      {{ language.common.dashboard }}
    </span>
    <v-divider class="my-3"></v-divider>

    <page-content/>

  </v-col>
</template>

<script>
  import PageContent from './AdminHome/PageContent'

  export default {
    name: 'AdminHome',

    metaInfo() {
      return {
        title: this.language.common.dashboard
      }
    },

    data: () => ({

    }),

    components: {
      PageContent
    }
  }
</script>
