import firebase from 'firebase/app'

import {
  SET_IS_AUTH,
  SET_TOASTED_MESSAGE,
  SET_USER,
  USER_LOADING,
} from "./../../mutation-types";

export default {
  
  indexUsers({commit}) {
  
  },
  
  getUser({commit, state}, uid) {
    commit(USER_LOADING, true);
    
    return firebase.database().ref(`/users/${uid}`).once('value')
      .then(data => {
        commit(SET_USER, data.val());
        commit(`auth/${SET_IS_AUTH}`, true, { root: true });
        return firebase.storage().ref().child(data.val().avatar);
      })
      .then(data => {
        return data.getDownloadURL();
      })
      .then(url => {
        const userData = state.userData;
        commit(SET_USER, {
          ...userData,
          avatarUrl: url
        });
        commit(USER_LOADING, false);
      })
      .catch(error => {
        commit(USER_LOADING, false);
        commit(SET_TOASTED_MESSAGE, {data: error, type: 'error'}, {root: true});
        throw error;
      })
  },
  
  updateUser({commit, dispatch, state}, formData) {
    commit(USER_LOADING, true);
    
    // Parts
    const updateUserAvatar = () => {
      return firebase.storage().ref()
        .child(formData.data.newAvatar.name)
        .putString(formData.data.newAvatar.string, 'data_url')
        .then(() => {
          return firebase.database().ref().update({
            [`/users/${state.userData.uid}/avatar`]: formData.data.newAvatar.name
          });
        })
        .catch(error => {
          console.log(error);
        });
    };
    
    const updateUserDataDB = () => {
      return firebase.database().ref().update({
          [`/users/${state.userData.uid}/name`]: formData.data.name,
          [`/users/${state.userData.uid}/email`]: formData.data.email
        })
        .then(() => {
          if(formData.data.newAvatar.string && formData.data.newAvatar.name) {
            return updateUserAvatar();
          }
        })
        .catch(error => {
          console.log(error);
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
  
    let credential = firebase.auth.EmailAuthProvider.credential(
      state.userData.email,
      formData.password
    );
    
    // Promise
    return dispatch('getCurrentUser')
      .then(user => user)
      .then(user => {
        return user.reauthenticateWithCredential(credential)
          .then(() => {
            return user;
          })
          .catch(error => {
            throw error
          });
      })
      .then(user => {
        return Promise.all([promiseName(user), promiseEmail(user)]);
      })
      .then(() => {
        return updateUserDataDB();
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
  
  getCurrentUser() {
    return firebase.auth().currentUser;
  }
  
}