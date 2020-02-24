<template>

  <v-row>
    <v-col cols="6">
      <loader v-if="categoriesLoading"/>

      <v-form
        ref="form"
        lazy-validation
        v-else
      >

        <v-text-field
          v-model.trim="formData.name"
          :rules="rules.name"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model.trim="formData.limit"
          :rules="rules.limit"
          label="Limit"
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
          Submit
        </v-btn>

      </v-form>
    </v-col>
  </v-row>

</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: "PageContent",

    data: () => ({
      formData: {
        id: '',
        name: '',
        limit: null,
      },
      oldCategoryData: {
        id: '',
        name: '',
        limit: null,
      },
      disabled: true,
      rules: {
        name: [
          v => !!v || 'Name is required',
        ],
        limit: [
          v => !!v || 'Limit is required',
          v => (v && v >= 10) || 'Limit must be no less than 10$',
        ]
      }
    }),

    watch: {
      formData: {
        handler(data) {
          this.disabled = true;
          this.disabled = JSON.stringify(data) === JSON.stringify(this.oldCategoryData);
        },
        deep: true
      },
    },

    methods: {
      ...mapActions('categories', [
        'categoriesIndex',
        'categoriesUpdate',
      ]),

      validateForm () {
        if (!this.$refs.form.validate() && !this.disabled) return true;

        if((this.formData.name !== this.oldCategoryData.name) && this.nameExists()) {
          this.$toasted.error(this.$messages['category-name-exists']);
          return false;
        } else {
          this.update();
        }
      },

      update() {
        this.categoriesUpdate(this.formData)
          .then(() => {
            this.setCategory();
            this.$toasted.success(this.$messages['success']);
          })
          .catch(error => {
            console.log(error);
            this.$toasted.success(this.$messages[error.code]);
          });
      },

      nameExists() {
        return this.categories.find(item => item.name === this.formData.name);
      },

      setCategory() {
        const categoryId = this.getRouteParam('id');
        const getCategoryData = this.categories.find(item => item.id === categoryId);

        this.oldCategoryData = {...getCategoryData};
        this.formData = {...getCategoryData};
      }
    },

    computed: {
      ...mapState('categories', [
        'categories',
        'categoriesLoading'
      ])
    },

    mounted() {
      if(!this.categories.length && this.categoriesLoading) {
        this.categoriesIndex({})
          .then(() => {
            this.setCategory();
          })
          .catch(error => console.log(error));
      }

      if(!this.categoriesLoading) this.setCategory();
    }
  }
</script>

<style scoped>

</style>