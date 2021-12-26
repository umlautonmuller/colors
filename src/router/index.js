import Vue from "vue";
import VueRouter from "vue-router";
import UserDataRequest from "@/api/requests/user";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("colors.token");

  if (token) {
    const request = new UserDataRequest(token);
    const response = await request.send();
    const user = response.data;
    store.commit("user/set", user);
  }

  next();
});

export default router;
