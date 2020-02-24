<template>
  <v-col>

    <span class="display-1">Profile</span>
    <v-divider class="my-3"></v-divider>

    <page-content/>

  </v-col>
</template>

<script>
  import PageContent from './Profile/PageContent'

  export default {
    name: 'Profile',
    components: {
      PageContent
    }
  }
</script>
