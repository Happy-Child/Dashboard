<template>
  <v-col>

    <span class="display-1 d-flex align-center justify-space-between">
      <span>
        {{ language.common.categoryCreate }}
      </span>

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
  import PageContent from './CategoryCreate/PageContent'

  export default {
    name: 'CategoryCreate',
    components: {
      PageContent
    }
  }
</script>
