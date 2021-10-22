import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
    // children: [
    //   {
    //     path: "",
    //     redirect: { name: "Scripting" },
    //   },
    // ],
  },
  {
    path: "/scripting",
    component: () => import("@/views/scripting/index.vue"),
    children: [
      {
        name: "Scripting",
        path: "",
        component: () => import("@/views/scripting/grid.vue"),
      },
      {
        name: "Scripting Detail",
        path: "edit",
        component: () => import("@/views/scripting/edit.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
