import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import globalMixins from './mixins/Global'
import vuetify from './plugins/vuetify';
import Toasted from 'vue-toasted';
import date from './filters/date';
import currency from './filters/currency';
import messages from './utils/toasted-messages'
import Loader from './views/components/Loader'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.filter('date', date);
Vue.filter('currency', currency);
Vue.mixin(globalMixins);
Vue.use(Toasted, {
  duration: 3000
});
Vue.prototype.$messages = messages;

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
