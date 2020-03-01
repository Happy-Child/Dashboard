<template>

  <div class="d-flex flex-column flex-grow-1">
    <v-row class="flex-grow-0">
      <v-col cols="12">
        <v-btn
          large
          color="primary lighten-2"
          :to="route('admin.category-create')"
        >
          <v-icon class="mr-2">mdi-plus-box-multiple</v-icon>
          <span>{{ language.common.categoryCreate }}</span>
        </v-btn>
      </v-col>
    </v-row>

    <loader v-if="categoriesLoading"/>

    <v-row class="flex-grow-0" v-else-if="!resultItems.length">
      <v-col
        cols="12"
        class="font-weight-medium"
      >
        <span>{{ language.common.categoriesEmpty }}</span>
      </v-col>
    </v-row>

    <template v-else>
      <v-row class="flex-grow-0">
        <v-col
          cols="6"
          v-for="category in resultItems"
          :key="category.id"
        >
          <v-card class="d-flex justify-space-between">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">{{ category.name }}</v-list-item-title>

                <v-list-item-subtitle class="body-1">
                  <span>{{ language.common.limit }}: </span>
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
      </v-row>

      <v-row v-if="defaultItems.length > 1" class="flex-grow-0 mt-auto">
        <v-col
          cols="12"
          class="text-center mt-2"
        >
          <v-pagination
            v-model="page"
            :length="pagLength"
            :total-visible="itemsVisible"
          ></v-pagination>
        </v-col>
      </v-row>
    </template>

  </div>

</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Pagination from './../../../../mixins/pagination'

  export default {
    name: "PageContent",

    mixins: [Pagination],

    data: () => ({

    }),

    watch: {
      categories: {
        handler(array) {
          this.setupPagination([...array].reverse());
        },
        immediate: true,
        deep: true
      }
    },

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
      if(!this.categories.length) {
        this.categoriesIndex({})
      }
    }
  }
</script>

<style scoped>

</style>