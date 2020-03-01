import {
  SET_LANG,
} from "./../../mutation-types";

export default {
  [SET_LANG](state, lang) {
    
    if(state.curLang !== lang) {
      localStorage.setItem('lang', lang);
      state.curLang = lang;
    }
    
  },
}
