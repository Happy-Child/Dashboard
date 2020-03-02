<template>

  <v-row>
    <v-col cols="12" md="6">
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
          :disabled="disabled"
        >
          {{ language.modals.confirm }}
        </v-btn>

      </v-form>
    </v-col>
  </v-row>

</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import FormReset from './../../../../mixins/form-reset';
  import FormRules from './../../../../mixins/form-rules';

  export default {
    name: "PageContent",

    mixins: [FormReset, FormRules],

    data: () => ({
      formData: {
        id: '',
        name: '',
        limit: null,
      },
      disabled: true,
    }),

    watch: {
      categorySingle: {
        handler(data) {
          this.formData = {...data};
        },
        immediate: true,
        deep: true,
      },

      formData: {
        handler(data) {
          this.disabled = true;
          this.disabled = JSON.stringify(data) === JSON.stringify(this.categorySingle);
        },
        deep: true
      },
    },

    methods: {
      ...mapGetters('categories', [
        'getCategoryById'
      ]),

      ...mapActions('categories', [
        'categoriesIndex',
        'categoriesUpdate',
      ]),

      validateForm () {
        if (!this.$refs.form.validate() && !this.disabled) return true;

        if((this.formData.name !== this.categorySingle.name) && this.nameExists()) {
          const messageType = this.language.toasted['category-name-exists'];
          this.$toasted.error(messageType);
          return false;
        } else {
          this.update();
        }
      },

      nameExists() {
        return this.categories.find(item => item.name === this.formData.name);
      },

      update() {
        this.formData.id = this.getRouteParam('id');

        this.categoriesUpdate({...this.formData})
          .then(() => {
            const messageType = this.language.toasted['success'];
            this.$toasted.success(messageType);
          })
          .catch(error => {
            console.log(error);
            const messageType = this.language.toasted[error.code];
            this.$toasted.error(messageType);
          });
      }
    },

    computed: {
      ...mapState('categories', [
        'categorySingle',
        'categories',
        'categoriesLoading'
      ])
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