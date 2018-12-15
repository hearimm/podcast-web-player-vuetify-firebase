<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row v-if="!loading && (lookupData === null || lookupData === undefined)" wrap>
      <v-alert
        :value="true"
        type="warning"
      >
        조회된 결과가 없습니다
      </v-alert>
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
            <v-btn color="purple" flat>구독</v-btn>
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
                <v-alert
                  :value="true"
                  type="error"
                >
                  관리자에게 요청해주세요 :(
                </v-alert>

                <div class="text-xs-center">
                  <v-btn :disabled="rssReqComplete" @click="rssAddRequest" class="primary" flat>RSS Add</v-btn>
                </div>
              </div>
          </template>
          <template slot="items" slot-scope="props">
            <td>
              <v-checkbox
                hide-details
                primary
                v-model="props.selected"
              ></v-checkbox>
            </td>
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.published | date }}</td>
            <td>
              <v-btn icon samll>
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
      rssReqComplete: false,
      lookupData: null,
      pagination: { sortBy: "published", descending: true },
      chips: [],
      chipsItems: ["아재", "윤태진", "김소혜", "주시은"],
      selected: [],
      headers: [
        { text: "Title", align: "left", sortable: false, value: "name" },
        { text: "Published", align: "center", value: "published" },
        { text: "action", sortable: false, value: "action", width: "52" }
      ],
      feedData: null
    };
  },
  computed: {
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
    }
  },
  // watch: {
  //   chips: function(list) {
  //     if (list.length > 0) {
  //       this.episodes = this.$store.getters.detailData.episodes.filter(x => {
  //         for (let key in list) {
  //           if (x.title.indexOf(list[key]) > 0) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       });
  //     } else {
  //       this.episodes = this.$store.getters.detailData.episodes;
  //     }
  //   }
  // },
  methods: {
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
    }
  },
  mounted: function() {
    console.log("mounted");
    this.axios
      .get(
        `https://itunes.apple.com/lookup?id=
        ${this.id}
        &entity=podcast&country=KR`
      )
      .then(response => {
        console.log("resp");
        this.lookupData = response.data.results[0];
        this.$store.dispatch("setLookupData", response.data.results[0]);
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
        console.log(snapshot);
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

<style scoped>
</style>
