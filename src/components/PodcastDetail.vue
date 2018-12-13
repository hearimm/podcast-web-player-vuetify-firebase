<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12 sm6 mb-2 offset-sm3>
        <v-card>
          <v-img :src="detailData.image" height="300px" contain></v-img>

          <v-card-title primary-title>
            <div>
              <div class="headline">{{detailData.title}}</div>
              <span class="grey--text">{{detailData.description.short}}</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat>Share</v-btn>
            <v-btn flat color="purple">Explore</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text v-show="show">{{detailData.description.long}}</v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
      <v-divider inset></v-divider>
      <v-flex xs12 sm6 offset-sm3>
        <v-combobox
          v-model="chips"
          :items="chipsItems"
          label="배성재의 텐 출연진 필터"
          chips
          clearable
          prepend-icon="filter_list"
          solo
          multiple
        >
          <template slot="no-data">
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
        <v-toolbar color="white" flat>
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
export default {
  name: "PodcastDetail",
  props: ["id"],
  data() {
    return {
      show: false,
      pagination: {},
      chips: [],
      chipsItems: ["윤태진", "김소혜", "주시은"],
      selected: [],
      headers: [
        {
          text: "Title",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Published", value: "published" },
        { text: "action", sortable: false, value: "action" }
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
    }
  },
  created: function() {
    this.$store.dispatch("loadDetailData", { id: this.id });
  }
};
</script>

<style scoped>
</style>
