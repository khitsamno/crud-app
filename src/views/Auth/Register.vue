<template>
  <div>
    <div class="container mx-auto py-10 px-5 lg:px-64">
      <h1
        class="uppercase text-lg lg:text-3xl text-center text-gray-800 lg:mt-10"
      >Register | Crud.App</h1>
      <div class="mt-10 flex justify-center">
        <div class="w-full max-w-xs">
          <AlertDanger v-bind:message="validate.message" />

          <form class="mt-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit="onSubmit">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Fullname</label>
              <input
                v-model="user.fullname"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                type="text"
                placeholder="Fullname"
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
              <input
                v-model="user.username"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>

            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
              <input
                type="password"
                v-model="user.password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                placeholder="******************"
              />
            </div>
            <div class="flex items-center">
              <button
                class="w-100 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >Register</button>

              <router-link class="ml-5 text-blue-500 hover:underline" to="/login">Login</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import AlertDanger from "../../components/Alerts/AlertDanger.vue";
export default {
  name: "Register",
  data() {
    return {
      user: {
        fullname: "",
        username: "",
        password: ""
      }
    };
  },
  components: {
    AlertDanger
  },
  computed: {
    ...mapState("validate", ["validate"]),
    ...mapActions(["validateRegister", "register"])
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$store
        .dispatch("validate/validateRegister", this.user)
        .then((valid = this.validate.message) => {
          if (valid == "") {
            this.$store
              .dispatch("users/register", this.user)
              .then(() => {
                this.$router.push("/login");
              })
              .catch(err => console.log(err));
          }
        });
    }
  }
};
</script>
