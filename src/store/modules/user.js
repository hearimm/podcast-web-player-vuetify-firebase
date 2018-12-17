import * as firebase from "firebase";

const state = {
  user: null,
  subscribes: null
};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
  },
  setSubscribes(state, payload) {
    state.subscribes = { ...payload };
  }
};

const actions = {
  setUser: ({ commit }, payload) => {
    commit("setUser", payload);
  },
  signOut({ commit }) {
    firebase.auth().signOut();
    commit("setUser", null);
  },
  fetchUserData({ commit, getters }) {
    const ref = firebase
      .database()
      .ref("user/")
      .child(getters.user.uid)
      .child("subscribes");

    ref
      .once("value")
      .then(snapshot => {
        commit("setSubscribes", snapshot.val());
      })
      .catch(error => {
        commit("setSubscribes", null);
        console.log(error);
      });
  },
  subscribe({ getters }, payload) {
    const ref = firebase
      .database()
      .ref("user/")
      .child(getters.user.uid)
      .child("subscribes");

    ref
      .push()
      .set(payload)
      .then(() => {
        this.dispatch("user/fetchUserData");
      })
      .catch(error => {
        console.log(error);
      });
  },
  unsubscribe({ getters }, payload) {
    const ref = firebase
      .database()
      .ref("user/")
      .child(getters.user.uid)
      .child("subscribes");
    ref
      .orderByValue()
      .equalTo(payload)
      .once("value", snapshot => {
        snapshot.forEach(childSnaphost => {
          return childSnaphost.ref.remove();
        });
      })
      .then(() => {
        this.dispatch("user/fetchUserData");
        // commit("setSubscribes", snapshot.val());
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const getters = {
  user: state => state.user,
  isLogged: state => state.user !== null,
  isUserAuthenticated(state) {
    return state.user !== null && state.user !== undefined;
  },
  subscribes(state) {
    return state.subscribes;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
