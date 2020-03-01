<template>
  <v-col>

    <span class="display-1">
      {{ language.common.spendingList }}
    </span>
    <v-divider class="my-3"></v-divider>

    <page-content/>

  </v-col>
</template>

<script>
  import PageContent from './SpendingList/PageContent'

  export default {
    name: 'SpendingList',

    metaInfo() {
      return {
        title: this.language.common.spendingList
      }
    },

    components: {
      PageContent
    }
  }
</script>
