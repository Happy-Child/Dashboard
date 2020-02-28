export default {
  
  methods: {
    exit() {
      this.logout({})
        .then(() => {
          if(this.$route.name !== 'home') {
            this.$router.push(this.route('home'));
          }
          this.$toasted.info('You are logged out');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  
}