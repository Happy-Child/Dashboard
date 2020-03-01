<template>
  <v-col>

    <span class="display-1 d-flex align-center justify-space-between">
      <span>{{ language.common.categoryEdit }}</span>

      <v-btn
        color="primary lighten-2"
        :to="route('admin.categories')"
      >
        <v-icon class="mr-2">mdi-arrow-left</v-icon>
        <span>{{ language.modals.back }}</span>
      </v-btn>
    </span>
    <v-divider class="my-3"></v-divider>

    <page-content/>

  </v-col>
</template>

<script>
  import PageContent from './CategoryEdit/PageContent'

  export default {
    name: 'CategoryEdit',

    metaInfo() {
      return {
        title: this.language.common.categoryEdit
      }
    },

    components: {
      PageContent
    }
  }
</script>
