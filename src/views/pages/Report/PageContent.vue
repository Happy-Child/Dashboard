<template>

  <v-row class="align-stretch">
    <v-col cols="12">
      <span class="title mr-2">Total spent:</span>
      <span class="headline">560$</span>
    </v-col>

    <v-col cols="12">

      <div
        v-for="item in progresses"
        class="progress-item mb-5"
      >
        <div class="progress-item__title mb-1">
          <span class="font-weight-medium">{{ item.name }}: </span>
          <span>{{ item.cur }}</span>
          <span class="mx-1">from</span>
          <span>{{ item.max }}</span>
        </div>

        <v-progress-linear
          v-model="item.value"
          :color="item.color"
          height="25"
        ></v-progress-linear>
      </div>

    </v-col>
  </v-row>

</template>

<script>

  export default {
    name: "PageContent",

    data: () => ({
      progresses: [
        {
          name: 'Girl',
          value: 20,
          max: 5000,
          cur: 1090,
          color: 'amber',
        },
        {
          name: 'Cars',
          value: 50,
          max: 1000,
          cur: 500,
          color: 'light-green darken-4',
        },
        {
          name: 'Health',
          value: 90,
          max: 10000,
          cur: 9000,
          color: 'blue-grey',
        }
      ]
    }),

    methods: {

    },

    components: {

    }
  }
</script>

<style scoped>

</style>