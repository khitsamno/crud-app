<template>
  <div>
    <form @submit="onSubmit">
      <div class="flex items-center py-2 bg-white px-5 my-5 rounded">
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Title..."
          aria-label="Title"
          v-model="title"
        />
        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >&#10010;</button>
      </div>
      <AlertDanger v-bind:message="getValidate.message" />
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AlertDanger from "../../components/Alerts/AlertDanger.vue";
export default {
  name: "TodoForm",
  components: { AlertDanger },
  data() {
    return {
      title: ""
    };
  },
  computed: {
    ...mapGetters("validate", ["getValidate"]),
    ...mapActions(["addNewTodo"]),
    ...mapActions(["validateTodo"])
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$store
        .dispatch("validate/validateTodo", this.title)
        .then((valid = this.getValidate.message) => {
          if (valid == "") {
            this.$store.dispatch("todos/addNewTodo", this.title).then(() => {
              this.title = "";
            });
          }
        });
    }
  }
};
</script>