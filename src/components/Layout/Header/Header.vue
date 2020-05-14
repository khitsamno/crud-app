<template>
  <div>
    <nav class="bg-gray-200" v-if="getToken">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"></div>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <div
              class="px-3 py-1 border border-teal-500 rounded-md text-md text-teal-500"
            >{{getFullname}}</div>
            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button
                  @click="onLogout"
                  class="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-teal-500 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                >Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters("users", ["getToken", "getFullname"]),
    ...mapActions(["logout", "getUserLogin"])
  },
  created() {
    this.$store.dispatch("users/getUserLogin");
  },
  methods: {
    onLogout() {
      this.$store
        .dispatch("users/logout")
        .then(() => this.$router.push("/login"))
        .catch(err => console.log(err));
    }
  }
};
</script>