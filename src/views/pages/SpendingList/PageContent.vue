<template>

  <v-row class="align-stretch">

    <v-col cols="12">
      <v-btn
        large
        color="primary lighten-2"
        :to="route('admin.spending-list-create')"
      >
        <v-icon class="mr-2">mdi-plus-box-multiple</v-icon>
        <span>Сreate waste</span>
      </v-btn>
    </v-col>


    <loader v-if="spendingLoading || categoriesLoading"/>

    <v-col
      v-else-if="!spending.length"
      cols="12"
      class="font-weight-medium"
    >
      <span>Spending empty.</span>
    </v-col>

    <template v-else>
      <v-col cols="3" class="mx-auto">
        <chart-pie
          :data="radialData"
          :options="chartOptions"
        />
      </v-col>

      <v-col cols="12">
        <v-data-table
          :headers="tableHeaders"
          :items="spendingForTable"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.id="{ item }">
            {{ item.index }}
          </template>

          <template v-slot:item.amount="{ item }">
            <span class="font-weight-medium">{{ item.amount }} $</span>
          </template>

          <template v-slot:item.category_id="{ item }">
            {{ getCategoryNameById(item.category_id) }}
          </template>

          <template v-slot:item.type="{ item }">
            <v-chip :color="getColorForType(item.type)" dark>
              {{ getType(item.type) }}
            </v-chip>
          </template>

          <template v-slot:item.date="{ item }">
            {{ item.date | date('date') }}
          </template>

          <template v-slot:item.open="{ item }">
            <v-btn
              color="success"
              fab
              x-small
              :elevation="0"
              :to="route('admin.spending-list-view', { id: item.id })"
            >
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </template>

  </v-row>

</template>

<script>
  import { mapState, mapActions } from "vuex";
  import ChartPie from './../../charts/Pie'

  export default {
    name: "PageContent",

    data: () => ({
      spendingForTable: [],
      chartOptions: {},
      tableHeaders: [
        {
          text: '№',
          value: 'index'
        },
        {
          text: 'Amount',
          value: 'amount'
        },
        {
          text: 'Category',
          value: 'category_id'
        },
        {
          text: 'Type',
          value: 'type'
        },
        {
          text: 'Date',
          value: 'date'
        },
        {
          text: 'Open',
          value: 'open'
        }
      ]
    }),

    watch: {
      spending: {
        handler(array) {
          let cloneArray = [...array];

          this.spendingForTable = cloneArray.reverse().map((item, index) => ({
            ...item,
            index: index + 1
          }));
        },
        immediate: true,
        deep: true
      }
    },

    methods: {
      ...mapActions('categories', [
        'categoriesIndex'
      ]),

      ...mapActions('spending', [
        'spendingIndex',
      ]),

      getCategoryNameById(id) {
        return this.categories.find(item => item.id === id).name;
      },

      getColorForType(type) {
        return type === 'income' ? 'green' : 'red';
      },

      getType(type) {
        return type.charAt(0).toUpperCase() + type.slice(1);
      },

      getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';

        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * letters.length)];
        }

        return color;
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

      radialData() {
        const result = {
          datasets: [
            {
              data: [], // Posts counts
              backgroundColor: []
            },
          ],
          labels: [] // Categories names
        };

        const categoriesPostsCounts = {};

        this.categories.forEach(item => {
          categoriesPostsCounts[item.id] = 0;
          result.datasets[0].backgroundColor.push(this.getRandomColor());
          result.labels.push(item.name);
        });

        this.spending.forEach(item => {
          if(categoriesPostsCounts[item.category_id] !== undefined) {
            categoriesPostsCounts[item.category_id]++;
          }
        });

        result.datasets[0].data = Object.entries(categoriesPostsCounts).map(item => {
          return item[1];
        });

        return result;
      }
    },

    mounted() {
      if(!this.spending.length) {
        this.spendingIndex({})
          .then(() => {})
          .catch(error => console.log(error));
      }

      if(!this.categories.length) {
        this.categoriesIndex({})
          .then(() => {})
          .catch(error => console.log(error));
      }
    },

    components: {
      ChartPie
    }
  }
</script>

<style scoped>

</style>