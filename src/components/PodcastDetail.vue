<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row v-if="!loading && (lookupData === null || lookupData === undefined)" wrap>
      <v-alert :value="true" type="warning">조회된 결과가 없습니다</v-alert>
    </v-layout>
    <v-layout row v-if="!loading && lookupData !== null && lookupData !== undefined" wrap>
      <v-flex xs12 sm6 mb-2 offset-sm3>
        <v-card>
          <v-img :src="lookupData.artworkUrl600" contain height="300px"></v-img>

          <v-card-title primary-title>
            <div>
              <div class="headline">{{lookupData.collectionName}}</div>
              <span class="grey--text">{{lookupData.collectionCensoredName}}</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <!--<v-btn flat>Share</v-btn>-->
            <v-btn v-if="isSubscribes" color="purple" flat @click="unsubscribe">구독해지</v-btn>
            <v-btn v-else color="purple" flat @click="addSubscribe">구독</v-btn>
            <v-dialog v-model="dialog" max-width="290">
              <v-card>
                <v-card-title class="headline">구독하시겠습니까?</v-card-title>
                <v-card-text>구독기능은 로그인 후 사용가능합니다.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat="flat" @click="dialog = false">취소</v-btn>
                  <v-btn color="green darken-1" flat="flat" @click="goAuthPage">로그인</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-divider inset></v-divider>
      <v-flex xs12 sm6 offset-sm3>
        <v-combobox
          v-model="chips"
          :items="chipsItems"
          :label="lookupData.collectionName +' 제목 필터'"
          chips
          clearable
          prepend-icon="filter_list"
          solo
          multiple
        >
          <template slot="no-data" v-if="chipsItems.length > 0">
            <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
          </template>
          <template slot="selection" slot-scope="data">
            <v-chip :selected="data.selected" close @input="remove(data.item)">
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-combobox>
      </v-flex>

      <v-flex xs12 sm6 offset-sm3>
        <v-toolbar color="white" flat v-if="episodes.length > 0">
          <v-spacer></v-spacer>
          <v-btn @click="playListAddSelected" v-if="selected.length > 0">Add Selected</v-btn>
          <v-btn @click="playListAddAll" v-else>Add All</v-btn>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="episodes"
          item-key="enclosure.url"
          :pagination.sync="pagination"
          ripple
          select-all
          v-model="selected"
          class="elevation-1"
        >
          <template slot="no-data">
            <div>
              <div class="text-xs-center" v-if="!isFeedUrlNotWorking">
                <v-btn
                  :disabled="rssReqComplete"
                  @click="rssAddRequest"
                  class="primary"
                  flat
                >관리자님 이것도 추가해주세요</v-btn>
              </div>
              <div>
                <v-alert v-if="isFeedUrlNotWorking" :value="true" type="error">팟빵은 안되요 읍읍 :(</v-alert>
              </div>
            </div>
          </template>
          <template slot="items" slot-scope="props">
            <td class="text-xs-center pa-2">
              <v-checkbox hide-details primary v-model="props.selected"></v-checkbox>
            </td>
            <td class="text-xs-left pa-0">{{ props.item.title }}</td>
            <td class="text-xs-center pa-0">{{ props.item.published | date }}</td>
            <td class="text-xs-center pa-0" style="width:40px">
              <v-btn icon samll class="ma-0">
                <v-icon @click="playListAdd(props.item)" color="grey darken-1">playlist_add</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as firebase from "firebase";

export default {
  name: "PodcastDetail",
  props: ["id"],
  data() {
    return {
      show: false,
      dialog: false,
      rssReqComplete: false,
      lookupData: null,
      pagination: { sortBy: "published", descending: true },
      chips: [],
      chipsItems: ["아재", "윤태진", "김소혜", "주시은"],
      selected: [],
      headers: [
        {
          text: "Title",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "날짜",
          align: "center",
          value: "날짜"
        },
        { text: "", sortable: false, value: "" }
      ],
      feedData: null
    };
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters["user/isUserAuthenticated"];
    },
    user() {
      return this.$store.getters["user/user"];
    },
    pages() {
      if (this.pagination.rowsPerPage == null || this.episodes.length == null)
        return 0;
      return Math.ceil(this.episodes.length / this.pagination.rowsPerPage);
    },
    loading() {
      return this.$store.getters.loading;
    },
    podcast() {
      console.log(this.$store.getters.podcasts);
      return this.$store.getters.podcasts.find(x => {
        return x.collectionId == this.id;
      });
    },
    detailData() {
      return this.$store.getters.detailData;
    },
    episodes() {
      console.log(this.detailData);
      if (this.detailData === null || this.detailData === undefined) {
        return [];
      }

      if (this.chips.length > 0) {
        return this.$store.getters.detailData.episodes.filter(x => {
          for (let key in this.chips) {
            if (x.title.indexOf(this.chips[key]) > 0) {
              return true;
            }
          }
          return false;
        });
      } else {
        return this.$store.getters.detailData.episodes;
      }
    },
    subscribes() {
      return this.$store.getters["user/subscribes"];
    },
    isSubscribes() {
      console.log("isSubscribes computed");

      for (var key in this.$store.getters["user/subscribes"]) {
        if (
          this.$store.getters["user/subscribes"][key].collectionId == this.id
        ) {
          return true;
        }
      }
      return false;
    },
    isFeedUrlNotWorking() {
      return this.lookupData.feedUrl.indexOf("pod.ssenhosting.com") > 0;
    }
  },

  methods: {
    goAuthPage() {
      this.dialog = false;
      this.$router.push("/auth");
    },
    unsubscribe() {
      if (this.isUserAuthenticated) {
        this.$store.dispatch("user/unsubscribe", this.id);
      }
    },
    addSubscribe() {
      if (this.isUserAuthenticated) {
        this.$store.dispatch("user/subscribe", this.lookupData);
      } else {
        this.dialog = true;
      }
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    playListAdd(item) {
      this.$store.dispatch("playListAdd", item);
    },
    playListAddAll() {
      this.$store.dispatch("playListAddAll", this.episodes);
    },
    playListAddSelected() {
      this.$store.dispatch("playListAddAll", this.selected);
    },
    rssAddRequest() {
      firebase
        .database()
        .ref("rssRequest/collectionId/")
        .child(this.id)
        .update({
          collectionName: this.lookupData.collectionName,
          feedUrl: this.lookupData.feedUrl
        })
        .then(() => {
          this.rssReqComplete = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    isRssRequest() {
      console.log("isRssRequest");

      firebase
        .database()
        .ref("rssRequest/collectionId/")

        .once("value")
        .then(snapshot => {
          console.log(snapshot.child(this.id).exists());
          return snapshot.exists();
        })
        .catch(error => {
          return false;
          console.log(error);
        });
    }
  },
  mounted: function() {
    this.axios
      .get(
        `https://express-test-hyuk.herokuapp.com/api/itunesLookup?id=${this.id}`
      )
      .then(response => {
        this.lookupData = response.data.results[0];
        this.$store.dispatch("setLookupData", response.data.results[0]);
      })
      .catch(error => {
        console.log(error);
      });

    firebase
      .database()
      .ref("rssRequest/collectionId/")
      .once("value")
      .then(snapshot => {
        this.rssReqComplete = snapshot.child(this.id).exists();
      })
      .catch(error => {
        console.log(error);
      });

    firebase
      .database()
      .ref("chips/collectionId/")
      .child(this.id)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          this.chipsItems = snapshot.val();
        } else {
          this.chipsItems = [];
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.$store.dispatch("loadDetailData", { id: this.id });
  }
};
</script>

<style>
table.v-table thead td:not(:nth-child(1)),
table.v-table tbody td:not(:nth-child(1)),
table.v-table thead th:not(:nth-child(1)),
table.v-table tbody th:not(:nth-child(1)),
table.v-table thead td:first-child,
table.v-table tbody td:first-child,
table.v-table thead th:first-child,
table.v-table tbody th:first-child {
  padding: 0 8px;
}
</style>
