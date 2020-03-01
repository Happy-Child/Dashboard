<template>
  <v-col cols="8">
    <v-card class="fill-height">
      <v-card-title class="headline warning white--text">
        {{ language.common.currencyCourse }}
      </v-card-title>
      <v-divider></v-divider>

      <v-data-table
        :headers="tableHeaders"
        :items="getCurrencies"
        hide-default-footer
        class="elevation-1"
      >

        <template v-slot:item.date="{ date }">
          {{ date | date('date') }}
        </template>

      </v-data-table>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    name: "CurrencyCourse",

    props: {
      currencyData: {
        type: Object,
        required: true
      }
    },

    data: () => ({

    }),

    computed: {
      tableHeaders() {
        return [
          {
            text: this.language.common.currency,
            value: 'currency'
          },
          {
            text: this.language.common.course,
            value: 'course'
          },
          {
            text: this.language.common.date,
            value: 'date'
          },
        ];
      },

      getCurrencies() {
        const formats = Object.keys(this.currencyData.rates);

        return formats.map(format => ({
          currency: format,
          course: this.currencyData.rates[format].toFixed(4),
          date: this.currencyData.date
        }));
      }
    }
  }
</script>

<style scoped>

</style>