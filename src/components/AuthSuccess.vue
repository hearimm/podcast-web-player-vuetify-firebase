<template>
  <div v-if="user">
    <h1>Signup succeeded</h1>
    <button @click="logOut">Log out</button>
    <hr>
    <img :src="user.photoURL" style="height:120px">
    <br>
    <p>{{user.displayName}}</p>
    <p>{{user.email}}</p>
    <p>{{user.uid}}</p>
    <hr>
    <pre>{{user}}</pre>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>
