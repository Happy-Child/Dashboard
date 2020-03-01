<template>
  <div class="d-flex align-center">

    <v-menu
      v-model="userMenuToggle"
      :close-on-click="true"
      offset-y
    >
      <template v-slot:activator="{ on }">
        <div
          class="d-flex align-center user-btn"
          :class="{'disabled': userLoading}"
          @click.prevent="elementToggle('userMenu')"
        >
          <span class="font-weight-medium mr-3">
            {{ userData.name }}
          </span>

          <v-btn
            class="ml-auto"
            fab
            small
            color="warning"
            :loading="userLoading"
            :elevation="0"
          >
            <v-icon v-if="!userData.avatarUrl">mdi-account</v-icon>
            <img class="user-avatar" v-else :src="userData.avatarUrl" alt="">
          </v-btn>
        </div>
      </template>

      <v-list>
        <v-list-item
          :to="route($route.name.includes('admin') ? 'home' : 'admin.home')"
        >
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>

          <v-list-item-title v-if="$route.name.includes('admin')">
            {{ language.common.site }}
          </v-list-item-title>

          <v-list-item-title v-else>
            {{ language.common.dashboard }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item
          :to="route('admin.profile')"
        >
          <v-list-item-action>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-action>

          <v-list-item-title>
            {{ language.common.settings }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item
          @click.prevent="exit"
        >
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>

          <v-list-item-title>
            {{ language.common.exit }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import ElementToggle from './../../mixins/element-toggle'
  import Exit from './../../mixins/exit'

  export default {
    name: "UserMenu",

    mixins: [ElementToggle, Exit],

    data: () => ({
      userMenuToggle: false
    }),

    methods: {
      ...mapActions('auth', [
        'logout'
      ]),
    },

    computed: {
      ...mapState('user', [
        'userData',
        'userLoading',
      ]),
    }
  }
</script>

<style lang="sass" scoped>


</style>