<template>
  <div>
    <Header />

    <div class="container mx-auto py-10 px-5 lg:px-64">
      <h1 class="uppercase text-lg lg:text-3xl text-center text-gray-800 lg:mt-5">Crud.App</h1>
      <TodoForm />
      <div class="mt-10 shadow-sm bg-white rounded">
        <TodoList />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Layout/Header/Header.vue";
import TodoList from "../../components/TodoList/TodoList.vue";
import TodoForm from "../../components/TodoForm/TodoForm.vue";
export default {
  name: "Home",
  components: {
    Header,
    TodoList,
    TodoForm
  }
};
</script>
