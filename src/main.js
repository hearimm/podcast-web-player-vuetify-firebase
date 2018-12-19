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

export const bus = new Vue();
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

export const formatTime = function(param) {
  var sec_num = parseInt(param, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};
