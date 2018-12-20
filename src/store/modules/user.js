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
    commit("setSubscribes", null);
  },
  fetchUserData({ commit, getters }) {
    commit("setLoading", true, { root: true });
    const ref = firebase
      .database()
      .ref("user/")
      .child(getters.user.uid)
      .child("subscribes");

    ref
      .once("value")
      .then(snapshot => {
        commit("setSubscribes", snapshot.val());
        commit("setLoading", false, { root: true });
      })
      .catch(error => {
        commit("setSubscribes", null);
        commit("setLoading", false, { root: true });
        console.log(error);
      });
  },

  fetchUnLoginUserData({ commit }) {
    commit("setSubscribes", {
      "-LTvjJh60QogJw2n2TiC": {
        artistId: 419028603,
        artistName: "SBS",
        artistViewUrl:
          "https://itunes.apple.com/kr/artist/sbs/419028603?mt=2&uo=4",
        artworkUrl100:
          "https://is2-ssl.mzstatic.com/image/thumb/Music71/v4/87/a7/04/87a7040f-c844-b936-533b-aace536687f0/source/100x100bb.jpg",
        artworkUrl30:
          "https://is2-ssl.mzstatic.com/image/thumb/Music71/v4/87/a7/04/87a7040f-c844-b936-533b-aace536687f0/source/30x30bb.jpg",
        artworkUrl60:
          "https://is2-ssl.mzstatic.com/image/thumb/Music71/v4/87/a7/04/87a7040f-c844-b936-533b-aace536687f0/source/60x60bb.jpg",
        artworkUrl600:
          "https://is2-ssl.mzstatic.com/image/thumb/Music71/v4/87/a7/04/87a7040f-c844-b936-533b-aace536687f0/source/600x600bb.jpg",
        collectionCensoredName: "배성재의 텐",
        collectionExplicitness: "cleaned",
        collectionHdPrice: 0,
        collectionId: 1096961355,
        collectionName: "배성재의 텐",
        collectionPrice: 0,
        collectionViewUrl:
          "https://itunes.apple.com/kr/podcast/%EB%B0%B0%EC%84%B1%EC%9E%AC%EC%9D%98-%ED%85%90/id1096961355?mt=2&uo=4",
        contentAdvisoryRating: "Clean",
        country: "KOR",
        currency: "KRW",
        feedUrl: "http://wizard2.sbs.co.kr/w3/podcast/V2000009300.xml",
        genreIds: ["1310", "26"],
        genres: ["음악", "팟캐스트"],
        kind: "podcast",
        primaryGenreName: "음악",
        releaseDate: "2018-12-16T13:00:00Z",
        trackCensoredName: "배성재의 텐",
        trackCount: 300,
        trackExplicitness: "cleaned",
        trackHdPrice: 0,
        trackHdRentalPrice: 0,
        trackId: 1096961355,
        trackName: "배성재의 텐",
        trackPrice: 0,
        trackRentalPrice: 0,
        trackViewUrl:
          "https://itunes.apple.com/kr/podcast/%EB%B0%B0%EC%84%B1%EC%9E%AC%EC%9D%98-%ED%85%90/id1096961355?mt=2&uo=4",
        wrapperType: "track"
      },
      "-LTvjrEHOWpEXqFSD-dB": {
        artistId: 419028603,
        artistName: "SBS",
        artistViewUrl:
          "https://itunes.apple.com/kr/artist/sbs/419028603?mt=2&uo=4",
        artworkUrl100:
          "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/a4/03/dd/a403ddfb-c8b6-ca57-c4cc-2cd025a12442/source/100x100bb.jpg",
        artworkUrl30:
          "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/a4/03/dd/a403ddfb-c8b6-ca57-c4cc-2cd025a12442/source/30x30bb.jpg",
        artworkUrl60:
          "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/a4/03/dd/a403ddfb-c8b6-ca57-c4cc-2cd025a12442/source/60x60bb.jpg",
        artworkUrl600:
          "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/a4/03/dd/a403ddfb-c8b6-ca57-c4cc-2cd025a12442/source/600x600bb.jpg",
        collectionCensoredName: "배성재, 정용국의 더덕퀴즈쇼",
        collectionExplicitness: "cleaned",
        collectionHdPrice: 0,
        collectionId: 1338652171,
        collectionName: "배성재, 정용국의 더덕퀴즈쇼",
        collectionPrice: 0,
        collectionViewUrl:
          "https://itunes.apple.com/kr/podcast/%EB%B0%B0%EC%84%B1%EC%9E%AC-%EC%A0%95%EC%9A%A9%EA%B5%AD%EC%9D%98-%EB%8D%94%EB%8D%95%ED%80%B4%EC%A6%88%EC%87%BC/id1338652171?mt=2&uo=4",
        contentAdvisoryRating: "Clean",
        country: "KOR",
        currency: "KRW",
        feedUrl: "http://wizard2.sbs.co.kr/w3/podcast/V2000010730.xml",
        genreIds: ["1304", "26"],
        genres: ["교육", "팟캐스트"],
        kind: "podcast",
        primaryGenreName: "교육",
        releaseDate: "2018-12-10T01:56:00Z",
        trackCensoredName: "배성재, 정용국의 더덕퀴즈쇼",
        trackCount: 46,
        trackExplicitness: "cleaned",
        trackHdPrice: 0,
        trackHdRentalPrice: 0,
        trackId: 1338652171,
        trackName: "배성재, 정용국의 더덕퀴즈쇼",
        trackPrice: 0,
        trackRentalPrice: 0,
        trackViewUrl:
          "https://itunes.apple.com/kr/podcast/%EB%B0%B0%EC%84%B1%EC%9E%AC-%EC%A0%95%EC%9A%A9%EA%B5%AD%EC%9D%98-%EB%8D%94%EB%8D%95%ED%80%B4%EC%A6%88%EC%87%BC/id1338652171?mt=2&uo=4",
        wrapperType: "track"
      },
      "-LTvjtiKBamqB-O2MtxR": {
        artistId: 419028603,
        artistName: "SBS",
        artistViewUrl:
          "https://itunes.apple.com/kr/artist/sbs/419028603?mt=2&uo=4",
        artworkUrl100:
          "https://is5-ssl.mzstatic.com/image/thumb/Music71/v4/68/ad/a6/68ada6c2-b599-e40a-63c1-6bebdadbb60b/source/100x100bb.jpg",
        artworkUrl30:
          "https://is5-ssl.mzstatic.com/image/thumb/Music71/v4/68/ad/a6/68ada6c2-b599-e40a-63c1-6bebdadbb60b/source/30x30bb.jpg",
        artworkUrl60:
          "https://is5-ssl.mzstatic.com/image/thumb/Music71/v4/68/ad/a6/68ada6c2-b599-e40a-63c1-6bebdadbb60b/source/60x60bb.jpg",
        artworkUrl600:
          "https://is5-ssl.mzstatic.com/image/thumb/Music71/v4/68/ad/a6/68ada6c2-b599-e40a-63c1-6bebdadbb60b/source/600x600bb.jpg",
        collectionCensoredName: "배성재의 주말 유나이티드",
        collectionExplicitness: "cleaned",
        collectionHdPrice: 0,
        collectionId: 1060470633,
        collectionName: "배성재의 주말 유나이티드",
        collectionPrice: 0,
        collectionViewUrl:
          "https://itunes.apple.com/kr/podcast/%EB%B0%B0%EC%84%B1%EC%9E%AC%EC%9D%98-%EC%A3%BC%EB%A7%90-%EC%9C%A0%EB%82%98%EC%9D%B4%ED%8B%B0%EB%93%9C/id1060470633?mt=2&uo=4",
        contentAdvisoryRating: "Clean",
        country: "KOR",
        currency: "KRW",
        feedUrl: "http://wizard2.sbs.co.kr/w3/podcast/V2000008824.xml",
        genreIds: ["1309", "26"],
        genres: ["TV 및 영화", "팟캐스트"],
        kind: "podcast",
        primaryGenreName: "TV 및 영화",
        releaseDate: "2016-03-27T13:00:00Z",
        trackCensoredName: "배성재의 주말 유나이티드",
        trackCount: 42,
        trackExplicitness: "cleaned",
        trackHdPrice: 0,
        trackHdRentalPrice: 0,
        trackId: 1060470633,
        trackName: "배성재의 주말 유나이티드",
        trackPrice: 0,
        trackRentalPrice: 0,
        trackViewUrl:
          "https://itunes.apple.com/kr/podcast/%EB%B0%B0%EC%84%B1%EC%9E%AC%EC%9D%98-%EC%A3%BC%EB%A7%90-%EC%9C%A0%EB%82%98%EC%9D%B4%ED%8B%B0%EB%93%9C/id1060470633?mt=2&uo=4",
        wrapperType: "track"
      }
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
      .orderByChild("collectionId")
      .equalTo(parseInt(payload))
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
