<template>
  <v-col>

    <span class="display-1">
      {{ language.common.profile }}
    </span>
    <v-divider class="my-3"></v-divider>

    <page-content/>

  </v-col>
</template>

<script>
  import PageContent from './Profile/PageContent'

  export default {
    name: 'Profile',

    metaInfo() {
      return {
        title: this.language.common.profile
      }
    },

    components: {
      PageContent
    }
  }
</script>
