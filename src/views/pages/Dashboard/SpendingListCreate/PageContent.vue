<template>

  <v-row>
    <v-col cols="6">
      <loader v-if="userLoading || spendingLoading || categoriesLoading"/>

      <v-form
        v-else
        ref="form"
        lazy-validation
      >

        <p>Select type</p>
        <v-radio-group
          v-model.trim="formData.type"
          :rules="rules.type"
          required
        >
          <v-radio label="Income" value="income"></v-radio>
          <v-radio label="Outcome" value="outcome"></v-radio>
        </v-radio-group>

        <v-select
          :items="categories"
          v-model.trim="formData.category_id"
          label="Category"
          :rules="rules.categories"
          item-text="name"
          item-value="id"
          no-data-text="Categories empty"
          required
        ></v-select>

        <v-text-field
          v-model.trim="formData.amount"
          :rules="rules.amount"
          prefix="$"
          label="Amount"
          type="number"
          required
        ></v-text-field>

        <v-textarea
          v-model.trim="formData.description"
          label="Description"
        ></v-textarea>

        <v-btn
          color="success"
          @click="validateForm"
          large
        >
          Submit
        </v-btn>

      </v-form>
    </v-col>
  </v-row>

</template>

<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  import FormReset from './../../../../mixins/form-reset';

  export default {
    name: "PageContent",

    mixins: [FormReset],

    data: () => ({
      formData: {
        type: null,
        category_id: null,
        amount: null,
        description: null
      },
      rules: {
        amount: [
          v => !!v || 'Amount is required',
          v => (v && v > 0) || 'Amount must be at least 0',
        ],
        categories: [
          v => !!v || 'Categories is required',
        ],
        type: [
          v => !!v || 'Type is required',
        ]
      },
    }),

    methods: {
      ...mapActions('categories', [
        'categoriesIndex'
      ]),

      ...mapActions('spending', [
        'spendingCreate',
      ]),

      ...mapMutations('spending', [
        'SPENDING_LOADING',
      ]),

      validateForm () {
        if(this.$refs.form.validate()) {

          if(this.billMoreOutcome()) {
            this.create();
          } else {
            this.$toasted.error(this.$messages['bill-less-outcome']);
          }

        }
      },

      getNewBill() {
        return this.formData.type === 'income' ?
          (+this.userData.bill + +this.formData.amount) :
          (+this.userData.bill - +this.formData.amount);
      },

      billMoreOutcome() {
        const isOutcome = this.formData.type === 'outcome';
        const billMoreOutcome = +this.userData.bill >= +this.formData.amount;
        return isOutcome ? billMoreOutcome : true;
      },

      create() {
        const data = {
          formData: {...this.formData},
          newBill: this.getNewBill()
        };

        this.spendingCreate(data)
          .then(() => {
            this.formReset();
          })
          .catch(error => console.log(error));
      }
    },

    computed: {
      ...mapState('user', [
        'userData',
        'userLoading'
      ]),

      ...mapState('spending', [
        'spendingLoading'
      ]),

      ...mapState('categories', [
        'categories',
        'categoriesLoading'
      ])
    },

    mounted() {
      this.SPENDING_LOADING(false);

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