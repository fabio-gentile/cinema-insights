<template>
  <footer
    class="lg:px-6 px-4 py-6 top-[100vh] bg-gray-50 dark:bg-grey_main dark:text-white border-t-[1px] grid gap-4 mt-8 border-dark_border"
    :class="{
      sticky: !isSearchOpened
    }"
  >
    <nav class="flex justify-center">
      <ul class="flex gap-4 items-center flex-wrap w-[90vw] md:gap-6 lg:gap-8 justify-center">
        <li class="hover:underline">
          <RouterLink
            :to="{
              name: 'home'
            }"
            >Home</RouterLink
          >
        </li>
        <li class="hover:underline">
          <RouterLink
            :to="{
              name: 'movie'
            }"
            >Movies</RouterLink
          >
        </li>
        <li class="hover:underline">
          <RouterLink
            :to="{
              name: 'tv'
            }"
            >TV Shows</RouterLink
          >
        </li>
        <li
          :class="{
            'hover:underline': !isSearchOpened
          }"
        >
          <SearchBarPopup @updateShowPopup="handleUpdateShowPopup" @click.stop></SearchBarPopup>
        </li>
      </ul>
    </nav>
    <p class="text-center text-sm">
      This product uses the
      <span class="hover:underline"
        ><a href="https://developer.themoviedb.org/" target="_blank" referrerpolicy="no-referrer">TMDB API</a></span
      >
      but is not endorsed or certified by
      <span class="hover:underline"
        ><a href="https://developer.themoviedb.org/" target="_blank" referrerpolicy="no-referrer">TMDB</a></span
      >.
    </p>
  </footer>
</template>

<script setup>
import SearchBarPopup from '@/components/SearchBarPopup.vue'
import { ref } from 'vue'
import DarkModeToggle from '@/components/ui/DarkModeToggle.vue'
const isSearchOpened = ref(false)

const handleUpdateShowPopup = (value) => {
  console.log('Updated showPopup value:', value)
  isSearchOpened.value = value
}
</script>
