import {
  SET_CATEGORIES,
  SET_CATEGORY_SINGLE,
  CATEGORIES_LOADING,
  CLEAR_CATEGORIES
} from "./../../mutation-types";

export default {
  [SET_CATEGORIES](state, categories) {
    if(categories) {
      state.categories = Object.entries(categories).map(item => {
        return {
          id: item[0],
          ...item[1]
        }
      });
    } else {
      state.categories = [];
    }
  },
  
  [SET_CATEGORY_SINGLE](state, category) {
    state.categorySingle = category;
  },
  
  [CATEGORIES_LOADING](state, loader) {
    state.categoriesLoading = loader;
  },
  
  [CLEAR_CATEGORIES](state) {
    state.categories = [];
    state.categorySingle = {};
    state.categoriesLoading = true;
  },
}
