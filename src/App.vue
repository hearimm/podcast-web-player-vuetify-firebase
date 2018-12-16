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
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>배가놈의 텐</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field
          :append-icon-cb="() => {}"
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
      <v-layout fill-height>
        <audio
          :loop="repeat === 'repeat_one'"
          :src="nowPlaying.src"
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
        <v-flex align-self-center xs12 sm3 row>
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
        <v-spacer></v-spacer>

        <v-flex xs12 sm6>
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
              <v-flex xs-2 sm-2 md-2>
                <v-card-title class="pa-0">
                  <v-flex fill-height>
                    <p class="grey--text mb-1" style="font-size: 11px; height: 17px">배성재의 텐</p>
                    <p
                      class="grey--text text--darken-2 ma-0"
                      style="font-size: 11px; height: 17px"
                    >{{nowPlaying.item.title}}</p>
                  </v-flex>
                </v-card-title>
              </v-flex>
              <v-spacer></v-spacer>
              <!--queue-->
              <v-flex align-self-center id="flex" md-1 sm-1 xs-1>
                <v-btn :class="menu ? 'primary':''" @click="menu = !menu" icon id="anchor">
                  <v-icon>queue_music</v-icon>
                </v-btn>

                <v-menu
                  :position-x="100"
                  :position-y="-660"
                  attach="#playerCard"
                  :close-on-click="false"
                  :close-on-content-click="false"
                  transition="slide-y-reverse-transition"
                  v-model="menu"
                >
                  <v-card height="660px" width="480px">
                    <v-layout fluid>
                      <v-toolbar>
                        <v-toolbar-title>Next up</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn @click="clearPlayList">clear</v-btn>
                        <v-btn @click="menu = false" flat icon>
                          <v-icon>close</v-icon>
                        </v-btn>
                      </v-toolbar>
                    </v-layout>
                    <v-container class="scroll-y" id="scroll-target" pa-0>
                      <v-layout fluid>
                        <draggable :options="{handle:'.my-handle'}" id="123" v-model="queueItems">
                          <v-list
                            :key="item.enclosure.url + '_' + index"
                            class="pa-0"
                            v-for="(item, index) in queueItems"
                          >
                            <div>
                              <v-list-tile
                                :class="index == nowPlaying.index? 'grey lighten-2':''"
                                :key="item.enclosure.url + '_' + index"
                                @click.stop="playItem({index:index, item:item})"
                                style="cursor: pointer"
                              >
                                <v-list-tile-action style="opacity: 0.5">
                                  <v-btn class="my-handle" flat icon style="cursor: move">
                                    <v-icon>more_vert</v-icon>
                                  </v-btn>
                                </v-list-tile-action>

                                <!--<v-list-tile-avatar :class="index < nowPlaying.index? 'before-queue':''">-->
                                <!--<img src="http://img2.sbs.co.kr/sbs_img/2016/03/25/1400x1400_ten.png">-->
                                <!--</v-list-tile-avatar>-->
                                <v-list-tile-content
                                  :class="index < nowPlaying.index? 'before-queue':''"
                                >
                                  <v-list-tile-title style="font-size: 12px">{{item.title}}</v-list-tile-title>
                                  <v-list-tile-title
                                    class="grey--text"
                                    style="font-size: 12px"
                                  >{{item.published | date}}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-spacer></v-spacer>
                                <v-list-tile-action>
                                  <v-btn
                                    @click.stop="playListRemoveIndex(index)"
                                    flat
                                    icon
                                    v-if="nowPlaying.index != index"
                                  >
                                    <v-icon small>close</v-icon>
                                  </v-btn>
                                </v-list-tile-action>
                              </v-list-tile>
                              <v-divider :key="index" v-if="index + 1 < queueItems.length"></v-divider>
                            </div>
                          </v-list>
                        </draggable>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import draggable from "vuedraggable";
// import Sortable from "sortablejs";

const formatTime = second =>
  new Date(second * 1000).toISOString().substr(11, 8);
export default {
  name: "App",
  components: {
    draggable
  },
  data() {
    return {
      sideNav: false,
      menu: false,
      search: "",
      autoPlay: true,
      firstPlay: true,
      isMuted: false,
      loaded: false,
      playing: false,
      paused: false,
      percentage: 0,
      currentTime: "00:00:00",
      audio: undefined,
      totalDuration: 0
      // queueItems: [],
    };
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters["user/isUserAuthenticated"];
    },
    queueItems: {
      get() {
        return this.$store.getters.queueItems;
      },
      set(value) {
        this.$store.commit("setPlayList", value);
      }
    },
    nowPlaying() {
      return this.$store.getters.nowPlaying;
    },
    nowPlayingTitle() {
      let item = this.queueItems[this.$store.getters.nowPlaying.index];
      if (item != undefined) return item.title;
      else return "";
    },
    duration: function() {
      return this.audio ? formatTime(this.totalDuration) : "";
    },
    repeat() {
      return this.$store.getters.repeat;
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
      this.axios
        .get(
          `https://express-test-hyuk.herokuapp.com/api/itunesSearch?search=${
            this.search
          }`
        )
        .then(response => {
          this.$store.dispatch("setPodcast", response.data.results);
          this.$router.push("/searchResult");
        })
        .catch(error => {
          console.log(error);
        });
    },
    playListRemoveIndex(index) {
      this.$store.dispatch("playListRemoveIndex", index);
    },
    clearPlayList() {
      this.$store.dispatch("clearPlayList");
    },
    playItem(payload) {
      console.log(payload.index);
      this.$store.dispatch("playItem", payload);
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
      console.log("skipPrevious");
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
      if (this.playing) return;
      this.paused = false;
      this.audio.play().then(() => (this.playing = true));
    },
    pause() {
      this.paused = !this.paused;
      this.paused ? this.audio.pause() : this.audio.play();
    },
    download() {
      this.audio.pause();
      window.open(this.file, "download");
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
      this.audio.addEventListener("pause", this._handlePlayPause);
      this.audio.addEventListener("play", this._handlePlayPause);
      this.audio.addEventListener("ended", this._handleEnded);
    }
  },
  mounted() {
    console.log("mounted");
    console.log(this.$refs.player);
    this.audio = this.$refs.player;
    this.init();
  },
  beforeDestroy() {
    this.audio.removeEventListener("timeupdate", this._handlePlayingUI);
    this.audio.removeEventListener("loadeddata", this._handleLoaded);
    this.audio.removeEventListener("pause", this._handlePlayPause);
    this.audio.removeEventListener("play", this._handlePlayPause);
    this.audio.removeEventListener("ended", this._handleEnded);
  }
};
</script>
<style>
.flip-list-move {
  transition: transform 0.5s;
}

.before-queue {
  opacity: 0.5;
}

.now-queue {
  color: lightgrey;
}

.chosen {
  color: #fff;
  background-color: #c00;
}
</style>
