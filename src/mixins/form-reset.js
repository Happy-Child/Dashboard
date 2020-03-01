export default {
  
  methods: {
    formReset() {
      for(let key in this.formData) {
        this.formData[key] = '';
      }
  
      this.$refs.form.resetValidation();
    }
  }
  
}