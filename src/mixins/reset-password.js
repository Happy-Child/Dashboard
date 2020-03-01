export default {
  
  methods: {
    resetPassword() {
      this.setLoading(true);
      
      return this.forgotPassword({...this.formData})
        .then(() => {
          const messageType = this.language.toasted['forgot-password-success'];
          this.$toasted.success(messageType);
          this.setLoading(false);
        })
        .catch(error => {
          console.log(error);
          const messageType = this.language.toasted[error.code];
          this.$toasted.error(messageType);
          this.setLoading(false);
        })
    },
  }
  
}