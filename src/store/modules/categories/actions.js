import firebase from 'firebase/app'

import {
  SET_CATEGORIES,
  CATEGORIES_LOADING,
  SET_TOASTED_MESSAGE,
} from "./../../mutation-types";

export default {
  
  categoriesIndex({commit}) {
    commit(CATEGORIES_LOADING, true);
    
    return firebase.database().ref(`/categories`).once('value')
      .then(data => {
        commit(SET_CATEGORIES, data.val());
        commit(CATEGORIES_LOADING, false);
      })
      .catch(error => {
        commit(CATEGORIES_LOADING, false);
        commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
        throw error;
      })
  },
  
  categoriesUpdate({commit, dispatch}, formData) {
    commit(CATEGORIES_LOADING, true);
    
    return firebase.database().ref().update({
      [`/categories/${formData.id}/limit`]: formData.limit,
      [`/categories/${formData.id}/name`]: formData.name
    })
      .then(() => {
        return dispatch('categoriesIndex');
      })
      .catch(error => {
        commit(CATEGORIES_LOADING, false);
        throw error;
      });
  },
  
  categoriesCreate({commit, dispatch}, formData) {
    commit(CATEGORIES_LOADING, true);
    
    return firebase.database().ref(`/categories`).push(formData)
      .then(() => {
        commit(SET_TOASTED_MESSAGE, {data: {code: 'success'}, type: 'success'}, {root: true});
        return dispatch('categoriesIndex');
      })
      .catch(error => {
        commit(CATEGORIES_LOADING, false);
        commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
        throw error;
      })
  }
  
}