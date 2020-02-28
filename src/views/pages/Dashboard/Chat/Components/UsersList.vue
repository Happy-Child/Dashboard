<template>
  <v-col
    cols="3"
  >

    <v-card class="fill-height">
      <div class="pb-2">
        <span class="d-block title px-4 py-4">Users</span>
        <v-divider></v-divider>
      </div>

      <v-list
        class="messages-list"
        subheader
      >
        <loader v-if="false"/>

        <span
          v-else-if="false"
          class="font-weight-medium px-4"
        >
          No users.
        </span>

        <users-list-item
          v-else
          v-for="user in users"
          :key="user.uid"
          :user="user"
        ></users-list-item>
      </v-list>
    </v-card>

  </v-col>
</template>

<script>
  import UsersListItem from "./UsersListItem";

  export default {
    name: "UsersList",

    data: () => ({
      users: [
        {
          avatarUrl: '',
          name: 'User test',
          uid: 1
        },
        {
          avatarUrl: '',
          name: 'User test',
          uid: 2
        },
        {
          avatarUrl: '',
          name: 'User test',
          uid: 3
        },
        {
          avatarUrl: '',
          name: 'User test',
          uid: 41
        },
      ],
    }),

    components: {
      UsersListItem
    }
  }
</script>

<style scoped>

</style>