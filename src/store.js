// import * as firebase from "firebase";
import Vue from "vue";
import Vuex from "vuex";
import podcasts from "./test/resources/podcasts";
import podcastDetail from "./test/resources/podcastsDetail";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    podcasts: podcasts.data,
    detailData: podcastDetail.data,
    queueItems: [],
    nowPlaying: null
  },
  mutations: {
    setDetailData(state, payload) {
      state.detailData = payload;
      // state.loading = true;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setPodcast(state, payload) {
      state.podcasts = payload;
    },
    addPlaylist(state, payload) {
      state.queueItems.push(payload);
    },
    removePlaylist(state, payload) {
      state.queueItems.slice(payload, 1);
    },
    clearPlaylist(state) {
      state.queueItems = [];
    },
    setNowPlaying(state, payload) {
      state.nowPlaying = payload;
    }
  },
  actions: {
    clearError({ commit }) {
      commit("clearError");
    },
    setLoading({ commit }, payload) {
      commit("setLoading", payload);
    },
    setPodcast({ commit }, payload) {
      commit("setPodcast", payload);
    },
    loadDetailData({ commit }, payload) {
      console.log(commit, payload);
      //commit("setLoading", true);
      // firebase
      //   .database()
      //   .ref("podcasts/collectionId/")
      //   .child(payload.id)
      //   .once("value")
      //   .then(snapshot => {
      //     commit("setDetailData", snapshot.val());
      //     commit("setLoading", false);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     // commit("setLoading", false);
      //   });
    },
    addPlaylist({ commit }, payload) {
      commit("addPlaylist", payload);
    },
    clearPlaylist({ commit }) {
      commit("clearPlaylist");
    },
    removePlaylist({ commit }, payload) {
      commit("removePlaylist", payload);
    },
    setNowPlaying({ commit }, payload) {
      commit("setNowPlaying", payload);
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    podcasts(state) {
      return state.podcasts;
    },
    detailData(state) {
      return state.detailData;
    },
    queueItems(state) {
      return state.queueItems;
    },
    nowPlaying(state) {
      return state.nowPlaying;
    }
  }
});
