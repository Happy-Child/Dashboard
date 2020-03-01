<template>
  <v-navigation-drawer
    v-model="drawerToggle"
    app
    :clipped="true"
  >

    <v-list dense>
      <v-list-item
        v-for="link in routes"
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
  export default {
    name: "Navbar",

    props: {
      drawerToggle: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      routes() {
        return [
          {
            title: this.language.common.dashboard,
            name: 'admin.home',
            icon: 'mdi-home'
          },
          {
            title: this.language.common.spendingList,
            name: 'admin.spending-list',
            icon: 'mdi-format-list-bulleted'
          },
          {
            title: this.language.common.categories,
            name: 'admin.categories',
            icon: 'mdi-inbox-multiple'
          },
          {
            title: this.language.common.report,
            name: 'admin.report',
            icon: 'mdi-pencil'
          }
        ];
      }
    }
  }
</script>

<style scoped>

</style>