<template>
  <div>
    <div
      v-if="message"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong class="font-bold">Oppp!</strong>
      <span class="block sm:inline ml-2">{{message}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "AlertDanger",
  props: ["message"]
};
</script>