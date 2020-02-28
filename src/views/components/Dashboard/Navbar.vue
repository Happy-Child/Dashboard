<template>
  <v-navigation-drawer
    v-model="drawerToggle"
    app
    :clipped="true"
  >

    <v-list dense>
      <v-list-item
        v-for="link in links"
        :key="link.name"
        :to="route(link.name)"
      >

        <v-list-item-action>
          <v-icon>
            {{ link.icon }}
          </v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>
            {{ link.title }}
          </v-list-item-title>
        </v-list-item-content>

      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
  import { commonRoutes } from "./../../../router/routes-list"

  export default {
    name: "Navbar",

    props: {
      drawerToggle: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        links: commonRoutes
      }
    },
  }
</script>

<style scoped>

</style>