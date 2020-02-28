<template>

  <v-row class="align-stretch">

    <loader v-if="spendingLoading || categoriesLoading"/>

    <v-col
      v-else-if="!categories.length"
      cols="12"
      class="font-weight-medium"
    >
      <span>Spending empty.</span>
    </v-col>

    <template v-else>
      <v-col cols="12">
        <span class="title mr-2">Total spent:</span>
        <span class="headline">{{ totalSpent }}$</span>
      </v-col>

      <v-col cols="12">
        <div
          v-for="category in categories"
          class="progress-item mb-5"
        >
          <div class="progress-item__title mb-1">
            <span class="font-weight-medium">{{ category.name }}: </span>
            <span>{{ totalsSpentForCategory[category.id] }}$</span>
            <span class="mx-1">from</span>
            <span>{{ category.limit }}$</span>
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

            <span>{{ totalsSpentForCategory[category.id] }}$ from {{ category.limit }}$</span>
          </v-tooltip>


        </div>

      </v-col>
    </template>

  </v-row>

</template>

<script>
  import {mapActions, mapGetters, mapState} from 'vuex'

  export default {
    name: "PageContent",

    data: () => ({
      totalsSpentForCategory: {},
    }),

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