<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" fixed app>
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/about">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/play">
          <v-list-tile-action>
            <v-icon>music_note</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Player</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/auth" v-if="!isUserAuthenticated">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>SignIn</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="signOut" v-if="isUserAuthenticated">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>SignOut</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <ContactUs></ContactUs>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>배가놈의 텐</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details
          v-model="search"
          @keyup.enter="submitSearch"
          @click:append="submitSearch"
        ></v-text-field>
      </v-layout>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app height="49" id="footer">
      <v-container row py-0 align-center justify-center fill-height>
        <v-layout align-center justify-center fill-height style="max-width:1240px;">
          <v-flex hidden-sm-and-down md12>
            <v-layout align-center justify-center fill-height>
              <audio
                :loop="repeat === 'repeat_one'"
                :src="nowPlaying.src"
                :title="nowPlaying.title"
                controls
                hidden
                id="player"
                ref="player"
              ></audio>
              <v-btn @click.stop="skipPrevious" icon>
                <v-icon>skip_previous</v-icon>
              </v-btn>
              <v-btn @click="audioReplay(10)" icon>
                <v-icon>replay_10</v-icon>
              </v-btn>
              <v-btn @click.stop="playing ? pause() : play()" icon>
                <v-icon v-if="!playing || paused">play_arrow</v-icon>
                <v-icon v-else>pause</v-icon>
              </v-btn>
              <v-btn @click="audioForward(30)" icon>
                <v-icon>forward_30</v-icon>
              </v-btn>
              <v-btn @click.stop="skipNext" icon>
                <v-icon>skip_next</v-icon>
              </v-btn>
              <v-btn @click.stop="shuffle" icon>
                <v-icon>shuffle</v-icon>
              </v-btn>
              <v-btn @click.stop="playerRepeat" icon>
                <v-icon v-if="repeat === ''">repeat</v-icon>
                <v-icon color="primary" v-else>{{repeat}}</v-icon>
              </v-btn>
              <v-btn :disabled="true" icon>{{currentTime}}</v-btn>
              <v-flex align-self-center xs12 sm3 md3 row>
                <v-slider
                  :disabled="!loaded"
                  @click.native="setPosition()"
                  class="ml-2 mr-2"
                  style="height: 49px"
                  v-model="percentage"
                  validate-on-blur
                ></v-slider>
              </v-flex>
              <v-btn :disabled="true" icon>{{duration}}</v-btn>
              <v-btn :disabled="!loaded" @click.native="mute()" icon>
                <v-icon v-if="!isMuted">volume_up</v-icon>
                <v-icon v-else>volume_off</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm12 md5>
            <v-card height="49" id="playerCard">
              <v-layout row fill-height>
                <v-flex align-self-center xs-1 sm-1 md-1>
                  <v-img
                    src="http://img2.sbs.co.kr/sbs_img/2016/03/25/1400x1400_ten.png"
                    height="30px"
                    width="30px"
                    contain
                  ></v-img>
                </v-flex>
                <v-flex xs11 sm11 md8>
                  <v-card-title class="pa-0" @click="goToPlayVue">
                    <v-flex fill-height>
                      <p class="grey--text mb-1" style="font-size: 11px; height: 17px">배성재의 텐</p>
                      <p
                        class="grey--text text--darken-2 ma-0"
                        style="font-size: 11px; height: 17px"
                      >{{nowPlaying.item.title}}</p>
                    </v-flex>
                  </v-card-title>
                </v-flex>
                <!--queue-->
                <v-flex align-self-center id="flex" md2 hidden-sm-and-down>
                  <v-menu v-model="menu" top offset-y :close-on-content-click="false">
                    <v-btn slot="activator" @click="menu = !menu" icon id="anchor">
                      <v-icon>queue_music</v-icon>
                    </v-btn>
                    <v-card height="660px" width="480px">
                      <Infinite></Infinite>
                    </v-card>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import { bus } from "./main";
import ContactUs from "./components/ContactUs.vue";
import Infinite from "./components/Infinite.vue";

// cpu 너무 먹는듯 수정 필요
const formatTime = second =>
  new Date(second * 1000).toISOString().substr(11, 8);

export default {
  name: "App",
  components: {
    ContactUs,
    Infinite
  },
  data() {
    return {
      sideNav: false,
      menu: false,
      contactUsDialog: false,
      search: "",
      audio: undefined,
      percentage: 0,
      currentTime: "00:00:00"
    };
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters["user/isUserAuthenticated"];
    },
    loading: {
      get() {
        return this.$store.getters.loading;
      },
      set(value) {
        this.$store.dispatch("setLoading", value);
      }
    },
    nowPlaying() {
      return this.$store.getters.nowPlaying;
    },
    duration: function() {
      return this.audio ? formatTime(this.totalDuration) : "";
    },
    repeat() {
      return this.$store.getters.repeat;
    },
    autoPlay() {
      return this.$store.getters["player/autoPlay"];
    },
    firstPlay: {
      get() {
        return this.$store.getters["player/firstPlay"];
      },
      set(value) {
        this.$store.dispatch("player/firstPlay", value);
      }
    },
    isMuted() {
      return this.$store.getters["player/isMuted"];
    },
    loaded: {
      get() {
        return this.$store.getters["player/loaded"];
      },
      set(value) {
        this.$store.dispatch("player/loaded", value);
      }
    },
    playing: {
      get() {
        return this.$store.getters["player/playing"];
      },
      set(value) {
        this.$store.dispatch("player/playing", value);
      }
    },
    paused: {
      get() {
        return this.$store.getters["player/paused"];
      },
      set(value) {
        this.$store.dispatch("player/paused", value);
      }
    },
    // percentage: {
    //   get() {
    //     return this.$store.getters["player/percentage"];
    //   },
    //   set(value) {
    //     this.$store.dispatch("player/percentage", value);
    //   }
    // },
    volumePercentage: {
      get() {
        return this.$store.getters["player/volumePercentage"];
      },
      set(value) {
        this.$store.dispatch("player/volumePercentage", value);
      }
    },
    // currentTime: {
    //   get() {
    //     return this.$store.getters["player/currentTime"];
    //   },
    //   set(value) {
    //     this.$store.dispatch("player/currentTime", value);
    //   }
    // },
    totalDuration: {
      get() {
        return this.$store.getters["player/totalDuration"];
      },
      set(value) {
        this.setVolumePosition();
        this.$store.dispatch("player/totalDuration", value);
      }
    }
  },
  watch: {
    nowPlaying: val => {
      console.log(val + "nowplaying changed");
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch("user/signOut");
    },
    submitSearch() {
      this.loading = true;
      this.axios
        .get(
          `https://express-test-hyuk.herokuapp.com/api/itunesSearch?search=${
            this.search
          }`
        )
        .then(response => {
          this.loading = false;
          this.$store.dispatch("setPodcast", response.data.results);
          this.$router.push("/searchResult");
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },

    goToPlayVue() {
      this.$router.push("/play");
    },
    skipNext() {
      this.$store.dispatch("skipNext");
    },
    shuffle() {
      this.$store.dispatch("shufflePlayList");
    },
    playerRepeat() {
      let val = "";
      if (this.repeat === "") {
        val = "repeat";
      } else if (this.repeat === "repeat") {
        val = "repeat_one";
      }
      this.$store.dispatch("setRepeat", val);
    },
    skipPrevious() {
      this.$store.dispatch("skipPrevious");
    },
    audioReplay(val) {
      this.audio.currentTime -= val;
    },
    audioForward(val) {
      this.audio.currentTime += val;
    },
    setPosition() {
      this.audio.currentTime = parseInt(
        (this.audio.duration / 100) * this.percentage
      );
    },
    stop() {
      this.paused = this.playing = false;
      this.audio.pause();
      this.audio.currentTime = 0;
    },
    play() {
      console.log("play");
      if (this.playing) return;
      this.paused = false;
      this.audio
        .play()
        .then(() => (this.playing = true))
        .catch(error => {
          console.log(error);
        });
    },
    pause() {
      this.paused = !this.paused;
      this.playing = false;
      this.paused ? this.audio.pause() : this.audio.play();
    },
    download() {
      this.audio.pause();
      window.open(this.file, "download");
    },
    setVolumePosition() {
      console.log(this.volumePercentage);
      this.audio.volume =
        this.volumePercentage === 0 ? 0 : this.volumePercentage / 100;
    },
    mute() {
      this.isMuted = !this.isMuted;
      this.audio.muted = this.isMuted;
      this.volumeValue = this.isMuted ? 0 : 75;
    },
    reload() {
      this.audio.load();
    },
    _handleLoaded: function() {
      if (this.audio.readyState >= 2) {
        if (this.audio.duration === Infinity) {
          // Fix duration for streamed audio source or blob based
          // https://stackoverflow.com/questions/38443084/how-can-i-add-predefined-length-to-audio-recorded-from-mediarecorder-in-chrome/39971175#39971175
          this.audio.currentTime = 1e101;
          this.audio.ontimeupdate = () => {
            this.audio.ontimeupdate = () => {};
            this.audio.currentTime = 0;
            this.totalDuration = parseInt(this.audio.duration);
            this.loaded = true;
          };
        } else {
          this.totalDuration = parseInt(this.audio.duration);
          this.loaded = true;
        }
        if (this.autoPlay) this.audio.play().then(() => (this.playing = true));
      } else {
        throw new Error("Failed to load sound file");
      }
    },
    _handleVolumechange: function() {
      this.volumePercentage = this.audio.volume * 100;
    },
    _handlePlayingUI: function() {
      this.percentage = (this.audio.currentTime / this.audio.duration) * 100;
      this.currentTime = formatTime(this.audio.currentTime);
    },
    _handlePlayPause: function(e) {
      if (e.type === "play" && this.firstPlay) {
        // in some situations, audio.currentTime is the end one on chrome
        this.audio.currentTime = 0;
        if (this.firstPlay) {
          this.firstPlay = false;
        }
      }
      if (
        e.type === "pause" &&
        this.paused === false &&
        this.playing === false
      ) {
        this.currentTime = "00:00:00";
      }
    },
    _handleEnded() {
      this.paused = this.playing = false;
      if (this.repeat !== "repeat_one") {
        // this.play;
        this.$store.dispatch("skipNext");
      }
    },
    init: function() {
      this.audio.addEventListener("timeupdate", this._handlePlayingUI);
      this.audio.addEventListener("loadeddata", this._handleLoaded);
      this.audio.addEventListener("volumechange", this._handleVolumechange);

      this.audio.addEventListener("pause", this._handlePlayPause);
      this.audio.addEventListener("play", this._handlePlayPause);
      this.audio.addEventListener("ended", this._handleEnded);
    }
  },
  created() {},
  mounted() {
    this.audio = this.$refs.player;
    this.init();

    bus.$on("play", () => {
      console.log("bus play");
      this.play();
    });
    bus.$on("pause", () => {
      console.log("bus pause");
      this.pause();
    });
    bus.$on("audioReplay", val => {
      console.log("bus audioReplay");
      this.audioReplay(val);
    });
    bus.$on("audioForward", val => {
      console.log("bus audioForward");
      this.audioForward(val);
    });
    bus.$on("setPosition", () => {
      console.log("bus setPosition");
      this.setPosition();
    });
    bus.$on("setVolumePosition", () => {
      console.log("bus setVolumePosition");
      this.setVolumePosition();
    });
  },
  beforeDestroy() {
    this.audio.removeEventListener("timeupdate", this._handlePlayingUI);
    this.audio.removeEventListener("loadeddata", this._handleLoaded);
    // 필요 없는 이벤트 리스너인듯
    this.audio.removeEventListener("volumechange", this._handleVolumechange);
    this.audio.removeEventListener("pause", this._handlePlayPause);
    this.audio.removeEventListener("play", this._handlePlayPause);
    this.audio.removeEventListener("ended", this._handleEnded);
  }
};
</script>
<style>
.chosen {
  color: #fff;
  background-color: #c00;
}
</style>
