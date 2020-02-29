export default {
  
  methods: {
    resetPassword() {
      this.setLoading(true);
    
      return this.forgotPassword({...this.formData})
        .then(() => {
          this.$toasted.success(this.$messages['forgot-password-success']);
          this.setLoading(false);
        })
        .catch(error => {
          console.log(error);
          this.setLoading(false);
        })
    },
  }
  
}