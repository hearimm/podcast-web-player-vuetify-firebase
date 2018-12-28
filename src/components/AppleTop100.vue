<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-container v-bind="{ [`grid-list-${size}`]: true }" fluid>
            <v-layout row wrap>
              <v-flex v-for="item in topData.feed.results" :key="item.id" xs4>
                <v-card flat tile>
                  <v-img :src="item.artworkUrl100" height="100px" contain></v-img>
                  <v-card-title primary-title>
                    <div>
                      <h3>{{item.name}}</h3>
                      <span class="grey--text">{{item.artistName}}</span>
                      <br>
                    </div>
                  </v-card-title>

                  <v-card-actions>
                    <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import top100 from "@/test/resources/appleTop100.js";
export default {
  name: "AppleTop",
  data() {
    return {
      size: "xl",
      topData: top100.data
    };
  }
};
</script>