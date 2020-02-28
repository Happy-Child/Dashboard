<template>
  <v-col
    cols="9"
  >

    <v-card class="fill-height" :class="{ 'd-flex align-center justify-center': false }">
      <loader v-if="false"/>

      <span
        class="title mb-0"
        v-else-if="false"
      >
        Select user
      </span>

      <template v-else>
        <div class="pb-2">
          <span class="d-block title px-4 py-4">Egor Lazuka</span>
          <v-divider></v-divider>
        </div>

        <v-list
          class="px-4 messages-list"
          subheader
        >
          <messages-list-item
            v-for="message in messages"
            :key="message.uid"
            :message="message"
          ></messages-list-item>
        </v-list>

        <v-divider class="d-block"></v-divider>

        <message-area></message-area>
      </template>
    </v-card>

  </v-col>
</template>

<script>
  import MessagesListItem from "./MessagesListItem";
  import MessageArea from "./MessageArea";

  export default {
    name: "MessagesList",

    data: () => ({
      messages: [
        {
          text: 'Accusantium animi corporis cum, debitis doloremque esse non nostrum pariatur praesentium quibusdam rem veritatis voluptatem.',
          uid: 1,
        },
        {
          text: 'Lorem ipsum dolor sit amet.',
          uid: 2,
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, culpa illum quibusdam sed sequi temporibus. Accusantium animi corporis cum.',
          uid: 3,
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi corporis cum, debitis doloremque esse non nostrum pariatur praesentium quibusdam rem veritatis voluptatem.',
          uid: 4,
        },
        {
          text: 'Accusamus, culpa illum quibusdam sed sequi temporibus. Accusantium animi corporis cum, quibusdam rem veritatis voluptatem.',
          uid: 5,
        },
        {
          text: 'Debitis doloremque esse non nostrum pariatur praesentium quibusdam rem veritatis voluptatem. Accusamus, culpa illum quibusdam sed sequi temporibus. Accusantium animi corporis cum, quibusdam rem veritatis voluptatem. Accusamus, culpa illum quibusdam sed sequi temporibus. Accusantium animi corporis cum, quibusdam rem veritatis voluptatem.',
          uid: 6,
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, culpa illum quibusdam sed sequi temporibus. Accusantium animi corporis cum.',
          uid: 7,
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi corporis cum, debitis doloremque esse non nostrum pariatur praesentium quibusdam rem veritatis voluptatem.',
          uid: 8,
        },
        {
          text: 'Accusamus, culpa illum quibusdam sed sequi temporibus. Accusantium animi corporis cum, quibusdam rem veritatis voluptatem. Accusamus, culpa illum quibusdam sed sequi temporibus. Accusantium animi corporis cum, quibusdam rem veritatis voluptatem.',
          uid: 9,
        },
      ]
    }),

    components: {
      MessagesListItem,
      MessageArea
    }
  }
</script>

