import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import PodcastDetail from "./components/PodcastDetail";
import Auth from "./components/Auth.vue";
import AuthSuccess from "./components/AuthSuccess.vue";
import SearchResult from "./components/SearchResult.vue";
import Play from "./components/Play.vue";
import Infinite from "./components/Infinite.vue";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/infinite",
      name: "infinite",
      component: Infinite
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    { path: "/auth", name: "auth", component: Auth },
    { path: "/success", name: "authSuccess", component: AuthSuccess },
    { path: "/searchResult", name: "searchResult", component: SearchResult },
    { path: "/play", name: "play", component: Play },
    {
      path: "/detail/:id",
      name: "detail",
      props: true,
      component: PodcastDetail
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/About.vue")
    }
  ]
});
