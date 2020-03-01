<template>

  <div class="d-flex flex-column flex-grow-1">

    <loader v-if="spendingLoading || categoriesLoading"/>

    <v-row class="flex-grow-0" v-else-if="!categories.length">
      <v-col
        cols="12"
        class="font-weight-medium"
      >
        <span>{{ language.common.spendingEmpty }}</span>
      </v-col>
    </v-row>

    <template v-else>
      <v-row class="flex-grow-0">
        <v-col cols="12">
          <span class="title mr-2">{{ language.common.totalSpent }}:</span>
          <span class="headline">{{ totalSpent | currency('USD') }}</span>
        </v-col>
      </v-row>

      <v-row class="flex-grow-0">
        <v-col cols="12">
          <div
            v-for="category in resultItems"
            class="progress-item mb-5"
          >
            <div class="progress-item__title mb-1">
              <span class="font-weight-medium">{{ category.name }}: </span>
              <span>{{ totalsSpentForCategory[category.id] | currency('USD') }}</span>
              <span class="mx-1">{{ language.common.of }}</span>
              <span>{{ category.limit | currency('USD') }}</span>
            </div>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-progress-linear
                  v-on="on"
                  :color="getColorByPercent(percentageOfSpending(category.id))"
                  height="16"
                  :value="percentageOfSpending(category.id)"
                ></v-progress-linear>
              </template>

              <span>
                {{ totalsSpentForCategory[category.id] | currency('USD') }}
                {{ language.common.of }}
                {{ category.limit | currency('USD') }}
              </span>
            </v-tooltip>


          </div>
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
  import {mapActions, mapGetters, mapState} from 'vuex'
  import Pagination from './../../../../mixins/pagination'

  export default {
    name: "PageContent",

    mixins: [Pagination],

    data: () => ({
      totalsSpentForCategory: {},
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

    computed: {
      ...mapState('spending', [
        'spending',
        'spendingLoading'
      ]),

      ...mapState('categories', [
        'categories',
        'categoriesLoading'
      ]),

      ...mapGetters('spending', [
        'totalSpent'
      ])
    },

    methods: {
      ...mapGetters('categories', [
        'getCategoryById'
      ]),

      ...mapActions('categories', [
        'categoriesIndex'
      ]),

      ...mapActions('spending', [
        'spendingIndex',
      ]),

      setTotalsSpentForCategory() {
        let result = {};

        this.categories.forEach(item => {
          result[item.id] = 0;
        });

        this.spending.forEach(item => {
          if(result[item.category_id] !== undefined && item.type === 'outcome') {
            result[item.category_id] += +item.amount;
          }
        });

        this.totalsSpentForCategory = result;
      },

      percentageOfSpending(category_id) {
        return (this.totalsSpentForCategory[category_id] * 100) / this.getCategoryById()(category_id).limit;
      },

      getColorByPercent(val) {
        const percent = Math.floor(val);
        return (percent < 50) ? 'green' : (percent >= 50 && percent < 95) ? 'yellow' : 'red';
      }
    },

    mounted() {
      if(!this.spending.length && !this.categories.length) {

        Promise.all([this.spendingIndex({}), this.categoriesIndex({})])
          .then(() => {
            this.setTotalsSpentForCategory();
          })
          .catch(error => console.log(error));

      } else if(!this.spending.length) {

        this.spendingIndex({})
          .then(() => {
            this.setTotalsSpentForCategory();
          })
          .catch(error => console.log(error));

      } else if(!this.categories.length) {

        this.categoriesIndex({})
          .then(() => {
            this.setTotalsSpentForCategory();
          })
          .catch(error => console.log(error));

      } else {
        this.setTotalsSpentForCategory();
      }
    },

    components: {

    }
  }
</script>

<style scoped>

</style>