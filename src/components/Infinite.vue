<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Next up</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="orderByPublishedDesc">
        <v-icon>arrow_drop_up</v-icon>
      </v-btn>
      <v-btn icon @click="orderByPublishedAsc">
        <v-icon>arrow_drop_down</v-icon>
      </v-btn>
      <v-btn icon @click="clearPlayList">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-toolbar>
    <v-alert v-if="queueItems.length <= 0" :value="true" type="warning" class="py-1">
      <v-avatar class="mr-3">
        <img :src="noneQueueAvatar" alt="avatar">
      </v-avatar>재생목록 없쪄염
    </v-alert>
    <draggable :options="{handle:'.my-handle'}" id="123" v-model="queueItems">
      <v-list
        :key="item.enclosure.url + '_' + index"
        class="pa-0"
        v-for="(item, index) in queueItems.slice(0,maxIdx)"
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

            <v-list-tile-content :class="index < nowPlaying.index? 'before-queue':''">
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
    <v-layout justify-center>
      <v-btn round flat v-if="isMaxIdxGreaterThanQueueLength" @click="maxIdx += 15">결과 더 보기</v-btn>
    </v-layout>
  </v-card>
</template>
<script>
// import queueData from "../test/resources/queueItems.js";
import draggable from "vuedraggable";
import noneQueueAvatar from "../assets/avatar_60_rotate.jpg";

export default {
  name: "infinite",
  components: {
    draggable
  },
  data() {
    return {
      noneQueueAvatar: noneQueueAvatar,
      startIdx: 0,
      maxIdx: 15
    };
  },

  computed: {
    isMaxIdxGreaterThanQueueLength() {
      return this.queueItems.length > this.maxIdx;
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
    }
  },

  methods: {
    playItem(payload) {
      this.$store.dispatch("playItem", payload);
    },
    playListRemoveIndex(index) {
      this.$store.dispatch("playListRemoveIndex", index);
    },
    clearPlayList() {
      this.$store.dispatch("clearPlayList");
    },
    orderByPublishedDesc() {
      this.$store.dispatch("orderByPublishedDesc");
    },
    orderByPublishedAsc() {
      this.$store.dispatch("orderByPublishedAsc");
    }
  }
};
</script>
<style>
.flip-list-move {
  transition: transform 0.5s;
}
.now-queue {
  color: lightgrey;
}
.before-queue {
  opacity: 0.5;
}
</style>
