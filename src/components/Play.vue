<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 mb-2 offset-sm3>
        <v-card>
          <v-img :src="img" contain height="300px"></v-img>
          <!-- slider -->
          <v-card-title primary-title>
            <div>
              <div class="headline">
                <marquee>{{playTitleName}}</marquee>
              </div>
              <div class="headline">{{ (published) }}</div>
              <span class="grey--text">{{collectionCensoredName}}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-container grid-list-xs text-xs-center>
              <v-layout>
                <v-flex>
                  <v-slider
                    :disabled="!loaded"
                    @click.native="setPosition()"
                    class="ml-2 mr-2"
                    style="height: 49px"
                    v-model="percentage"
                    validate-on-blur
                  ></v-slider>
                </v-flex>
              </v-layout>
              <v-layout justify-space-around>
                <v-btn @click="audioReplay(10)" icon large>
                  <v-icon>replay_10</v-icon>
                </v-btn>
                <v-btn @click.stop="playing ? pause() : play()" icon large>
                  <v-icon v-if="!playing || paused" large>play_arrow</v-icon>
                  <v-icon v-else large>pause</v-icon>
                </v-btn>
                <v-btn @click="audioForward(30)" icon large>
                  <v-icon>forward_30</v-icon>
                </v-btn>
              </v-layout>
              <v-layout>
                <v-flex>
                  <v-slider
                    :disabled="!loaded"
                    @click.native="setPosition()"
                    class="ml-2 mr-2"
                    style="height: 49px"
                    v-model="percentage"
                    prepend-icon="volume_mute"
                    append-icon="volume_up"
                    validate-on-blur
                  ></v-slider>
                </v-flex>
              </v-layout>

              <v-layout justify-space-around>
                <v-btn @click="audioReplay(10)" icon large>
                  <h3>x1</h3>
                </v-btn>
                <v-btn @click="audioForward(30)" icon large>
                  <v-icon>more_horiz</v-icon>
                </v-btn>
                <v-btn @click="audioForward(30)" icon large>
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
                <v-list-tile-content :class="index < nowPlaying.index? 'before-queue':''">
                  <v-list-tile-title style="font-size: 12px">{{item.title}}</v-list-tile-title>
                  <v-list-tile-title class="grey--text" style="font-size: 12px">{{item.published}}</v-list-tile-title>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
      img: "http://img2.sbs.co.kr/sbs_img/2016/03/25/1400x1400_ten.png",
      collectionName: "배가놈",
      collectionCensoredName: "배가배가",
      playTitleName:
        "(화) 배성재의 텐 - 비연애 참피언스리그 (박문성 스포츠해설가)",
      published: new Date("2016-03-29T13:00:00.000Z").toISOString(),
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
    }
  },
  watch: {
    nowPlaying: val => {
      console.log(val + "nowplaying changed");
    }
  },
  methods: {
    playListRemoveIndex(index) {
      this.$store.dispatch("playListRemoveIndex", index);
    },
    clearPlayList() {
      this.$store.dispatch("clearPlayList");
    },
    playItem(payload) {
      console.log(payload.index);
      this.$store.dispatch("playItem", payload);
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

