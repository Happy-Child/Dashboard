<template>

  <v-row class="align-stretch">
    <loader v-if="userLoading || currencyLoader"/>

    <template
      v-else
    >
      <current-invoice
        :currency-data="currencyData"
        :user-data="userData"
      />

      <currency-course
        :currency-data="currencyData"
      />
    </template>
  </v-row>

</template>

<script>
  import { mapActions, mapState } from 'vuex'

  import CurrentInvoice from "./CurrentInvoice";
  import CurrencyCourse from "./CurrencyCourse";

  export default {
    name: "PageContent",

    data: () => ({

    }),

    computed: {
      ...mapState('currency', {
        currencyData: 'currencyData',
        currencyLoader: 'loader'
      }),

      ...mapState('user', [
        'userData',
        'userLoading'
      ])
    },

    methods: {
      ...mapActions('currency', [
        'currency'
      ])
    },

    mounted() {
      if(!Object.keys(this.currencyData.rates).length) {
        this.currency({})
          .then(() => {})
          .catch(error => console.log(error));
      }
    },

    components: {
      CurrentInvoice,
      CurrencyCourse
    }
  }
</script>

<style scoped>

</style>