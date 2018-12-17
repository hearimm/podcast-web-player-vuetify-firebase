import Vue from "vue";
import "./plugins/axios";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { config } from "./config/firebaseConfig";
// import * as firebase from "firebase";
import firebase from "firebase/app";
import DateFilter from "./filters/dateFilter";

Vue.filter("date", DateFilter);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("user/setUser", firebase.auth().currentUser);
        this.$store.dispatch("user/fetchUserData");
      } else {
        // this.$router.push('/auth')
      }
    });
  }
}).$mount("#app");
