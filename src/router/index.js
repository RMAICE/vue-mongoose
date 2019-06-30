import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/Home.vue";
import Members from "../components/Members.vue";
import Companies from "../components/Companies.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/members", component: Members },
  { path: "/companies", component: Companies }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
