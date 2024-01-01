<script setup>
import YoutubeTrailer from '@/components/YoutubeTrailer.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const isOpenedYoutubeTrailer = ref(null)
const props = defineProps({
  details: Object,
  image: Object,
  video: Object
})

const details = props.details
const image = props.image
const video = props.video

// open the trailer if ?query
const openTrailerParam = route.query.trailer
watch(isOpenedYoutubeTrailer, () => {
  if (openTrailerParam && isOpenedYoutubeTrailer.value) {
    isOpenedYoutubeTrailer.value.$el.click()
  }
})

// images
const trailer = video.results.filter((video) => video.type === 'Trailer')
const imageCount = image.logos.length + image.backdrops.length + image.posters.length
const videoCount = video.results.length
</script>

<template>
  <div class="xs:max-w-[1300px] mx-auto py-2 md:py-4 md:mb-0 dark:text-white text-black flex justify-between gap-4">
    <img
      v-if="details.poster_path"
      class="hidden md:block object-cover w-1/5"
      :src="'https://image.tmdb.org/t/p/w500/' + details.poster_path"
      :alt="'image from ' + details.title || details.original_title"
      loading="lazy"
    />
    <img
      v-else
      class="hidden md:block object-cover w-1/5"
      src="/noimage.png"
      :alt="'image from ' + details.title || details.original_title"
      loading="lazy"
    />
    <a v-if="videoCount > 0" class="relative block w-full max-w-[768px] max-h-[450px] overflow-hidden">
      <YoutubeTrailer
        ref="isOpenedYoutubeTrailer"
        class="w-full h-full absolute left-0 cursor-pointer"
        :typeVideo="trailer[0].type"
        :youtube-video-id="trailer[0].key"
      />
      <img
        v-if="details.backdrop_path"
        class="w-full"
        :src="'https://image.tmdb.org/t/p/w500/' + details.backdrop_path"
        :alt="'image from ' + details.title || details.original_title"
        loading="lazy"
      />
      <img
        v-else-if="details.poster_path"
        class="w-full"
        :src="'https://image.tmdb.org/t/p/w500/' + details.poster_path"
        :alt="'image from ' + details.title || details.original_title"
        loading="lazy"
      />
      <img
        v-else
        class="w-full"
        src="/noimage.png"
        :alt="'image from ' + details.title || details.original_title"
        loading="lazy"
      />
      <svg
        class="pointer-events-none w-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          class="fill-white"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm-2.5-3.5l7-4.5l-7-4.5v9z"
        />
      </svg>
      <p
        class="absolute bottom-0 right-0 text-white bg-grey_main bg-opacity-50 font-bold py-1 px-2 pointer-events-none"
      >
        Play trailer
      </p>
    </a>
    <a v-else class="relative block w-full max-w-[768px]">
      <img
        v-if="details.backdrop_path"
        class="w-full object-cover max-h-[400px]"
        :src="'https://image.tmdb.org/t/p/w500/' + details.backdrop_path"
        :alt="'image from ' + details.title || details.original_title"
        loading="lazy"
      />
      <img
        v-else
        class="w-full object-cover max-h-[400px]"
        src="/noimage.png"
        :alt="'image from ' + details.title || details.original_title"
        loading="lazy"
      />
    </a>
    <div class="hidden lg:flex flex-col w-1/5 gap-3 items-center text-white">
      <div class="bg-blue_main h-1/2 w-full py-1 md:py-2 font-bold flex gap-2 items-center justify-center">
        <svg class="h-5 md:h-6 xl:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            class="fill-white"
            d="m11.5 14.5l7-4.5l-7-4.5v9ZM8 18q-.825 0-1.413-.588T6 16V4q0-.825.588-1.413T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.588 1.413T20 18H8Zm0-2h12V4H8v12Zm-4 6q-.825 0-1.413-.588T2 20V6h2v14h14v2H4ZM8 4v12V4Z"
          />
        </svg>
        <p class="uppercase">
          <span>{{ videoCount }}</span> Vidéos
        </p>
      </div>
      <div class="bg-blue_main h-1/2 w-full py-1 md:py-2 font-bold flex gap-2 items-center justify-center">
        <svg class="h-5 md:h-6 xl:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            class="fill-white"
            d="M13.25 12.5L12.1 11q-.15-.175-.4-.175t-.4.175l-1.675 2.2q-.2.25-.063.525t.463.275h7.95q.325 0 .462-.275t-.062-.525l-2.425-3.175q-.15-.2-.4-.2t-.4.2l-1.9 2.475ZM8 18q-.825 0-1.413-.588T6 16V4q0-.825.588-1.413T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.588 1.413T20 18H8Zm0-2h12V4H8v12Zm-4 6q-.825 0-1.413-.588T2 20V7q0-.425.288-.713T3 6q.425 0 .713.288T4 7v13h13q.425 0 .713.288T18 21q0 .425-.288.713T17 22H4ZM8 4v12V4Z"
          />
        </svg>
        <p class="uppercase">
          <span>{{ imageCount }}</span> Photos
        </p>
      </div>
    </div>
  </div>
</template>
