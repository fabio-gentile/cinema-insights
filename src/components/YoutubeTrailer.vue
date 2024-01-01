<template>
  <div @click="TogglePopup" @wheel.prevent @scroll.prevent>
    <div
      v-if="showPopup"
      @wheel.prevent
      @scroll.prevent
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-10 cursor-default"
    >
      <div class="relative" @click.stop id="youtubePlayer">
        <div class="p-4 w-full bg-grey_main flex justify-between">
          <p class="text-white font-bold">{{ typeVideo }}</p>
          <svg
            class="h-6 fill-white cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            @click="TogglePopup"
          >
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </div>
        <iframe
          class="aspect-video lg:w-[60vw] md:w-[80vw] w-[90vw]"
          :src="'https://www.youtube.com/embed/' + youtubeVideoId + '?autoplay=1'"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const { youtubeVideoId, typeVideo } = defineProps(['youtubeVideoId', 'typeVideo'])

const showPopup = ref(false)

const TogglePopup = () => {
  showPopup.value = !showPopup.value
}

document.addEventListener('keydown', (e) => {
  if (showPopup.value) {
    if (e.key === 'Escape') showPopup.value = false
  }
})
</script>
