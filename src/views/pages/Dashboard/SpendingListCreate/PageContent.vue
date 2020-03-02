<template>

  <v-row>
    <v-col cols="12" md="6">
      <loader v-if="userLoading || spendingLoading || categoriesLoading"/>

      <v-form
        v-else
        ref="form"
        lazy-validation
        :key="curLang"
      >

        <p>{{ language.common.selectType }}</p>
        <v-radio-group
          v-model.trim="formData.type"
          :rules="rules.type"
          required
        >
          <v-radio :label="language.common.income" value="income"></v-radio>
          <v-radio :label="language.common.outcome" value="outcome"></v-radio>
        </v-radio-group>

        <v-select
          :items="categories"
          v-model.trim="formData.category_id"
          :label="language.common.category"
          :rules="rules.categories"
          item-text="name"
          item-value="id"
          :no-data-text="language.common.categoriesEmpty"
          required
        ></v-select>

        <v-text-field
          v-model.trim="formData.amount"
          :rules="rules.amount"
          prefix="$"
          :label="language.common.amount"
          type="number"
          required
        ></v-text-field>

        <v-textarea
          v-model.trim="formData.description"
          :label="language.common.description"
        ></v-textarea>

        <v-btn
          color="success"
          @click="validateForm"
          large
        >
          {{ language.modals.confirm }}
        </v-btn>

      </v-form>
    </v-col>
  </v-row>

</template>

<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  import FormReset from './../../../../mixins/form-reset';
  import FormRules from './../../../../mixins/form-rules';

  export default {
    name: "PageContent",

    mixins: [FormReset, FormRules],

    data: () => ({
      formData: {
        type: null,
        category_id: null,
        amount: null,
        description: null
      }
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
            const messageType = this.language.toasted['bill-less-outcome'];
            this.$toasted.error(messageType);
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
            this.showMessage('success', 'success');
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