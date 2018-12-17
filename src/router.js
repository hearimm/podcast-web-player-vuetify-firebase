import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import PodcastDetail from "./components/PodcastDetail";
import Auth from "./components/Auth.vue";
import AuthSuccess from "./components/AuthSuccess.vue";
import SearchResult from "./components/SearchResult.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    { path: "/auth", name: "auth", component: Auth },
    { path: "/success", name: "authSuccess", component: AuthSuccess },
    { path: "/searchResult", name: "authSuccess", component: SearchResult },
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
