export default {
  
  data: () => ({
    modalLoading: false,
  }),
  
  methods: {
    validateForm () {
      if (this.$refs.form.validate()) {
        this.setLoading(true);
        this.sendForm();
      }
    },
  
    setLoading(status) {
      this.modalLoading = status;
    },
  
    close() {
      this.$refs.form.reset();
      this.$emit('close');
    },
  
    confirm() {
      this.validateForm();
    },
  }
  
}