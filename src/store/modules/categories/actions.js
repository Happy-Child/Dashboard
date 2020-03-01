import firebase from 'firebase/app'

import {
  SET_CATEGORIES,
  CATEGORIES_LOADING,
  SET_TOASTED_MESSAGE,
  SET_CATEGORY_SINGLE,
} from "./../../mutation-types";

export default {
  
  categorySingle({commit, rootState}, id) {
    commit(CATEGORIES_LOADING, true);
  
    const uid = rootState.user.userData.uid;
    
    return firebase.database().ref(`/user_categories/${uid}/${id}`).once('value')
      .then(data => {
        commit(CATEGORIES_LOADING, false);
        if(data.val()) commit(SET_CATEGORY_SINGLE, data.val());
      })
      .catch(error => {
        commit(CATEGORIES_LOADING, false);
        commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
        throw error;
      })
  },
  
  categoriesIndex({commit, rootState}) {
    commit(CATEGORIES_LOADING, true);
  
    const uid = rootState.user.userData.uid;
    
    return firebase.database().ref(`/user_categories/${uid}`).once('value')
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
  
  categoriesUpdate({commit, dispatch, rootState}, formData) {
    commit(CATEGORIES_LOADING, true);
  
    const uid = rootState.user.userData.uid;
    
    return firebase.database().ref().update({
      [`/user_categories/${uid}/${formData.id}/limit`]: formData.limit,
      [`/user_categories/${uid}/${formData.id}/name`]: formData.name
    })
      .then(() => {
        commit(SET_CATEGORY_SINGLE, {...formData});
        return dispatch('categoriesIndex');
      })
      .catch(error => {
        commit(CATEGORIES_LOADING, false);
        throw error;
      });
  },
  
  categoriesCreate({commit, dispatch, rootState}, formData) {
    commit(CATEGORIES_LOADING, true);
  
    const uid = rootState.user.userData.uid;
    
    return firebase.database().ref(`/user_categories/${uid}`).push(formData)
      .then(() => {
        return dispatch('categoriesIndex');
      })
      .catch(error => {
        commit(CATEGORIES_LOADING, false);
        commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
        throw error;
      })
  }
  
}