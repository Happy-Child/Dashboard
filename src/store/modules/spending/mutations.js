import {
  SET_SPENDING,
  SPENDING_LOADING,
} from "./../../mutation-types";

export default {
  [SET_SPENDING](state, spending) {
    if(spending) {
      spending = Object.entries(spending).map(item => {
        return {
          id: item[0],
          ...item[1]
        }
      });

      state.spending = spending;
    } else {
      state.spending = [];
    }
  },
  [SPENDING_LOADING](state, loader) {
    state.spendingLoading = loader;
  },
}
