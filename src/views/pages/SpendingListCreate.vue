<template>
  <v-col>

    <span class="display-1 d-flex align-center justify-space-between">
      <span>Spending list create</span>

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
  import PageContent from './SpendingListCreate/PageContent'

  export default {
    name: 'SpendingListCreate',

    components: {
      PageContent
    }


  }
</script>
