<template>
  <v-menu
    v-model="langToggle"
    :close-on-click="true"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        dark
        v-on="on"
        :elevation="0"
        @click.prevent="elementToggle('lang')"
      >
        {{ curLang }}
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="lang in langs"
        :key="lang.slug"
        :class="{'v-list-item--active': lang.slug === curLang}"
        @click="changeLang(lang.slug)"
      >
        <v-list-item-title>
          {{ lang.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  import { mapMutations } from 'vuex'
  import ElementToggle from './../../mixins/element-toggle'

  export default {
    name: "Lang",

    mixins: [ElementToggle],

    data: () => ({
      langToggle: false,
      langs: [
        {
          name: 'English',
          slug: 'en'
        },
        {
          name: 'Russian',
          slug: 'ru'
        }
      ]
    }),

    methods: {
      ...mapMutations([
        'SET_LANG'
      ]),

      changeLang(lang) {
        this.SET_LANG(lang);
      }
    }
  }
</script>

<style scoped>

</style>