<template>

  <v-row class="fill-height align-stretch">

    <template>
      <users-list
      ></users-list>

      <messages-list
      ></messages-list>
    </template>

  </v-row>

</template>

<script>
  import {mapActions, mapGetters, mapState} from 'vuex';
  import UsersList from "./Components/UsersList";
  import MessagesList from "./Components/MessagesList";

  export default {
    name: "PageContent",

    data: () => ({

    }),

    computed: {
      ...mapState('spending', [
        'spending',
        'spendingLoading'
      ]),

      ...mapGetters('spending', [
        'totalSpent'
      ])
    },

    methods: {
      ...mapActions('spending', [
        'spendingIndex',
      ]),

    },

    mounted() {

    },

    components: {
      UsersList,
      MessagesList
    }
  }
</script>

<style lang="sass">

  .messages-list
    max-height: 60vh
    overflow-y: auto

</style>