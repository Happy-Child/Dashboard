import {
  SET_IS_AUTH,
} from "./../../mutation-types";

export default {
  [SET_IS_AUTH](state, isAuth) {
    state.isAuth = isAuth;
  }
}
