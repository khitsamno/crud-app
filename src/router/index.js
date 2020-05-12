import Vue from "vue";
import VueRouter from "vue-router";
import jwt from "jsonwebtoken";
import config from "../config/config";
import Home from "../views/Home/Home.vue";
import Register from "../views/Auth/Register.vue";
import Login from "../views/Auth/Login.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  { path: '*', redirect: '/' }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router;

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  const decoded = jwt.decode(loggedIn, config.SECRET_KEY);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (loggedIn && decoded) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }


})

