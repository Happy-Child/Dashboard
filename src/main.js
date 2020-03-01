require('./bootstrap');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Toasted from 'vue-toasted';
import VueMeta from 'vue-meta'

import lang from './localization'
import globalMixins from './mixins/global'
import date from './filters/date';
import currency from './filters/currency';
import Loader from './views/components/Loader'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

Vue.filter('date', date);
Vue.filter('currency', currency);

Vue.mixin(globalMixins);

Vue.use(Toasted, {
  duration: 3000
});

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});

Vue.prototype.$lang = lang;

Vue.component('loader', Loader);

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyDJ_hmLwMP3AzvwvO5h0EkXEzPEevpNeRA",
  authDomain: "example-cc527.firebaseapp.com",
  databaseURL: "https://example-cc527.firebaseio.com",
  projectId: "example-cc527",
  storageBucket: "example-cc527.appspot.com",
  messagingSenderId: "392423123195",
  appId: "1:392423123195:web:4791e8f7d13738e393e85e",
  measurementId: "G-YXGL3K179M"
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  }
  
});
