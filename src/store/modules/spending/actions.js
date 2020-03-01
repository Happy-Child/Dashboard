import firebase from 'firebase/app'

import {
  SET_SPENDING,
  SET_SPENDING_SINGLE,
  SPENDING_LOADING,
  SET_TOASTED_MESSAGE,
  USER_LOADING,
} from "./../../mutation-types";

export default {
  
  spendingSingle({commit, rootState}, id) {
    commit(SPENDING_LOADING, true);
  
    const uid = rootState.user.userData.uid;
    
    return firebase.database().ref(`/user_spending/${uid}/${id}`).once('value')
      .then(data => {
        commit(SPENDING_LOADING, false);
        if(data.val()) commit(SET_SPENDING_SINGLE, data.val());
      })
      .catch(error => {
        commit(SPENDING_LOADING, false);
        commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
        throw error;
      })
  },
  
  spendingIndex({commit, rootState}) {
    commit(SPENDING_LOADING, true);
  
    const uid = rootState.user.userData.uid;
    
    return firebase.database().ref(`/user_spending/${uid}`).once('value')
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
        [`/users/${uid}/bill`]: data.newBill,
      });
    };
    
    return firebase.database().ref(`/user_spending/${uid}`).push({
        ...data.formData,
        date: Date.now()
      })
        .then(() => {
          return Promise.all([
            updateUserBill(),
            dispatch('spendingIndex'),
            dispatch('user/getUser', uid, { root: true })
          ]);
        })
        .catch(error => {
          commit(SPENDING_LOADING, false);
          commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
          throw error;
        })
  }
  
}