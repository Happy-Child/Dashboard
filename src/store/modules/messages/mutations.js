import {
  SET_TOASTED_MESSAGE,
  CLEAR_TOASTED_MESSAGE
} from "./../../mutation-types";

export default {
  [SET_TOASTED_MESSAGE](state, messageData) {
    state.toastedMessage = messageData;
  },
  
  [CLEAR_TOASTED_MESSAGE](state) {
    state.toastedMessage = '';
  }
}
