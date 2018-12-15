<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12 sm6 offset-sm3>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
                  :key="item.id"
                  :src="item.url"
                  v-for="(item) in mainImages">
            <div class="title">
              {{ item.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>

    </v-layout>
    <v-layout row wrap>
      <v-flex offset-sm3 sm6 xs12>
        <h1> 구독 </h1>
      </v-flex>
    </v-layout>
    <v-layout :key="item.collectionId" mt-2 row v-for="item in subscribes" wrap>
      <v-flex offset-sm3 sm6 xs12>
        <v-card >
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
  data: () => ({
    mainImages: [
      {
        id: "1",
        url:
          "https://scontent-icn1-1.cdninstagram.com/vp/0fa0368093f958a05f63d2bb72b2fb2f/5C98B709/t51.2885-15/e35/46891549_272363153445146_7627318773272466048_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com",
        title: "1"
      },
      {
        id: "2",
        url:
          "https://scontent-icn1-1.cdninstagram.com/vp/898261193ade631252b5eab9adedc723/5C902E06/t51.2885-15/e35/46687793_320924465174665_4367334844889395566_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com",
        title: "2"
      },
      {
        id: "3",
        url:
          "https://scontent-icn1-1.cdninstagram.com/vp/9f800a8dae06dfe9efbea144077d0191/5C9591E6/t51.2885-15/e35/45426934_2622627491081034_7573423875318903053_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com",
        title: "3"
      }
    ],

    subscribes: [
      {
        wrapperType: "track",
        kind: "podcast",
        artistId: 419028603,
        collectionId: 1096961355,
        trackId: 1096961355,
        artistName: "SBS",
        collectionName: "배성재의 텐",
        trackName: "배성재의 텐",
        collectionCensoredName: "배성재의 텐",
        trackCensoredName: "배성재의 텐",
        artistViewUrl:
          "https://itunes.apple.com/kr/artist/sbs/419028603?mt=2&uo=4",
        collectionViewUrl:
          "https://itunes.apple.com/kr/podcast/%EB%B0%B0%EC%84%B1%EC%9E%AC%EC%9D%98-%ED%85%90/id1096961355?mt=2&uo=4",
        feedUrl: "http://wizard2.sbs.co.kr/w3/podcast/V2000009300.xml",
        trackViewUrl:
          "https://itunes.apple.com/kr/podcast/%EB%B0%B0%EC%84%B1%EC%9E%AC%EC%9D%98-%ED%85%90/id1096961355?mt=2&uo=4",
        artworkUrl30:
          "https://is2-ssl.mzstatic.com/image/thumb/Music71/v4/87/a7/04/87a7040f-c844-b936-533b-aace536687f0/source/30x30bb.jpg",
        artworkUrl60:
          "https://is2-ssl.mzstatic.com/image/thumb/Music71/v4/87/a7/04/87a7040f-c844-b936-533b-aace536687f0/source/60x60bb.jpg",
        artworkUrl100:
          "https://is2-ssl.mzstatic.com/image/thumb/Music71/v4/87/a7/04/87a7040f-c844-b936-533b-aace536687f0/source/100x100bb.jpg",
        collectionPrice: 0,
        trackPrice: 0,
        trackRentalPrice: 0,
        collectionHdPrice: 0,
        trackHdPrice: 0,
        trackHdRentalPrice: 0,
        releaseDate: "2018-12-13T13:00:00Z",
        collectionExplicitness: "cleaned",
        trackExplicitness: "cleaned",
        trackCount: 300,
        country: "KOR",
        currency: "KRW",
        primaryGenreName: "음악",
        contentAdvisoryRating: "Clean",
        artworkUrl600:
          "https://is2-ssl.mzstatic.com/image/thumb/Music71/v4/87/a7/04/87a7040f-c844-b936-533b-aace536687f0/source/600x600bb.jpg",
        genreIds: ["1310", "26"],
        genres: ["음악", "팟캐스트"]
      },
      {
        wrapperType: "track",
        kind: "podcast",
        artistId: 419028603,
        collectionId: 1338652171,
        trackId: 1338652171,
        artistName: "SBS",
        collectionName: "배성재, 정용국의 더덕퀴즈쇼",
        trackName: "배성재, 정용국의 더덕퀴즈쇼",
        collectionCensoredName: "배성재, 정용국의 더덕퀴즈쇼",
        trackCensoredName: "배성재, 정용국의 더덕퀴즈쇼",
        artistViewUrl:
          "https://itunes.apple.com/kr/artist/sbs/419028603?mt=2&uo=4",
        collectionViewUrl:
          "https://itunes.apple.com/kr/podcast/%EB%B0%B0%EC%84%B1%EC%9E%AC-%EC%A0%95%EC%9A%A9%EA%B5%AD%EC%9D%98-%EB%8D%94%EB%8D%95%ED%80%B4%EC%A6%88%EC%87%BC/id1338652171?mt=2&uo=4",
        feedUrl: "http://wizard2.sbs.co.kr/w3/podcast/V2000010730.xml",
        trackViewUrl:
          "https://itunes.apple.com/kr/podcast/%EB%B0%B0%EC%84%B1%EC%9E%AC-%EC%A0%95%EC%9A%A9%EA%B5%AD%EC%9D%98-%EB%8D%94%EB%8D%95%ED%80%B4%EC%A6%88%EC%87%BC/id1338652171?mt=2&uo=4",
        artworkUrl30:
          "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/a4/03/dd/a403ddfb-c8b6-ca57-c4cc-2cd025a12442/source/30x30bb.jpg",
        artworkUrl60:
          "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/a4/03/dd/a403ddfb-c8b6-ca57-c4cc-2cd025a12442/source/60x60bb.jpg",
        artworkUrl100:
          "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/a4/03/dd/a403ddfb-c8b6-ca57-c4cc-2cd025a12442/source/100x100bb.jpg",
        collectionPrice: 0,
        trackPrice: 0,
        trackRentalPrice: 0,
        collectionHdPrice: 0,
        trackHdPrice: 0,
        trackHdRentalPrice: 0,
        releaseDate: "2018-12-10T01:56:00Z",
        collectionExplicitness: "cleaned",
        trackExplicitness: "cleaned",
        trackCount: 46,
        country: "KOR",
        currency: "KRW",
        primaryGenreName: "교육",
        contentAdvisoryRating: "Clean",
        artworkUrl600:
          "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/a4/03/dd/a403ddfb-c8b6-ca57-c4cc-2cd025a12442/source/600x600bb.jpg",
        genreIds: ["1304", "26"],
        genres: ["교육", "팟캐스트"]
      },
      {
        wrapperType: "track",
        kind: "podcast",
        artistId: 419028603,
        collectionId: 1060470633,
        trackId: 1060470633,
        artistName: "SBS",
        collectionName: "배성재의 주말 유나이티드",
        trackName: "배성재의 주말 유나이티드",
        collectionCensoredName: "배성재의 주말 유나이티드",
        trackCensoredName: "배성재의 주말 유나이티드",
        artistViewUrl:
          "https://itunes.apple.com/kr/artist/sbs/419028603?mt=2&uo=4",
        collectionViewUrl:
          "https://itunes.apple.com/kr/podcast/%EB%B0%B0%EC%84%B1%EC%9E%AC%EC%9D%98-%EC%A3%BC%EB%A7%90-%EC%9C%A0%EB%82%98%EC%9D%B4%ED%8B%B0%EB%93%9C/id1060470633?mt=2&uo=4",
        feedUrl: "http://wizard2.sbs.co.kr/w3/podcast/V2000008824.xml",
        trackViewUrl:
          "https://itunes.apple.com/kr/podcast/%EB%B0%B0%EC%84%B1%EC%9E%AC%EC%9D%98-%EC%A3%BC%EB%A7%90-%EC%9C%A0%EB%82%98%EC%9D%B4%ED%8B%B0%EB%93%9C/id1060470633?mt=2&uo=4",
        artworkUrl30:
          "https://is5-ssl.mzstatic.com/image/thumb/Music71/v4/68/ad/a6/68ada6c2-b599-e40a-63c1-6bebdadbb60b/source/30x30bb.jpg",
        artworkUrl60:
          "https://is5-ssl.mzstatic.com/image/thumb/Music71/v4/68/ad/a6/68ada6c2-b599-e40a-63c1-6bebdadbb60b/source/60x60bb.jpg",
        artworkUrl100:
          "https://is5-ssl.mzstatic.com/image/thumb/Music71/v4/68/ad/a6/68ada6c2-b599-e40a-63c1-6bebdadbb60b/source/100x100bb.jpg",
        collectionPrice: 0,
        trackPrice: 0,
        trackRentalPrice: 0,
        collectionHdPrice: 0,
        trackHdPrice: 0,
        trackHdRentalPrice: 0,
        releaseDate: "2016-03-27T13:00:00Z",
        collectionExplicitness: "cleaned",
        trackExplicitness: "cleaned",
        trackCount: 42,
        country: "KOR",
        currency: "KRW",
        primaryGenreName: "TV 및 영화",
        contentAdvisoryRating: "Clean",
        artworkUrl600:
          "https://is5-ssl.mzstatic.com/image/thumb/Music71/v4/68/ad/a6/68ada6c2-b599-e40a-63c1-6bebdadbb60b/source/600x600bb.jpg",
        genreIds: ["1309", "26"],
        genres: ["TV 및 영화", "팟캐스트"]
      }
    ]
  }),
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {}
};
</script>
