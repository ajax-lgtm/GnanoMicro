import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // Home
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
  },

  // Scan
  {
    path: "/scan",
    component: () => import("@/views/scan/list.vue"),
  },
  {
    path: "/scan/create",
    component: () => import("@/views/scan/components/plate-param.vue"),
  },
  {
    path: "/scan/list",
    component: () => import("@/views/scan/list.vue"),
  },

  {
    path: "/plate",
    component: () => import("@/views/plate/plate.vue"),
  },
  {
    path: "/plate/list",
    component: () => import("@/views/plate/components/list.vue"),
  },
  {
    path: "/plate/edit",
    component: () => import("@/views/plate/components/edit.vue"),
  },
  {
    path: "/plate/delete",
    component: () => import("@/views/plate/components/delete.vue"),
  },

  // Preview
  {
    path: "/preview",
    name: "preview",
    component: () => import("@/views/preview/index.vue"),
  },

  // User
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/user/index.vue"),
  },

  // Setting
  {
    path: "/setting",
    name: "setting",
    component: () => import("@/views/components/setting-card.vue"),
  },

  // System
  {
    path: "/system",
    name: "system",
    component: () => import("@/views/system/index.vue"),
  },

  // Test
  {
    path: "/mode",
    name: "mode",
    component: () => import("@/views/common/mode-selector.vue"),
  },
  {
    path: "/test/hw",
    name: "testhw",
    component: () => import("@/views/test/hardware/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
