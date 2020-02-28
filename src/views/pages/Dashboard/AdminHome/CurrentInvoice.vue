<template>
  <v-col cols="4">
    <v-card class="fill-height">
      <v-card-title class="headline warning white--text">
        Current invoice
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <span
          class="black--text font-weight-regular title d-block"
          v-for="(currency, format) in currencyData.rates"
          :key="currency"
        >
          {{ currencyConvert(format) | currency(format) }}
        </span>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    name: "CurrentInvoice",

    props: {
      currencyData: {
        type: Object,
        required: true
      },
      userData: {
        type: Object,
        required: true
      }
    },

    data: () => ({

    }),

    methods: {
      currencyConvert(currency) {
        return Math.floor(this.baseCurrency * this.currencyData.rates[currency]);
      }
    },

    computed: {
      baseCurrency() {
        return this.userData.bill / (this.currencyData.rates['USD'] / this.currencyData.rates['EUR']);
      }
    }


  }
</script>

<style scoped>

</style>