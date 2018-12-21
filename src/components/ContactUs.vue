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
                <v-text-field v-model="name" :rules="nameRules" label="name*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="email" :rules="emailRules" label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea v-model="message" solo name="input-7-4" label="이 부분 좀 고쳐주세요." value></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn
            color="blue darken-1"
            :loading="loading"
            :disabled="loading"
            flat
            @click="sendEmail"
          >Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  name: "contactUs",
  data: () => ({
    loading: false,
    dialog: false,
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    message: ""
  }),
  methods: {
    sendEmail() {
      this.loading = true;
      var apiUrl = "https://express-test-hyuk.herokuapp.com/api/contact";
      this.axios
        .post(apiUrl, {
          name: this.name,
          email: this.email,
          message: this.message
        })
        .then(response => {
          console.log(response);
          this.dialog = false;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    }
  }
};
</script>
