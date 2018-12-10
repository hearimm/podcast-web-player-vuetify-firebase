<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/about">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>배가놈의 텐</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details
          v-model="search"
          @click:append="submitSearch"
        ></v-text-field>
      </v-layout>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app height="49">
      <v-layout fill-height>
        <v-icon>skip_previous</v-icon>
        <v-icon>play_arrow</v-icon>
        <v-icon>skip_next</v-icon>
        <v-icon>shuffle</v-icon>
        <v-icon>repeat</v-icon>
        <v-flex align-self-center xs12 sm3 row>
          <v-slider class="ml-2 mr-2" style="height: 49px"></v-slider>
        </v-flex>
        <v-icon>volume_up</v-icon>
        <v-spacer></v-spacer>

        <v-flex xs12 sm6>
          <v-card height="49">
            <v-layout row fill-height>
              <v-flex align-self-center xs-1 sm-1 md-1>
                <v-img
                  src="https://is2-ssl.mzstatic.com/image/thumb/Music71/v4/87/a7/04/87a7040f-c844-b936-533b-aace536687f0/source/30x30bb.jpg"
                  height="30px"
                  width="30px"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs-2 sm-2 md-2>
                <v-card-title class="pa-0">
                  <v-flex fill-height>
                    <p class="grey--text mb-1" style="font-size: 11px; height: 17px">배성재의 텐</p>
                    <p
                      class="grey--text text--darken-2 ma-0"
                      style="font-size: 11px; height: 17px"
                    >(월) 배성재의 텐 - 첫방특집 + THE 덕 퀴즈쇼</p>
                  </v-flex>
                </v-card-title>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex align-self-center xs-1 sm-1 md-1>
                <v-icon>queue_music</v-icon>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      search: ""
    };
  },

  methods: {
    submitSearch() {
      this.axios
        .get(
          `https://itunes.apple.com/search?term=${this.search}&entity=podcast`
        )
        .then(response => {
          this.$store.dispatch("setPodcast", response.data.results);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
