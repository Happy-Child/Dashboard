<template>

  <v-row>
    <v-col cols="6">
      <loader v-if="userLoading"/>

      <v-form
        v-else
        ref="form"
        v-model.trim="formValid"
        lazy-validation
      >
        <div class="upload-user-avatar d-flex align-start mb-5">
          <div class="wrap-img">
            <img class="user-avatar-img" :src="userData.avatarUrl" alt="">
          </div>

          <div class="upload-user-avatar-right pl-8">
            <div v-if="cropperShow" class="wrap-cropper mb-5">
              <cropper
                class="mb-5"
                classname="cropper"
                @change="cropperChange"
                :src="cropperImage"
                :stencilComponent="$options.components.CircleStencil"
              ></cropper>
            </div>

            <v-row class="mb-3">
              <v-col cols="6">
                <v-btn
                  class="cropper-btn"
                  color="primary"
                  @click="$refs.file.click()"
                  large
                >
                  <input
                    class="file-input"
                    type="file"
                    ref="file"
                    @change="cropperUpload"
                    accept="image/*"
                  >
                  <span>Upload avatar</span>
                </v-btn>
              </v-col>

              <v-col cols="6"v-if="cropperImage">
                <v-btn
                  class="cropper-btn"
                  color="warning"
                  @click="cropperReset()"
                  large
                >
                  <span>Remove new avatar</span>
                </v-btn>
              </v-col>
            </v-row>


            <span class="d-block">Maximum size - {{ (maxFileSize / 1000000).toFixed(2) }}MB</span>
          </div>
        </div>

        <v-text-field
          v-model.trim="resultData.name"
          :counter="20"
          :rules="rules.name"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model.trim="resultData.email"
          :rules="rules.email"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model.trim="password"
          :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showOldPassword ? 'text' : 'password'"
          :rules="[rules.password.required, rules.password.min]"
          name="Password"
          label="Password"
          counter
          @click:append="showOldPassword = !showOldPassword"
        ></v-text-field>

        <v-text-field
          v-model.trim="new_password"
          :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showNewPassword ? 'text' : 'password'"
          :rules="[rules.new_password.min]"
          name="New password"
          label="New password"
          counter
          @click:append="showNewPassword = !showNewPassword"
        ></v-text-field>

        <v-btn
          color="success"
          @click="validateForm"
          large
          :disabled="disabled"
        >
          Submit
        </v-btn>

      </v-form>
    </v-col>
  </v-row>

</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import FormRules from './../../../../mixins/form-rules'
  import { Cropper, CircleStencil } from 'vue-advanced-cropper'

  export default {
    name: "PageContent",

    mixins: [FormRules],

    data: () => ({
      formValid: true,
      showNewPassword: false,
      showOldPassword: false,
      disabled: true,
      cropperShow: false,
      cropperImage: '',
      maxFileSize: 2000000,
      newAvatar: {
        name: '',
        string: ''
      },
      resultData: {
        avatarUrl: '',
        name: '',
        email: ''
      },
      new_password: '',
      password: '',
    }),

    watch: {
      userData: {
        handler(data) {
          this.resultData = {...data};
        },
        immediate: true,
      },

      resultData: {
        handler(data) {
          this.disabled = true;
          this.disabled = JSON.stringify(data) === JSON.stringify(this.userData);
        },
        deep: true
      },

      new_password(val) {
        this.passwordValid(val);
      }
    },

    methods: {
      ...mapActions('user', [
        'updateUser',
        'getUser',
      ]),

      cropperChange({ canvas }) {
        this.newAvatar.string = canvas.toDataURL();
      },

      cropperUpload(e) {
        const input = e.target;
        if(!input.files.length && !input.files[0]) return false;

        if (input.files[0].size < this.maxFileSize) {
          const reader = new FileReader();
          this.newAvatar.name = input.files[0].name;

          reader.onload = (e) => {
            this.cropperImage = e.target.result;
            this.cropperShow = true;
            this.disabled = false;
          };

          reader.readAsDataURL(input.files[0]);
        }
        else {
          this.$toasted.error(this.$messages['max-avatar-size']);
        }
      },

      passwordValid(val) {
        this.disabled = true;

        if(val.length > 0) {
          this.rules.new_password.min = v => (v.length > 0 && v.length >= 8) || 'Min 8 characters';
          this.disabled = false;
        } else {
          this.rules.new_password.min = true;
        }
      },

      validateForm () {
        if(this.$refs.form.validate() && !this.disabled) this.startUpdate();
      },

      startUpdate() {
        let formData = {
          ...this.resultData,
          newAvatar: this.newAvatar
        };

        const passwords = {
          new_password: this.new_password,
          password: this.password,
        };

        formData = {
          data: formData,
          passwords
        };

        this.updateUser(formData)
          .then(() => {
            this.getUser(this.userData.uid);
            this.resetForm();
          })
          .catch(error => {
            console.log(error);
            this.resetForm();
          })
      },

      resetForm() {
        this.new_password = '';
        this.password = '';
        this.cropperReset();
      },

      cropperReset() {
        this.$refs.file.value = '';
        this.cropperImage = '';
        this.newAvatar.name = '';
        this.newAvatar.string = '';
        this.cropperShow = false;
      }
    },

    computed: {
      ...mapState('user', [
        'userData',
        'userLoading',
      ])
    },

    components: {
      Cropper,
      CircleStencil,
    }
  }
</script>

<style lang="sass" scoped>

  .wrap-img
    position: relative
    width: 100%
    max-width: 50%

    &:after
      content: ''
      display: block
      padding-top: 100%
    
    img
      position: absolute
      top: 0
      left: 0
      object-fit: contain
      object-position: top
      width: 100%
      height: 100%


  .upload-user-avatar-right
    width: 100%
    max-width: 50%


  .wrap-cropper
    width: 100%
    position: relative

    &:after
      content: ''
      display: block
      padding-top: 100%


  .cropper
    background: #DDD
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%


  .user-avatar-img
    border-radius: 100%


  .file-input
    opacity: 0
    position: absolute
    pointer-events: none
    z-index: -9

</style>