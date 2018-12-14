<template>
  <v-container>
    <v-layout row v-if="loading" wrap>
      <v-flex class="text-xs-center" xs12>
        <v-progress-circular :size="70" :width="7" color="primary" indeterminate v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row v-else wrap>
      <v-flex offset-sm3 sm6 xs12>
        <v-card :key="item.collectionId" pb-3 v-for="item in podcasts">
          <v-img :src="item.artworkUrl600" height="200px"></v-img>

          <v-card-title primary-title>
            <div>
              <div class="headline">{{item.collectionName}}</div>
              <span class="grey--text">{{item.collectionCensoredName}}</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat>Share</v-btn>
            <v-btn :to="'detail/' + item.collectionId" color="purple" flat>Explore</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="show = !show" icon>
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text
                    v-show="show"
            >I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
              sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey,
              you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to
              escape.
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      show: false,
      search: ""
    }),
    computed: {
      podcasts() {
        return this.$store.getters.podcasts;
      },
      loading() {
        return this.$store.getters.loading;
      }
    },
    methods: {}
  };
</script>
