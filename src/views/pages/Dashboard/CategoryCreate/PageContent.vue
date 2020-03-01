<template>

  <v-row>
    <v-col cols="6">
      <loader v-if="categoriesLoading"/>

      <v-form
        ref="form"
        lazy-validation
        :key="curLang"
        v-else
      >

        <v-text-field
          v-model.trim="formData.name"
          :rules="rules.categoryName"
          :label="language.form.name"
          required
        ></v-text-field>

        <v-text-field
          v-model.trim="formData.limit"
          :rules="rules.categoryLimit"
          :label="language.form.limit"
          type="number"
          prefix="$"
          required
        ></v-text-field>

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
  import { mapActions, mapState } from 'vuex'
  import FormReset from './../../../../mixins/form-reset';
  import FormRules from './../../../../mixins/form-rules';

  export default {
    name: "PageContent",

    mixins: [FormReset, FormRules],

    data: () => ({
      formData: {
        name: '',
        limit: null,
      }
    }),

    methods: {
      ...mapActions('categories', [
        'categoriesIndex',
        'categoriesCreate',
      ]),

      validateForm () {
        if (!this.$refs.form.validate()) return true;

        if(this.nameExists()) {
          const messageType = this.language.toasted['category-name-exists'];
          this.$toasted.error(messageType);
          return false;
        } else {
          this.create();
        }
      },

      create() {
        this.categoriesCreate({...this.formData})
          .then(() => {
            this.showMessage('success', 'success');
            this.formReset();
          })
          .catch(error => console.log(error));
      },

      nameExists() {
        return this.categories.find(item => item.name === this.formData.name);
      }
    },

    computed: {
      ...mapState('categories', [
        'categories',
        'categoriesLoading'
      ])
    },

    components: {

    },

    mounted() {
      if(!this.categories.length && this.categoriesLoading) {
        this.categoriesIndex({})
          .then(() => {})
          .catch(error => console.log(error));
      }
    }
  }
</script>

<style scoped>

</style>