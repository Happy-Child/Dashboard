<template>
  <v-row>

    <loader v-if="spendingLoading || categoriesLoading"/>

    <v-col v-else cols="4">
      <v-card
        class="py-4"
      >
        <v-card-subtitle class="subtitle-1 py-2 d-flex align-start justify-space-between black--text">
          <span class="font-weight-medium">{{ language.common.amount }}:</span>
          <span>{{ spendingSingle.amount }}$</span>
        </v-card-subtitle>

        <v-card-subtitle class="subtitle-1 py-2 d-flex align-start justify-space-between black--text">
          <span class="font-weight-medium">{{ language.common.date }}:</span>
          <span>{{ spendingSingle.date | date('date') }}</span>
        </v-card-subtitle>

        <v-card-subtitle class="subtitle-1 py-2 d-flex align-start justify-space-between black--text">
          <span class="font-weight-medium">{{ language.common.category }}:</span>
          <span>{{ getCategoryNameById }}</span>
        </v-card-subtitle>

        <v-card-subtitle class="subtitle-1 py-2 d-flex align-start justify-space-between black--text">
          <span class="font-weight-medium">{{ language.common.type }}:</span>
          <span>{{ language.common[spendingSingle.type] }}</span>
        </v-card-subtitle>

        <v-card-subtitle
          class="subtitle-1 py-2 black--text"
          :class="{'d-flex justify-space-between': !spendingSingle.description}"
        >
          <span class="font-weight-medium d-block">{{ language.common.description }}:</span>

          <span class="d-block" v-if="spendingSingle.description">
            {{ spendingSingle.description }}
          </span>
          <span v-else>{{ language.common.noDescription }}</span>
        </v-card-subtitle>
      </v-card>
    </v-col>

  </v-row>
</template>

<script>
  import {mapActions, mapGetters, mapState} from "vuex";

  export default {
    name: "PageContent",

    data: () => ({

    }),

    methods: {
      ...mapGetters('spending', [
        'getSpendingById'
      ]),

      ...mapActions('categories', [
        'categoriesIndex'
      ]),

      ...mapActions('spending', [
        'spendingIndex',
      ])
    },

    computed: {
      ...mapState('spending', [
        'spendingSingle',
        'spending',
        'spendingLoading',
      ]),

      ...mapState('categories', [
        'categories',
        'categoriesLoading'
      ]),

      getCategoryNameById() {
        const foundCategory = this.categories.find(item => item.id === this.spendingSingle.category_id);
        if(typeof foundCategory === 'object') return foundCategory.name;
      }
    },

    mounted() {
      if(!this.categories.length) {
        this.categoriesIndex({})
          .then(() => {})
          .catch(error => console.log(error));
      }
    },

    components: {

    }
  }
</script>

<style scoped>

</style>