export default {
  
  methods: {
    formReset() {
      for(let key in this.formData) {
        this.formData[key] = null;
      }
  
      this.$refs.form.resetValidation();
    }
  }
  
}