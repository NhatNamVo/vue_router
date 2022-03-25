import vueRouter from "vue-router";
import Home from "../views/Home";
// import DestinationDetails from "../views/DestinationDetails.vue";
import store from '@/store.js';
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true
  },
  {
    path: "/about",
    name: "about",
    // component: About
    component: () => import(/*webpackChunkName: "about */ "../views/About.vue")
  },
  {
    path: "/hawaii",
    name: "hawaii",
    component: () => import("../views/Hawaii.vue")
  },
  {
    path: "/panama",
    name: "panama",
    component: () => import("../views/Panama.vue")
  },
  {
    path: "/jamaica",
    name: "jamaica",
    component: () => import("../views/Jamaica.vue")
  },
  {
    path: "/brazil",
    name: "brazil",
    component: () => import("../views/Brazil.vue")
  },
  {
    path: "/details/:id",
    name: "destinationDetail",
    component: () => import("../views/DestinationDetails.vue"),
    props: true,
    children:[
      {
        path: ":experienceSlug",
        name: "experienceDetails",
        component: () => import("../views/Experiences.vue"),
        props: true,
        beforeEnter: (to, from, next) => {
          const destination = store.destinations.find(destination => destination.id == to.params.id);
          const exists = (destination||{}).experiences.find(destination => destination.slug === to.params.experienceSlug);
          if(exists){
            next();
          }
          else{
            next({name: 'notFound'});
          }
        }
      }
    ],
    beforeEnter: (to, from, next) => {
      const exists = store.destinations.find(destination => destination.id == to.params.id);

      if(exists){
        next();
      }
      else{
        next({name: 'notFound'});
      }
    }
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/User.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/my-tour",
    name: "mytour",
    component: () => import("../views/Tour.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/404",
    alias: '*',
    name: "notFound",
    component: () => import("../views/NotFound.vue")
  },
];

const router = new vueRouter({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition){
      return savedPosition;
    }
    else{
      const position = {};
      if( to.hash) {
        position.selector = to.hash;
        if(document.querySelector(to.hash)){
          return position;
        }
        return false;
      }
    }
  },
  routes
});

router.beforeEach((to,from, next) => {
  if(to.name === 'login' && store.user){
    next({name: 'home'});
  }
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.user){
      next({
        name: 'login',
        query: {name:  to.name}
      });
    }
    else{
        next();
    }
  }
  else{
    next();
  }
});

export default router;
