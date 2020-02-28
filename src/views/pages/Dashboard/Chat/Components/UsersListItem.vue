<template>
  <v-list-item @click="">

    <v-list-item-avatar>
      <v-img :src="user.avatarUrl"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="user.name"></v-list-item-title>
    </v-list-item-content>

    <v-list-item-icon>
      <v-icon color="grey">mdi-chat</v-icon>
    </v-list-item-icon>

  </v-list-item>
</template>

<script>
  export default {
    name: "UsersListItem",

    props: {
      user: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>