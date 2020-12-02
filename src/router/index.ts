import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
]

const router = new VueRouter({
  mode: "history",
  // eslint-disable-next-line no-process-env
  base: process.env.BASE_URL,
  routes
})

export default router
