import firebase from 'firebase/app'

import {
  SET_IS_AUTH,
  SET_TOASTED_MESSAGE,
  CLEAR_USER,
} from "./../../mutation-types";

export default {
  
  login({commit}, userData) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
        .then(data => {
          commit(SET_IS_AUTH, true);
          return true;
        })
        .catch(error => {
          commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
          throw error;
        });
  },
  
  logout({commit}) {
    return firebase
      .auth()
      .signOut()
        .then(() => {
          commit(SET_IS_AUTH, false);
          commit(`user/${CLEAR_USER}`, null, { root: true });
          return true;
        })
        .catch(error => {
          commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
          throw error;
        });
  },
  
  registration({commit, dispatch}, userData) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(() => {
        return dispatch('getUid');
      })
      .then(uid => {
        return firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            bill: userData.bill,
            name: userData.name,
            email: userData.email,
            uid: uid
          });
      })
      .catch(error => {
        commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
        throw error;
      });
  
  },
  
  getUserData() {
    return firebase.auth().currentUser;
  },
  
  getUid({dispatch}) {
    const user = firebase.auth().currentUser;
    return user ? user.uid : null;
  },
  
  curAuth({commit, dispatch}) {
    return new Promise((resolve, error) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit(SET_IS_AUTH, true);
          dispatch('user/user', user.uid, { root: true });
          resolve(user);
        }
      })
    })
  },
  
}