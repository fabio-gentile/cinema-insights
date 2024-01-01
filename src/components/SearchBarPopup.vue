<script setup>
import { ref, defineEmits } from 'vue'
import router from '@/router'
const query = ref('')
const showPopup = ref(false)
const emit = defineEmits(['updateShowPopup', 'click'])
const openPopup = () => {
  showPopup.value = showPopup.value = true
  emit('updateShowPopup', showPopup.value)
}

const closePopup = () => {
  showPopup.value = showPopup.value = false
  emit('updateShowPopup', showPopup.value)
}

const submit = () => {
  closePopup()
  if (query.value.length > 2) {
    router.push('/search/' + query.value)
  }
}

document.addEventListener('keydown', (e) => {
  if (showPopup.value) {
    if (e.key === 'Escape') showPopup.value = false
  }
})
</script>

<template>
  <div @click="openPopup()" :class="[showPopup.value === true ? 'cursor-none' : 'cursor-pointer']">Search</div>
  <div
    v-if="showPopup"
    @wheel.prevent
    @scroll.prevent
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50 overflow-hidden"
  >
    <form class="w-11/12" @submit.prevent="submit">
      <div class="flex gap-4 md:mx-auto flex-col sm:flex-row justify-center z-50">
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
        <div class="relative">
          <button
            type="submit"
            class="hover:bg-blue_main_hover bg-blue_main w-full sm:w-fit px-6 py-3 text-white font-bold min-w-fit rounded-lg"
          >
            Search
          </button>

          <div
            @click="closePopup"
            class="absolute sm:-top-9 right-0 -top-28 sm:-left-20 text-xl tracking-wider text-white cursor-pointer"
          >
            CLOSE
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style></style>
