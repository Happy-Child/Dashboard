import {
  SET_CATEGORIES,
  CATEGORIES_LOADING,
} from "./../../mutation-types";

export default {
  [SET_CATEGORIES](state, categories) {
    if(categories) {
      categories = Object.entries(categories).map(item => {
        return {
          id: item[0],
          ...item[1]
        }
      });

      state.categories = categories;
    } else {
      state.categories = [];
    }
  },
  [CATEGORIES_LOADING](state, loader) {
    state.categoriesLoading = loader;
  },
}
