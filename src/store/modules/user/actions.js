import firebase from 'firebase/app'

import {
  SET_IS_AUTH,
  SET_TOASTED_MESSAGE,
  SET_USER,
  USER_LOADING,
} from "./../../mutation-types";

export default {
  
  user({commit}, uid) {
    commit(USER_LOADING, true);
    
    return firebase.database().ref(`/users/${uid}/info`).once('value')
      .then(data => {
        commit(SET_USER, data.val());
        commit(`auth/${SET_IS_AUTH}`, true, { root: true });
        commit(USER_LOADING, false);
      })
      .catch(error => {
        commit(USER_LOADING, false);
        commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
        throw error;
      })
  },
  
  update({commit, dispatch, state}, formData) {
    commit(USER_LOADING, true);
    
    const userPromise = dispatch('auth/getUserData', null, { root: true });
    
    const updataDB = () => {
      return firebase.database().ref().update({
        [`/users/${state.userData.uid}/info/name`]: formData.data.name,
        [`/users/${state.userData.uid}/info/email`]: formData.data.email
      });
    };
  
    const promiseName = (user) => {
      return user.updateProfile({
        displayName: formData.data.name
      });
    };
    
    const promiseEmail = (user) => {
      return user.updateEmail(formData.data.email);
    };
  
    const promisePassword = (user) => {
      if(formData.passwords.old_password.length && formData.passwords.new_password.length) {
        console.log('before 2');
        return user.updatePassword(formData.passwords.new_password);
      } else {
        return false;
      }
    };
  
    let credential = firebase.auth.EmailAuthProvider.credential(
      state.userData.email,
      formData.passwords.old_password
    );
    
    return userPromise
      .then(user => user)
      .then(user => {
        return user.reauthenticateWithCredential(credential)
          .then(() => {
            console.log('1');
            return user;
          })
          .catch(error => {
            throw error
          });
      })
      .then(user => {
        return Promise.all([promiseName(user), promiseEmail(user), promisePassword(user)]);
      })
      .then(() => {
        console.log('after 2 and all');
        return updataDB();
      })
      .then(() => {
        commit(SET_USER, {...formData.data});
        commit(SET_TOASTED_MESSAGE, {data: {code: 'success'}, type: 'success'}, {root: true});
        commit(USER_LOADING, false);
        return true;
      })
      .catch(error => {
        console.log(error);
        commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
        commit(USER_LOADING, false);
      });
  },
  
}