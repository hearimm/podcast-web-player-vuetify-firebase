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
