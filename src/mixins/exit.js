export default {
  
  methods: {
    exit() {
      this.logout({})
        .then(() => {
          if(this.$route.name !== 'home') {
            this.$router.push(this.route('home'));
          }
          
          this.$toasted.info(this.language.messages.youLogged);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  
}