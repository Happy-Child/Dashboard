<template>

  <v-dialog v-model.trim="modalShow" persistent max-width="600px">
    <v-card>

      <v-btn
        class="btn-close-cross"
        v-if="showCloseCross"
        icon
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-card-title v-if="showHeader">
        <span class="headline">
          {{ title }}
        </span>
      </v-card-title>

      <v-card-text>
        <slot name="body"></slot>
      </v-card-text>

      <v-card-text v-if="showButtons || showSubButtons" class="body-2">
        <v-row v-if="showButtons" class="align-center justify-center mb-4">
          <slot name="buttons">
            <v-col
              :cols="(!showCancel && !customButton) ? 12 : 6"
              v-if="showConfirm"
              class="py-0"
            >
              <v-btn
                class="modal-btn"
                color="success"
                @click="confirm"
                :loading="modalLoading"
                large
              >
                {{ confirmButtonText }}
              </v-btn>
            </v-col>

            <v-col
              :cols="(!showConfirm && !customButton) ? 12 : 6"
              v-if="showCancel"
              class="py-0"
            >
              <v-btn
                class="modal-btn"
                v-if="showCancel"
                color="danger"
                @click="close"
                :loading="modalLoading"
                large
              >
                {{ cancelButtonText }}
              </v-btn>
            </v-col>

            <v-col
              v-if="customButton && !showCancel || !showConfirm"
              :cols="(!showCancel && !showConfirm) ? 12 : 6"
              class="py-0"
            >
              <slot name="customButton"></slot>
            </v-col>
          </slot>
        </v-row>

        <div v-if="showSubButtons" class="d-flex flex-column align-center justify-center">
          <slot name="subButtons"></slot>
        </div>
      </v-card-text>

    </v-card>
  </v-dialog>

</template>

<script>
  export default {
    name: "Modal",

    props: {
      modalLoading: {
        type: Boolean,
        default: false
      },
      modalShow: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: "Modal"
      },
      customButton: {
        type: Boolean,
        default: false
      },
      showButtons: {
        type: Boolean,
        default: true
      },
      showSubButtons: {
        type: Boolean,
        default: true
      },
      showConfirm: {
        type: Boolean,
        default: true
      },
      confirmButtonText: {
        type: String,
        default: ''
      },
      showCancel: {
        type: Boolean,
        default: false
      },
      cancelButtonText: {
        type: String,
        default: 'Cancel'
      },
      showCloseCross: {
        type: Boolean,
        default: true
      },
      closeInEvent: {
        type: Boolean,
        default: true
      },
      showHeader: {
        type: Boolean,
        default: true
      }
    },

    data: () => ({

    }),

    methods: {
      changeLoading(status) {
        this.$emit('changeLoading', status);
      },

      close() {
        this.$emit('close');
      },

      confirm() {
        if(this.closeInEvent) this.close();
        this.$emit('confirm');
      },

      sendForm() {
        if(this.closeInEvent) this.close();
        this.$emit('sendForm');
      }
    }
  }
</script>

<style lang="sass">


</style>
