export default {
  
  methods: {
    exit() {
      this.logout({})
        .then(() => {
          if(this.$route.name !== 'home') {
            this.$router.push(this.route('home'));
          }
          
          const message = this.language.toasted['you-logged'];
          this.$toasted.info(message);
        })
        .catch(error => {
          const message = this.language.toasted[error.code];
          this.$toasted.error(message);
          console.log(error);
        });
    }
  }
  
}