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
        if(typeof messageData === 'object') {
          const message = this.$messages[messageData.data.code] || 'Undefined error';
          this.$toasted[messageData.type](message);
        }
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
        .then(() => {})
        .catch(error => console.log(error))
    },

    components: {

    }
  };
</script>

<style lang="sass">

  .form-btn
    width: 100%

  .toasted
    font-family: Roboto, sans-serif

  .user-btn
    cursor: pointer

  .user-avatar
    max-width: 100%
    max-height: 100%
    width: 40px
    height: 40px
    object-fit: cover
    object-position: center
    border-radius: 100%

  .disabled
    pointer-events: none

  .forgot-btn
    cursor: pointer

  .modal-btn
    width: 100%

  .cursor-pointer
    cursor: pointer

  body .btn-close-cross
    position: absolute
    top: 10px
    right: 10px

</style>