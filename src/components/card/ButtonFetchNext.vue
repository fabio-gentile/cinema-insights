<template>
  <div class="flex items-center min-w-[210px] md:w-60 ml-8 h-full">
    <button
      @click="() => fetchNextPage()"
      :disabled="!hasNextPage || isFetchingNextPage"
      class="font-bold bg-blue_main hover:bg-blue_main_hover rounded-lg text-white p-2 px-4 appearance-none relative cursor-pointer"
    >
      More...
    </button>
  </div>
</template>
<script setup>
defineProps({
  hasNextPage: Boolean,
  isFetchingNextPage: Boolean,
  fetchNextPage: Function
})
</script>
