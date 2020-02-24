<template>
  <v-row>

    <loader v-if="spendingLoading || categoriesLoading"/>

    <v-col v-else cols="4">
      <v-card
        class="py-4"
      >
        <v-card-subtitle class="subtitle-1 py-2 d-flex align-start justify-space-between black--text">
          <span class="font-weight-medium">Amount:</span>
          <span>{{ curSpendingData.amount }}$</span>
        </v-card-subtitle>

        <v-card-subtitle class="subtitle-1 py-2 d-flex align-start justify-space-between black--text">
          <span class="font-weight-medium">Date:</span>
          <span>{{ curSpendingData.date | date('date') }}</span>
        </v-card-subtitle>

        <v-card-subtitle class="subtitle-1 py-2 d-flex align-start justify-space-between black--text">
          <span class="font-weight-medium">Category:</span>
          <span>{{ getCategoryNameById }}</span>
        </v-card-subtitle>

        <v-card-subtitle class="subtitle-1 py-2 d-flex align-start justify-space-between black--text">
          <span class="font-weight-medium">Type:</span>
          <span>{{ getType(curSpendingData.type) }}</span>
        </v-card-subtitle>

        <v-card-subtitle
          class="subtitle-1 py-2 black--text"
          :class="{'d-flex justify-space-between': !curSpendingData.description}"
        >
          <span class="font-weight-medium d-block">Description:</span>

          <span class="d-block" v-if="curSpendingData.description">
            {{ curSpendingData.description }}
          </span>
          <span v-else>No description</span>
        </v-card-subtitle>
      </v-card>
    </v-col>

  </v-row>
</template>

<script>
  import { mapState, mapActions } from "vuex";

  export default {
    name: "PageContent",

    data: () => ({
      curSpendingData: {
        amount: null,
        category_id: null,
        date: null,
        description: null,
        id: null,
        type: ''
      }
    }),

    methods: {
      ...mapActions('categories', [
        'categoriesIndex'
      ]),

      ...mapActions('spending', [
        'spendingIndex',
      ]),

      getType(type) {
        if(typeof type === 'string') return type.charAt(0).toUpperCase() + type.slice(1);
      },

      setCurSpending() {
        this.curSpendingData = this.spending.find(item => item.id === this.getRouteParam('id'));
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

      getCategoryNameById() {
        const found = this.categories.find(item => item.id === this.curSpendingData.category_id);
        if(typeof found === 'object') return found.name;
      },
    },

    mounted() {
      if(!this.spending.length && !this.categories.length) {

        Promise.all([this.spendingIndex({}), this.categoriesIndex({})])
          .then(() => {
            this.setCurSpending();
          })
          .catch(error => console.log(error));

      } else if(!this.spending.length) {

        this.spendingIndex({})
          .then(() => {})
          .catch(error => console.log(error));

      } else if(!this.categories.length) {

        this.categoriesIndex({})
          .then(() => {})
          .catch(error => console.log(error));

      } else {
        this.setCurSpending();
      }

    },

    components: {

    }
  }
</script>

<style scoped>

</style>