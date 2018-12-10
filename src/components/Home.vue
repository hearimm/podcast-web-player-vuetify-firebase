<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12 sm6 offset-sm3>
        <v-card v-for="item in podcasts" :key="item.collectionId" pb-3>
          <v-img :src="item.artworkUrl600" height="200px"></v-img>

          <v-card-title primary-title>
            <div>
              <div class="headline">{{item.collectionName}}</div>
              <span class="grey--text">{{item.collectionCensoredName}}</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat>Share</v-btn>
            <v-btn flat color="purple" :to="'detail/' + item.collectionId">Explore</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text
              v-show="show"
            >I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
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
