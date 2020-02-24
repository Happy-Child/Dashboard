<template>

  <v-row>
    <v-col cols="12">
      <v-btn
        large
        color="primary lighten-2"
        :to="route('admin.category-create')"
      >
        <v-icon class="mr-2">mdi-plus-box-multiple</v-icon>
        <span>Create category</span>
      </v-btn>
    </v-col>

    <loader v-if="categoriesLoading"/>

    <v-col
      v-else-if="!categories.length"
      cols="12"
      class="font-weight-medium"
    >
      <span>Categories empty.</span>
    </v-col>

    <template v-else>
      <v-col
        cols="6"
        v-for="category in categories"
        :key="category.id"
      >

        <v-card class="d-flex justify-space-between">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">{{ category.name }}</v-list-item-title>

              <v-list-item-subtitle class="body-1">
                <span>Limit: </span>
                <span class="font-weight-medium primary--text">{{ category.limit }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-btn
              color="success"
              :elevation="0"
              fab
              small
              :to="route('admin.category-edit', {id: category.id})"
            >
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item>
        </v-card>

      </v-col>
    </template>
  </v-row>

</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: "PageContent",

    data: () => ({

    }),

    methods: {
      ...mapActions('categories', [
        'categoriesIndex'
      ])
    },

    computed: {
      ...mapState('categories', [
        'categories',
        'categoriesLoading'
      ])
    },

    mounted() {
      if(!this.categories.length && this.categoriesLoading) {
        this.categoriesIndex({})
      }
    }
  }
</script>

<style scoped>

</style>