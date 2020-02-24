import firebase from 'firebase/app'

import {
  SET_SPENDING,
  SPENDING_LOADING,
  SET_TOASTED_MESSAGE,
  USER_LOADING,
} from "./../../mutation-types";

export default {
  
  spendingIndex({commit}) {
    commit(SPENDING_LOADING, true);
    
    return firebase.database().ref(`/spending`).once('value')
      .then(data => {
        commit(SET_SPENDING, data.val());
        commit(SPENDING_LOADING, false);
      })
      .catch(error => {
        commit(SPENDING_LOADING, false);
        commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
        throw error;
      })
  },

  spendingCreate({commit, dispatch, rootState}, data) {
    commit(SPENDING_LOADING, true);
    commit(`user/${USER_LOADING}`, true, { root: true });
    
    const uid = rootState.user.userData.uid;
    
    const updateUserBill = () => {
      return firebase.database().ref().update({
        [`/users/${uid}/info/bill`]: data.newBill,
      });
    };

    return firebase.database().ref(`/spending`).push({
      ...data.formData,
      date: Date.now()
      })
        .then(() => {
          return Promise.all([
            updateUserBill(),
            dispatch('spendingIndex'),
            dispatch('user/user', uid, { root: true })
          ]);
        })
        .then(() => {
          commit(SET_TOASTED_MESSAGE, {data: {code: 'success'}, type: 'success'}, {root: true});
        })
        .catch(error => {
          commit(SPENDING_LOADING, false);
          commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
          throw error;
        })
  }
  
}