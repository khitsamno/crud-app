import Vue from "vue";
import Vuex from "vuex";
import { users, todos, validate } from "./modules/index";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: { users, todos, validate }
});
