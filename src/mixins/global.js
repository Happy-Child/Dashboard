export default {
  
  computed: {
    language() {
      return this.$lang[this.curLang];
    },
    
    curLang() {
      return this.$store.state.lang.curLang;
    }
  },
  
  methods: {
    route(name, params = {}) {
      return {name, params}
    },
  
    getRouteParam(key) {
      return this.$route.params ? this.$route.params[key] : null
    },
    
    showMessage(key, type) {
      const message = this.language.toasted[key];
      this.$toasted[type](message);
    }
  }
  
}