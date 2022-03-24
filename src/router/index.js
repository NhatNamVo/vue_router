import vueRouter from "vue-router";
import Home from "../views/Home";
import DestinationDetails from "../views/DestinationDetails.vue";

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
    component: DestinationDetails,
    // component: () => import("../views/DestinationDetails.vue"),
    props: true,
    children:[
      {
        path: ":experienceSlug",
        name: "experienceDetails",
        component: () => import("../views/Experiences.vue"),
        props: true
      }
    ]
  },
  
];

const router = new vueRouter({
  mode: "history",
  // history: createWebHistory(),
  routes
});

export default router;
