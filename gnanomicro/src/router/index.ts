import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/",
    redirect: "/login"
  },
  {
    path:'/home',
    component: ()=>import("@/views/home/home.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
