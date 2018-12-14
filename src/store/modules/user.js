import * as firebase from "firebase";

const state = {
  user: null
};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
  }
};

const actions = {
  setUser: ({commit}, payload) => {
    commit("setUser", payload);
  },
  signOut({commit}) {
    firebase.auth().signOut();
    commit("setUser", null);
  }
};

const getters = {
  user: state => state.user,
  isLogged: state => state.user !== null
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
