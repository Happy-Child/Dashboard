import {
  SET_CURRENCY,
  CURRENCY_LOADER,
  SET_TOASTED_MESSAGE,
} from "./../../mutation-types";

export default {
  
  currency({commit}) {
    const url = `https://api.exchangeratesapi.io/latest?symbols=PLN,USD,GBP&base=USD`;
    
    return fetch(url)
      .then(data => data.json())
      .then(data => {
        commit(SET_CURRENCY, data);
        commit(CURRENCY_LOADER, false);
      })
      .catch(error => {
        console.log(error);
        commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
        throw error;
      })
  },
  
}