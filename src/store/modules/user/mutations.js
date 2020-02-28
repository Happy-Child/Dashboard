import {
  SET_USER,
  CLEAR_USER,
  USER_LOADING,
} from "./../../mutation-types";

export default {
  [SET_USER](state, user) {
    state.userData = user;
  },
  [USER_LOADING](state, loader) {
    state.userLoading = loader;
  },
  [CLEAR_USER](state) {
    state.userData = {};
    state.userLoading = true
  }
}
