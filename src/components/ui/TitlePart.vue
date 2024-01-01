<script setup>
const { title } = defineProps(['title'])
</script>
<template>
  <div class="flex gap-2">
    <div class="w-1 bg-blue_main max-h-full"></div>
    <h3 class="text-xl font-bold">{{ title }}</h3>
  </div>
</template>
