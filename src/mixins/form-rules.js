import regValidation from './../utils/reg-validation'

export default {
  
  computed: {
    rules() {
      return {
        name: [
          v => !!v || this.language.messages.nameRequired,
          v => (v && v.length <= 20) || this.language.messages.nameLess,
        ],
        email: [
          v => !!v || this.language.messages.emailRequired,
          v => regValidation.email.test(v) || this.language.messages.emailMustValid,
        ],
        bill: [
          v => !!v || this.language.messages.billRequired,
          v => (v && v >= 100) || this.language.messages.billLess,
        ],
        checkbox: [
          v => !!v || this.language.messages.checkboxRequired
        ],
        password: [
          v => !!v || this.language.messages.passwordRequired,
          v => (v.length >= 8) || this.language.messages.passwordLess
        ],
        new_password: {
          min: true,
          required: true,
        }
      }
    }
  }
  
}