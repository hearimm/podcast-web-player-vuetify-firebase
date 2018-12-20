<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 mb-2 offset-sm3>
        <v-card v-if="nowPlaying.src.length <= 0">
          <v-img :src="noneQueueImg" height="300px"></v-img>
        </v-card>
        <v-card v-else>
          <v-img
            style="cursor: pointer"
            :src="nowPlaying.item.artworkUrl600"
            contain
            height="300px"
            @click="routeToDetail"
          ></v-img>
          <v-card-actions>
            <v-container grid-list-xs text-xs-center pa-1>
              <v-layout>
                <v-flex>
                  <v-slider
                    :disabled="!loaded"
                    @click.native="setPosition()"
                    class="ml-2 mr-2"
                    style="height: 25px; cursor: pointer"
                    v-model="percentage"
                    validate-on-blur
                  ></v-slider>
                </v-flex>
              </v-layout>

              <v-layout align-start justify-space-between row fill-height>
                <v-flex>
                  <h5 class="grey--text" style="text-align:left;">{{currentTime}}</h5>
                </v-flex>
                <v-flex>
                  <h5 class="grey--text" style="text-align:right;">{{duration}}</h5>
                </v-flex>
              </v-layout>

              <v-container @click="routeToDetail" style="cursor: pointer">
                <v-layout>
                  <div class="title">
                    <marquee>{{nowPlaying.item.title}}</marquee>
                  </div>
                </v-layout>

                <v-layout>
                  <div
                    class="subheading"
                  >{{nowPlaying.item.collectionName}} {{ nowPlaying.item.published | date }}</div>
                </v-layout>
              </v-container>
              <v-container>
                <v-layout justify-space-around>
                  <v-btn @click="audioReplay(10)" icon large>
                    <v-icon large>replay_10</v-icon>
                  </v-btn>
                  <v-btn @click.stop="playing ? pause() : play()" icon large>
                    <v-icon v-if="!playing || paused" x-large>play_arrow</v-icon>
                    <v-icon v-else x-large>pause</v-icon>
                  </v-btn>
                  <v-btn @click="audioForward(30)" icon large>
                    <v-icon large>forward_30</v-icon>
                  </v-btn>
                </v-layout>
              </v-container>
              <v-layout>
                <v-flex>
                  <v-slider
                    :disabled="!loaded"
                    @click.native="setVolumePosition()"
                    class="ml-2 mr-2"
                    style="height: 49px; cursor: pointer"
                    v-model="volumePercentage"
                    prepend-icon="volume_mute"
                    append-icon="volume_up"
                    thumb-label
                  ></v-slider>
                </v-flex>
              </v-layout>

              <v-layout justify-space-around>
                <v-btn @click="toggleAudioPlaybackRate" icon large>
                  <h3>{{playbackRateValue}}x</h3>
                </v-btn>
                <v-btn @click="()=>{}" icon large>
                  <v-icon>more_horiz</v-icon>
                </v-btn>
                <v-btn @click="()=>{}" icon large>
                  <v-icon>more_horiz</v-icon>
                </v-btn>
              </v-layout>

              <!-- playback   ... -->
            </v-container>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 mb-2 offset-sm3>
        <h2>재생목록</h2>
        <infinite></infinite>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { bus, formatTime } from "../main";
import Infinite from "./Infinite.vue";
import noneQueueImg from "../assets/none_queue_img.jpg";

export default {
  components: {
    Infinite
  },
  data() {
    return {
      noneQueueImg: noneQueueImg
    };
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters["user/isUserAuthenticated"];
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
    percentage: {
      get() {
        return this.$root.$children[0].percentage;
      },
      set(value) {
        this.$root.$children[0].percentage = value;
      }
    },
    currentTime: {
      get() {
        return this.$root.$children[0].currentTime;
      },
      set(value) {
        this.$root.$children[0].currentTime = value;
      }
    },
    totalDuration: {
      get() {
        return this.$store.getters["player/totalDuration"];
      },
      set(value) {
        this.$store.dispatch("player/totalDuration", value);
      }
    },
    volumePercentage: {
      get() {
        return this.$store.getters["player/volumePercentage"];
      },
      set(value) {
        this.setVolumePosition();
        this.$store.dispatch("player/volumePercentage", value);
      }
    },
    playbackRateValue() {
      return this.$store.getters["playbackRateValue"];
    }
  },
  watch: {
    nowPlaying: val => {
      console.log(val + "nowplaying changed");
    }
  },
  methods: {
    play() {
      bus.$emit("play");
    },
    pause() {
      bus.$emit("pause");
    },
    audioReplay(val) {
      bus.$emit("audioReplay", val);
    },
    toggleAudioPlaybackRate() {
      bus.$emit("toggleAudioPlaybackRate");
    },
    audioForward(val) {
      bus.$emit("audioForward", val);
    },
    setPosition() {
      bus.$emit("setPosition");
    },
    setVolumePosition() {
      bus.$emit("setVolumePosition");
    },
    routeToDetail() {
      this.$router.push("/detail/" + this.nowPlaying.item.collectionId);
    }
  }
};
</script>
<style>
.sound__artworkOverlay {
  position: absolute;
  opacity: 0.6;
  background: #000;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
