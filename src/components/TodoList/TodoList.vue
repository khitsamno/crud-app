<template>
  <div>
    <ul class="flex grid grid-flow-row pt-1">
      <li class="py-3 border-b px-5 flex justify-between" v-for="todo in todos" :key="todo['id']">
        <span v-if="!todo['isEdit']">{{todo['title']}}</span>
        <span v-else>
          <input
            type="text"
            v-model="todo['title']"
            v-focus
            @keydown.enter="onUpdateTodo(todo['id'], todo['title'])"
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
        </span>
        <span>
          <button
            @click="!todo['isEdit'] ? onEditTodo(todo['id']) : onUpdateTodo(todo['id'], todo['title'])"
            type="button"
            class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-0 px-2 rounded mx-2"
          >{{!todo['isEdit']?'&#x270E;':'OK'}}</button>
          <button
            @click="onRemoveTodo(todo['id'])"
            type="button"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded"
          >&#x2715;</button>
        </span>
      </li>
      <li class="py-3 border-b px-5 bg-orange-200 text-orange-700" v-show="todos.length === 0">
        <span class="font-bold mr-5">Oppp !</span>
        <span>No item found.</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "TodoList",
  computed: {
    ...mapState("todos", ["todos"]),
    ...mapActions(["loadData", "removeTodo", "getEditTodo", "updateTodo"])
  },
  mounted() {
    this.$store.dispatch("todos/loadData");
  },
  methods: {
    onRemoveTodo(id) {
      this.$store.dispatch("todos/removeTodo", id);
    },
    onEditTodo(id) {
      this.$store.dispatch("todos/getEditTodo", id);
    },
    onUpdateTodo(id, title) {
      const payload = { id: id, title: title };
      this.$store.dispatch("todos/updateTodo", payload);
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>