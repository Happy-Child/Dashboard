<template>
  <v-col>

    <span class="display-1 d-flex align-center justify-space-between">
      <span>Spending list view</span>

      <v-btn
        color="primary lighten-2"
        :to="route('admin.spending-list')"
      >
        <v-icon class="mr-2">mdi-arrow-left</v-icon>
        <span>To back</span>
      </v-btn>
    </span>
    <v-divider class="my-3"></v-divider>

    <page-content/>

  </v-col>
</template>

<script>
  import PageContent from './SpendingListView/PageContent'

  export default {
    name: 'SpendingListView',

    components: {
      PageContent
    }
  }
</script>
