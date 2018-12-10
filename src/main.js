import Vue from "vue";
import "./plugins/axios";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebaseConfig from "./config/firebaseConfig";
import * as firebase from "firebase";
require("dotenv").config();

Vue.config.productionTip = false;

console.log(firebaseConfig.API_KEY);
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: firebaseConfig.VUE_APP_API_KEY,
      authDomain: firebaseConfig.VUE_APP_AUTH_DOMAIN,
      databaseURL: firebaseConfig.VUE_APP_DATABASE_URL,
      projectId: firebaseConfig.VUE_APP_PROJECT_ID,
      storageBucket: firebaseConfig.VUE_APP_STORAGE_BUCKET
    });
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.$store.dispatch("autoSignIn", user);
    //     this.$store.dispatch("fetchUserData");
    //   }
    // });
    // this.$store.dispatch("loadMeetups");
  }
}).$mount("#app");
