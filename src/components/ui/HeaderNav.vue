<template>
  <header class="bg-gray-50 dark:bg-grey_main lg:px-6 px-4 py-6 border-b-[1px] border-dark_border">
    <ul class="text-black dark:text-white flex justify-between items-center">
      <div class="flex font-bold">
        <li><router-link to="/">Home</router-link></li>
        <div class="hidden md:flex gap-8">
          <li class="ml-8"><router-link to="/movie">Movies</router-link></li>
          <li><router-link to="/tv">TV Shows</router-link></li>
          <!--          <li><router-link to="/person">Persons</router-link></li>-->
        </div>
      </div>
      <div class="font-bold flex gap-6 items-center">
        <li class="hidden sm:block">
          <SearchBarPopup @click.stop></SearchBarPopup>
        </li>
        <DarkModeToggle />
        <div
          class="bg-primary-500 rounded-full hover:bg-primary-600 md:hidden hover:cursor-pointer"
          @click="toggleMenuBurger"
        >
          <svg
            v-if="!isMenuBurgerOpened"
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 fill-none stroke-black dark:stroke-white"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 fill-none stroke-black dark:stroke-white"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
      </div>
    </ul>
    <div v-if="isMenuBurgerOpened" class="md:hidden">
      <ul class="text-black dark:text-white flex flex-col gap-6 mt-6 font-bold">
        <li><router-link to="/movie">Movies</router-link></li>
        <li><router-link to="/tv">TV Shows</router-link></li>
        <!--        <li><router-link to="/person">Persons</router-link></li>-->
        <li class="sm:hidden block"><SearchBarPopup></SearchBarPopup></li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import DarkModeToggle from '@/components/ui/DarkModeToggle.vue'
import SearchBarPopup from '@/components/SearchBarPopup.vue'
import { ref } from 'vue'

const isMenuBurgerOpened = ref(false)
const toggleMenuBurger = () => {
  isMenuBurgerOpened.value = !isMenuBurgerOpened.value
  console.log(isMenuBurgerOpened.value)
}
</script>
