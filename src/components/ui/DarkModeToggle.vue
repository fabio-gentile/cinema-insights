<script setup>
import { ref, watchEffect } from 'vue'

const html = document.querySelector('html')
// html.classList.add("switch-theme-animation")
const isDarkMode = ref(false)

const setDarkModePreference = (value) => {
  localStorage.setItem('theme', JSON.stringify(value))
}

const loadDarkModePreference = () => {
  const savedPreference = localStorage.getItem('theme')
  if (savedPreference !== null) {
    isDarkMode.value = JSON.parse(savedPreference)
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkModePreference(isDarkMode.value)
  }

  html.classList.toggle('dark', isDarkMode.value)
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  setDarkModePreference(isDarkMode.value)
  html.classList.toggle('dark', isDarkMode.value)
  // html.classList.add('switch-theme-animation')
  // setTimeout(() => {
  //   html.classList.remove('switch-theme-animation')
  // }, 300)
}

loadDarkModePreference()

watchEffect(() => {
  setDarkModePreference(isDarkMode.value)
})

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
const handleMediaChange = (event) => {
  isDarkMode.value = event.matches
  html.classList.toggle('dark', isDarkMode.value)
  setDarkModePreference(isDarkMode.value)
}

mediaQuery.addEventListener('change', handleMediaChange)
</script>
<template>
  <div @click="toggleDarkMode" class="cursor-pointer w-fit">
    <svg
      v-if="isDarkMode"
      class="w-8 h-8 fill-none stroke-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg
    ><svg
      v-else
      class="w-8 h-8 fill-none stroke-black"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  </div>
</template>

<style>
.switch-theme-animation * {
  transition:
    color 0.2s,
    background-color 0.2s;
}
</style>
