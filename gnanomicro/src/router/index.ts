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

//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/login') return next();
  if(!window.sessionStorage.getItem('token')) return next('/login');
  next();
})
export default router;
