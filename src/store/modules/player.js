const state = {
  autoPlay: true,
  firstPlay: true,
  isMuted: false,
  loaded: false,
  playing: false,
  paused: false,
  // percentage: 0,
  // currentTime: "00:00:00",
  totalDuration: 0,
  volumePercentage: 100
};

const mutations = {
  autoPlay(state, payload) {
    state.autoPlay = payload;
  },
  firstPlay(state, payload) {
    state.firstPlay = payload;
  },
  isMuted(state, payload) {
    state.isMuted = payload;
  },
  loaded(state, payload) {
    state.loaded = payload;
  },
  playing(state, payload) {
    state.playing = payload;
  },
  paused(state, payload) {
    state.paused = payload;
  },
  // percentage(state, payload) {
  //   state.percentage = payload;
  // },
  // currentTime(state, payload) {
  //   state.currentTime = payload;
  // },
  totalDuration(state, payload) {
    state.totalDuration = payload;
  },
  volumePercentage(state, payload) {
    state.volumePercentage = payload;
  }
};

const actions = {
  autoPlay({ commit }, payload) {
    commit("autoPlay", payload);
  },
  firstPlay({ commit }, payload) {
    commit("firstPlay", payload);
  },
  isMuted({ commit }, payload) {
    commit("isMuted", payload);
  },
  loaded({ commit }, payload) {
    commit("loaded", payload);
  },
  playing({ commit }, payload) {
    commit("playing", payload);
  },
  paused({ commit }, payload) {
    commit("paused", payload);
  },
  // percentage({ commit }, payload) {
  //   commit("percentage", payload);
  // },
  // currentTime({ commit }, payload) {
  //   commit("currentTime", payload);
  // },
  totalDuration({ commit }, payload) {
    commit("totalDuration", payload);
  },
  volumePercentage({ commit }, payload) {
    commit("volumePercentage", payload);
  }
};

const getters = {
  autoPlay: state => {
    return state.autoPlay;
  },
  firstPlay: state => {
    return state.firstPlay;
  },
  isMuted: state => {
    return state.isMuted;
  },
  loaded: state => {
    return state.loaded;
  },
  playing: state => {
    return state.playing;
  },
  paused: state => {
    return state.paused;
  },
  // percentage: state => {
  //   return state.percentage;
  // },
  // currentTime: state => {
  //   return state.currentTime;
  // },
  totalDuration: state => {
    return state.totalDuration;
  },
  volumePercentage: state => {
    return state.volumePercentage;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
