<template>
  <div>
    <div
      v-if="message"
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong class="font-bold">Success !</strong>
      <span class="block sm:inline ml-2">{{message}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "AlertSuccess",
  props: ["message"]
};
</script>