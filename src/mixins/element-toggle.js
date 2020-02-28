export default {
  
  methods: {
    elementToggle(name) {
      this[`${name}Toggle`] = !this[`${name}Toggle`];
    }
  }
  
}