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
        name: '',
        limit: null,
      },
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

    methods: {
      ...mapActions('categories', [
        'categoriesIndex',
        'categoriesCreate',
      ]),

      validateForm () {
        if (!this.$refs.form.validate()) return true;

        if(this.nameExists()) {
          this.$toasted.error(this.$messages['category-name-exists']);
          return false;
        } else {
          this.create();
        }
      },

      create() {
        this.categoriesCreate(this.formData)
          .then(() => {
            this.$refs.form.reset()
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