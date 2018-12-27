import Vue from "vue";
import Vuex from "vuex";
// import podcastData from "../test/resources/podcasts";
// import podcastDetailData from "../test/resources/podcastsDetail";
import user from "./modules/user";
import player from "./modules/player";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    playbackRateList: [1, 1.2, 1.5, 2],
    playbackRateIdx: 0,
    podcasts: [],
    queueItems: [],
    repeat: "",
    nowPlaying: {
      index: 0,
      src: "",
      item: ""
    }
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    incrementPlaybackRateIdx(state) {
      if (state.playbackRateIdx < state.playbackRateList.length - 1) {
        state.playbackRateIdx += 1;
      } else {
        state.playbackRateIdx = 0;
      }
    },
    clearError(state) {
      state.error = null;
    },
    setPodcast(state, payload) {
      state.podcasts = payload;
    },
    setPlayList(state, payload) {
      state.queueItems = payload;
      // state.nowPlaying.index = state.queueItems.findIndex(x => {
      //   return x.enclosure.url === state.nowPlaying.src;
      // });
    },
    playListAdd(state, payload) {
      state.queueItems.push(payload);
    },
    playListAddAll(state, payload) {
      state.queueItems = state.queueItems.concat(payload);
    },
    playListRemoveIndex(state, payload) {
      state.queueItems.splice(payload, 1);
    },

    orderByPublishedDesc(state) {
      // state.queueItems = [state.queueItems[state.nowPlaying.index]];
      let queue = state.queueItems;
      const index = state.nowPlaying.index;
      const length = queue.length;
      let nonTarget = queue.slice(0, index + 1);
      let items = queue.slice(index + 1, length);
      items.sort(function(a, b) {
        if (a.published < b.published) {
          return 1;
        }
        if (a.published > b.published) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      state.queueItems = nonTarget.concat(items);
    },

    orderByPublishedAsc(state) {
      // state.queueItems = [state.queueItems[state.nowPlaying.index]];
      let queue = state.queueItems;
      const index = state.nowPlaying.index;
      const length = queue.length;
      let nonTarget = queue.slice(0, index + 1);
      let items = queue.slice(index + 1, length);
      items.sort(function(a, b) {
        if (a.published > b.published) {
          return 1;
        }
        if (a.published < b.published) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      state.queueItems = nonTarget.concat(items);
    },
    clearPlayList(state) {
      state.queueItems = [state.queueItems[state.nowPlaying.index]];
    },
    setNowPlaying(state, payload) {
      state.nowPlaying.index = payload.index;
      state.nowPlaying.src = payload.src;
      state.nowPlaying.item = payload.item;
    },
    playItem(state, payload) {
      state.nowPlaying.index = payload.index;
      state.nowPlaying.src = payload.item.enclosure.url;
      state.nowPlaying.item = payload.item;
    },
    clearPlayItem(state) {
      state.nowPlaying.index = 0;
      state.nowPlaying.src = "";
      state.nowPlaying.item = "";
    },
    findSetNowPlayingIndex(state) {
      state.nowPlaying.index = state.queueItems.findIndex(x => {
        return x.enclosure.url === state.nowPlaying.src;
      });
    },
    shufflePlayList(state) {
      function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }

      /**
       * Shuffles array in place. ES6 version
       * @param {Array} a items An array containing the items.
       */
      function shuffle(a) {
        var x = [].concat(a);
        for (let i = a.length - 1; i > state.nowPlaying.index; i--) {
          // min (포함) 과 max (불포함) 사이의 난수를 반환
          const j = getRandomArbitrary(a.length, state.nowPlaying.index + 1);
          [x[i], x[j]] = [x[j], x[i]];
        }
        return x;
      }

      state.queueItems = shuffle(state.queueItems);
      //only reason Object change event
      // state.queueItems = state.queueItems.sort();
    },
    setRepeat(state, payload) {
      state.repeat = payload;
    }
  },
  actions: {
    clearError({ commit }) {
      commit("clearError");
    },
    setLoading({ commit }, payload) {
      commit("setLoading", payload);
    },
    incrementPlaybackRateIdx({ commit }) {
      commit("incrementPlaybackRateIdx");
    },
    setPodcast({ commit }, payload) {
      commit("setPodcast", payload);
    },
    setPlayList({ commit }, payload) {
      commit("setPlayList", payload);
      commit("findSetNowPlayingIndex");
    },
    playListAdd({ commit, getters }, payload) {
      commit("playListAdd", payload);
      if (getters.nowPlaying.src === "") {
        commit("playItem", { index: 0, item: getters.queueItems[0] });
      }
    },
    playListAddAll({ commit, getters }, payload) {
      commit("playListAddAll", payload);
      if (getters.nowPlaying.src === "") {
        commit("playItem", { index: 0, item: getters.queueItems[0] });
      }
    },
    playListRemoveIndex({ commit }, payload) {
      commit("playListRemoveIndex", payload);
      commit("findSetNowPlayingIndex");
    },
    clearPlayList({ commit }) {
      commit("clearPlayList");
      commit("findSetNowPlayingIndex");
    },
    orderByPublishedAsc({ commit }) {
      commit("orderByPublishedAsc");
      commit("findSetNowPlayingIndex");
    },
    orderByPublishedDesc({ commit }) {
      commit("orderByPublishedDesc");
      commit("findSetNowPlayingIndex");
    },
    playItem({ commit }, payload) {
      commit("playItem", payload);
    },
    shufflePlayList({ commit }) {
      commit("shufflePlayList");
    },
    skipNext({ commit, getters }) {
      let nextIndex = getters.nowPlaying.index + 1;
      let length = getters.queueItems.length;
      if (length > nextIndex) {
        let nextItem = {
          index: nextIndex,
          item: getters.queueItems[nextIndex]
        };
        commit("playItem", nextItem);
      } else if (getters.repeat == "repeat") {
        let firstItem = { index: 0, item: getters.queueItems[0] };
        commit("playItem", firstItem);
      }
    },
    skipPrevious({ commit, getters }) {
      let beforeIndex = getters.nowPlaying.index - 1;
      if (beforeIndex >= 0) {
        let beforeItem = {
          index: beforeIndex,
          item: getters.queueItems[beforeIndex]
        };
        commit("playItem", beforeItem);
      }
    },
    setRepeat({ commit }, payload) {
      commit("setRepeat", payload);
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    playbackRateList(state) {
      return state.playbackRateList;
    },
    playbackRateIdx(state) {
      return state.playbackRateIdx;
    },
    playbackRateValue(state) {
      return state.playbackRateList[state.playbackRateIdx];
    },
    podcasts(state) {
      return state.podcasts;
    },
    queueItems(state) {
      return state.queueItems;
    },
    nowPlaying(state) {
      return state.nowPlaying;
    },
    repeat(state) {
      return state.repeat;
    }
  },
  modules: {
    user,
    player
  }
});
