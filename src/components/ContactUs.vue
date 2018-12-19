<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-list-tile slot="activator" @click="() =>{}">
        <v-list-tile-action>
          <v-icon>feedback</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Contact Us</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-card>
        <v-card-title>
          <span class="headline">Contact Us</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="name*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea solo name="input-7-4" label="이 부분 좀 고쳐주세요." value></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  name: "contactUs",
  data() {
    return { dialog: false };
  }
};
</script>
