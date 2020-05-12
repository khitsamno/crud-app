<template>
  <div>
    <div class="container mx-auto py-10 px-5 lg:px-64">
      <h1 class="uppercase text-lg lg:text-3xl text-center text-gray-800 lg:mt-10">Login | Crud.App</h1>
      <div class="mt-10 flex justify-center">
        <div class="w-full max-w-xs">
          <AlertDanger v-bind:message="message ?message :validate.message" />

          <form class="mt-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit="onLogin">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
              <input
                v-model="credential.username"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
              <input
                v-model="credential.password"
                type="password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                placeholder="******************"
              />
            </div>
            <div class="flex items-center">
              <button
                class="w-100 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >Login</button>
              <router-link class="ml-5 text-blue-500 hover:underline" to="/register">Register</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import AlertDanger from "../../components/Alerts/AlertDanger.vue";
export default {
  name: "Login",
  data() {
    return {
      credential: {
        username: "",
        password: ""
      }
    };
  },
  components: { AlertDanger },
  computed: {
    ...mapState("validate", ["validate"]),
    ...mapState("users", ["message"]),
    ...mapActions(["login"]),
    ...mapActions(["validateLogin", "register"])
  },
  methods: {
    onLogin(e) {
      e.preventDefault();
      this.$store
        .dispatch("validate/validateLogin", this.credential)
        .then((valid = this.validate.message) => {
          if (valid == "") {
            this.$store
              .dispatch("users/login", this.credential)
              .then(() => this.$router.push("/"))
              .catch(err => console.log(err));
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
