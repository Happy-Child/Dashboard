import {
  SET_SPENDING,
  SPENDING_LOADING,
  SET_SPENDING_SINGLE,
  CLEAR_SPENDING,
} from "./../../mutation-types";

export default {
  [SET_SPENDING](state, spending) {
    if(spending) {
      state.spending = Object.entries(spending).map(item => {
        return {
          id: item[0],
          ...item[1]
        }
      });
    } else {
      state.spending = [];
    }
  },
  
  [SET_SPENDING_SINGLE](state, spendingSingle) {
    state.spendingSingle = spendingSingle;
  },

  [SPENDING_LOADING](state, loader) {
    state.spendingLoading = loader;
  },

  [CLEAR_SPENDING](state) {
    state.spending = [];
    state.spendingSingle = {};
    state.spendingLoading = true;
  },
}
