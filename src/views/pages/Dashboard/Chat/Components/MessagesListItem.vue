<template>
  <v-card
    class="my-8 message-item"
    :class="message.uid % 2 === 0 ? 'mr-auto' : 'ml-auto'"
  >
    <v-list-item @click="">

      <v-list-item-content>
        <p class="subtitle-1 mb-0">
          {{ message.text }}
        </p>
      </v-list-item-content>

    </v-list-item>
  </v-card>
</template>

<script>
  export default {
    name: "MessagesListItem",

    props: {
      message: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="sass" scoped>

  .message-item
    width: 100%
    max-width: 50%

</style>