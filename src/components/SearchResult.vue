<template>
  <v-container>
    <v-layout row v-if="loading" wrap>
      <v-flex class="text-xs-center" xs12>
        <v-progress-circular :size="70" :width="7" color="primary" indeterminate v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-flex offset-sm3 sm6 v-if="podcasts.length < 1" xs12>
    <v-alert
      :value="true"
      type="warning"
    >
      조회된 결과가 없습니다
    </v-alert>
    </v-flex>

    <v-layout :key="item.collectionId" mt-2 row v-for="item in podcasts" wrap>
      <v-flex offset-sm3 sm6 xs12>
        <v-card >
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
          </v-card-actions>

        </v-card>
        <v-divider></v-divider>
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
