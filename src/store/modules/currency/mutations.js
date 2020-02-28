import {
  SET_CURRENCY,
  CURRENCY_LOADER,
} from "./../../mutation-types";

export default {
  [SET_CURRENCY](state, currency) {
    state.currencyData = currency;
  },
  
  [CURRENCY_LOADER](state, loader) {
    state.currencyLoader = loader;
  },
}
