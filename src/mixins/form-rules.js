import regValidation from './../utils/reg-validation'

export default {
  
  data: () => ({
    rules: {
      name: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
      email: [
        v => !!v || 'E-mail is required',
        v => regValidation.email.test(v) || 'E-mail must be valid',
      ],
      bill: [
        v => !!v || 'Bill is required',
        v => (v && v >= 100) || 'Bill must be no less than 100$',
      ],
      password: {
        required: value => !!value || 'Password is required',
        min: v => v.length >= 8 || 'Min 8 characters'
      },
      new_password: {
        min: true,
        required: true,
      }
    }
  })
  
}