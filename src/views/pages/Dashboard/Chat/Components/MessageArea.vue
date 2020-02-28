<template>
  <form @submit.prevent="submit" class="d-flex px-4">

    <v-text-field
      v-model="message"
      placeholder="Message"
    ></v-text-field>

    <v-btn
      class="ml-6 mt-4"
      color="success"
      @click="submit"
    >
      <v-icon>mdi-checkbox-marked-circle</v-icon>
    </v-btn>

  </form>
</template>

<script>
  export default {
    name: "MessageArea",

    data: () => ({
      message: ''
    }),

    methods: {
      submit() {

      }
    },

    computed: {

    }
  }
</script>

<style scoped>

</style>