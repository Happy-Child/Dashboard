<template>

  <v-row>
    <v-col cols="12" md="6">
      <loader v-if="userLoading"/>

      <v-form
        v-else
        ref="form"
        lazy-validation
      >
        <div class="upload-user-avatar d-flex flex-wrap align-start mb-5">
          <div class="wrap-img">
            <img class="user-avatar-img" :src="userData.avatarUrl" alt="">
          </div>

          <div class="upload-user-avatar-right pl-0 pl-md-8">
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
              <v-col cols="12" md="6">
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
                  <span>{{ language.common.uploadAvatar }}</span>
                </v-btn>
              </v-col>

              <v-col cols="12" md="6" v-if="cropperImage">
                <v-btn
                  class="cropper-btn"
                  color="warning"
                  @click="cropperReset()"
                  large
                >
                  <span>{{ language.common.removeAvatar }}</span>
                </v-btn>
              </v-col>
            </v-row>


            <span class="d-block">{{ language.common.maxSize }} - {{ (maxFileSize / 1000000).toFixed(2) }}MB</span>
          </div>
        </div>

        <v-text-field
          v-model.trim="formData.name"
          :counter="20"
          :rules="rules.name"
          :label="language.form.name"
          required
        ></v-text-field>

        <v-text-field
          v-model.trim="formData.email"
          :rules="rules.email"
          :label="language.form.email"
          required
        ></v-text-field>

        <v-text-field
          v-model.trim="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          :rules="rules.password"
          name="Password"
          :label="language.form.password"
          counter
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <div class="d-flex mb-4">
          <span class="mr-2">{{ language.modals.forgotPassword }}</span>

          <span
            @click="toggleModal"
            class="font-weight-medium warning--text cursor-pointer"
          >{{ language.modals.passwordRecovery }}</span>
        </div>

        <v-btn
          color="success"
          @click="validateForm"
          large
          :disabled="disabled"
        >
          {{ language.modals.confirm }}
        </v-btn>

      </v-form>
    </v-col>

    <modal
      title="sendResetPassword"
      :modalShow="modalShow"
      :modalLoading="modalLoading"
      :closeInEvent="false"
      @close="toggleModal"
      @confirm="startResetPassword"
    ></modal>

  </v-row>

</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { Cropper, CircleStencil } from 'vue-advanced-cropper'
  import Modal from './../../../components/Modal'
  import FormRules from './../../../../mixins/form-rules'
  import ModalMethods from './../../../../mixins/modal-methods'
  import ResetPassword from './../../../../mixins/reset-password'

  export default {
    name: "PageContent",

    mixins: [FormRules, ModalMethods, ResetPassword],

    data: () => ({
      modalShow: false,
      showPassword: false,
      disabled: true,
      cropperShow: false,
      cropperImage: '',
      maxFileSize: 2000000,
      newAvatar: {
        name: '',
        string: ''
      },
      formData: {
        avatarUrl: '',
        name: '',
        email: ''
      },
      password: '',
    }),

    watch: {
      userData: {
        handler(data) {
          this.formData = {...data};
        },
        immediate: true,
      },

      formData: {
        handler(data) {
          this.disabled = true;
          this.disabled = JSON.stringify(data) === JSON.stringify(this.userData);
        },
        deep: true
      }
    },

    methods: {
      ...mapActions('user', [
        'updateUser',
        'getUser',
      ]),

      ...mapActions('auth', [
        'forgotPassword',
      ]),

      toggleModal() {
        this.modalShow = !this.modalShow;
      },

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
          const messageType = this.language.toasted['max-avatar-size'];
          this.$toasted.error(messageType);
        }
      },

      validateForm () {
        if(this.$refs.form.validate() && !this.disabled) this.startUpdate();
      },

      startUpdate() {
        let formData = {
          data: {
            ...this.formData,
            newAvatar: this.newAvatar,
          },
          password: this.password
        };

        this.updateUser(formData)
          .then(() => {
            this.getUser(this.userData.uid);
            this.showMessage('success', 'success');
            this.resetForm();
          })
          .catch(error => {
            console.log(error);
            this.resetForm();
          })
      },

      startResetPassword() {
        this.resetPassword()
          .then(() => {
            this.toggleModal();
          })
      },

      resetForm() {
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
      Modal
    }
  }
</script>

<style lang="sass" scoped>

  .wrap-img
    position: relative
    width: 100%
    max-width: 50%

    @media(max-width: 960px)
      max-width: 500px
      margin-left: auto
      margin-right: auto
      margin-bottom: 3rem


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

    @media(max-width: 960px)
      margin-left: auto
      margin-right: auto
      max-width: 500px


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