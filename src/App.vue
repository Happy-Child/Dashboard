<template>
  <router-view/>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex'

  export default {
    name: 'App',

    data: () => ({

    }),

    watch: {
      message(messageData) {
        const message = this.$messages[messageData.data.code] || 'Undefined error';
        this.$toasted[messageData.type](message);
      }
    },

    methods: {
      ...mapActions('auth', [
        'curAuth'
      ]),

      ...mapMutations('auth', [
        'SET_IS_AUTH'
      ]),
    },

    computed: {
      ...mapState({
        message: state => state.messages.toastedMessage
      })
    },

    created() {
      this.curAuth({})
        .then(user => {})
        .catch(error => console.log(error))
    },

    components: {

    },
  };
</script>

<style lang="sass">

  .form-btn
    width: 100%

  .toasted
    font-family: Roboto, sans-serif

</style>