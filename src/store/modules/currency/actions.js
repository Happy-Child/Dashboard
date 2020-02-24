import {
  SET_CURRENCY,
  CURRENCY_LOADER,
} from "./../../mutation-types";

export default {
  
  currency({commit}) {
    const url = `http://data.fixer.io/api/latest?access_key=7a9eea15d61d8e53e269ad83dae9d83b&symbols=BYN,USD,EUR`;
    
    return fetch(url)
      .then(data => data.json())
      .then(data => {
        commit(SET_CURRENCY, data);
        commit(CURRENCY_LOADER, false);
      })
      .catch(error => {
        console.log(error);
        throw error;
      })
  },
  
}