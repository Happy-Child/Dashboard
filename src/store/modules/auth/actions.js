import firebase from 'firebase/app'
import config from './../../../config'

import {
  SET_IS_AUTH,
  SET_TOASTED_MESSAGE,
  CLEAR_USER,
  SET_USER,
  CLEAR_TOASTED_MESSAGE,
  CLEAR_SPENDING,
  CLEAR_CATEGORIES,
} from "./../../mutation-types";

export default {
  
  login({commit}, userData) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
        .then(() => {
          commit(SET_IS_AUTH, true);
          return true;
        })
        .catch(error => {
          throw error;
        });
  },
  
  logout({commit}) {
    return firebase
      .auth()
      .signOut()
        .then(() => {
          commit(SET_IS_AUTH, false);
          commit(CLEAR_TOASTED_MESSAGE, null, { root: true });
          commit(`spending/${CLEAR_SPENDING}`, null, { root: true });
          commit(`categories/${CLEAR_CATEGORIES}`, null, { root: true });
          commit(`user/${CLEAR_USER}`, null, { root: true });
          return true;
        })
        .catch(error => {
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
          .ref(`/users/${uid}`)
          .set({
            avatar: config.default_user_avatar,
            bill: userData.bill,
            name: userData.name,
            email: userData.email,
            uid: uid
          });
      })
      .catch(error => {
        throw error;
      });
  
  },
  
  getUid({}) {
    const user = firebase.auth().currentUser;
    return user ? user.uid : null;
  },
  
  curAuth({commit, dispatch}) {
    return new Promise((resolve, error) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit(`user/${SET_USER}`, {uid: user.uid}, { root: true });
          commit(SET_IS_AUTH, true);
          dispatch('user/getUser', user.uid, { root: true });
          resolve(user);
        }
      })
    })
  },

  forgotPassword({commit}, userData) {
    return firebase.auth().sendPasswordResetEmail(userData.email)
      .then(() => {})
      .catch(error => {
        throw error;
      });
  },
  
}