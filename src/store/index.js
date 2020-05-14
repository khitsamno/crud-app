import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import todos from "./modules/todos";
import validate from "./modules/validate";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: { users, todos, validate }
});
