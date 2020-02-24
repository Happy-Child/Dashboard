export default {
  
  methods: {
    route(name, params = {}) {
      return {name, params}
    },
  
    getRouteParam(key) {
      return this.$route.params ? this.$route.params[key] : null
    }
  }
  
}