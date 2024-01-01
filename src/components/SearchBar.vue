<script setup>
import { ref } from 'vue'
import router from '@/router'
const query = ref('')

const submit = () => {
  if (query.value.length > 2) {
    router.push('/search/' + query.value)
  }
}
</script>

<template>
  <form class="flex gap-4 md:mx-auto flex-col sm:flex-row w-full justify-center" @submit.prevent="submit">
    <div
      class="h-12 relative rounded-lg text-gray-600 w-full sm:w-[500px] lg:w-[700px] border-[1px] border-dark_border dark:border-none flex justify-between items-center bg-white"
    >
      <input
        minlength="3"
        class="mx-4 text-sm focus:outline-none w-full"
        type="search"
        name="search"
        placeholder="Search for movies or TV shows"
        v-model="query"
      />
    </div>
    <button
      type="submit"
      class="hover:bg-blue_main_hover bg-blue_main w-full sm:w-fit px-6 py-3 text-white font-bold min-w-fit rounded-lg"
    >
      Search
    </button>
  </form>
</template>

<style></style>
