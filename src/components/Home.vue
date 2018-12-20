<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-if="subscribes">
      <v-flex xs12 sm6 offset-sm3>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
            v-for="(item) in subscribes"
            :key="item.collectionId"
            :src="item.artworkUrl600"
            @click="goDetail(item.collectionId)"
          >
            <!-- <div class="title">{{ item.collectionName }}</div> -->
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex offset-sm3 sm6 xs12>
        <h1>구독</h1>
        <v-alert
          v-if="!isUserAuthenticated"
          :value="true"
          type="warning"
        >로그인을 하지 않는다면... 배가 놈 밖에 없을 것이야</v-alert>
      </v-flex>
    </v-layout>
    <v-layout v-if="subscribes" wrap>
      <v-flex :key="item.collectionId" mt-2 row v-for="item in subscribes" offset-sm3 sm6 xs12>
        <v-card>
          <v-img :src="item.artworkUrl600" contain height="200px"></v-img>

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
  computed: {
    isUserAuthenticated() {
      return this.$store.getters["user/isUserAuthenticated"];
    },
    loading() {
      return this.$store.getters.loading;
    },
    subscribes() {
      return this.$store.getters["user/subscribes"];
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push("/detail/" + id);
    }
  }
};
</script>
