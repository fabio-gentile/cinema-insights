<script setup>
const props = defineProps({
  idFilm: Number,
  posterPath: String,
  title: String,
  originalTitle: String,
  name: String,
  voteAverage: Number,
  releaseDate: String,
  firstAirDate: String,
  mediaType: String
})
const movieTitle = (props.title !== undefined ? props.title : props.name).replaceAll(' ', '-').toLowerCase()
</script>

<template>
  <div
    class="inline-block w-[210px] md:w-60 bg-light_card_background dark:bg-dark_card_background border border-gray-200 rounded-lg shadow dark:border-gray-700 h-full"
  >
    <RouterLink
      :to="{
        name: mediaType === 'movie' ? 'movieDetail' : 'tvDetail',
        params: {
          id: idFilm,
          title: movieTitle
        }
      }"
      class="relative group/trailer"
    >
      <img
        v-if="posterPath"
        class="rounded-t-lg h-60 object-cover md:h-96 w-full"
        :src="'https://image.tmdb.org/t/p/w500/' + posterPath"
        :alt="'poster of ' + originalTitle || title || name"
        loading="lazy"
      />
      <img
        v-else
        class="rounded-t-lg h-60 object-cover md:h-96 w-full"
        src="/noimage.png"
        :alt="'poster of ' + originalTitle || title || name"
        loading="lazy"
      />
    </RouterLink>
    <RouterLink
      :to="{
        name: mediaType === 'movie' ? 'movieDetail' : 'tvDetail',
        params: {
          id: idFilm,
          title: movieTitle
        }
      }"
      class="py-4 px-2 md:px-3 flex flex-col"
    >
      <div>
        <div>
          <h2
            :title="originalTitle || title || name"
            class="mb-4 font-semibold tracking-tight text-gray-900 dark:text-white hover:text-blue_main_hover h-12 overflow-hidden"
          >
            {{ originalTitle || title || name }}
          </h2>
        </div>
      </div>
      <div class="flex justify-between mb-4">
        <div class="flex items-center gap-2" title="Rating /10">
          <svg class="h-4 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
            />
          </svg>
          <p class="font-semibold">{{ voteAverage.toFixed(1) }}</p>
        </div>
        <p class="text-gray-600 dark:text-gray-200" title="Release date">
          {{ releaseDate || firstAirDate }}
        </p>
      </div>
      <RouterLink
        :title="'Play trailer ' + originalTitle || title || name"
        :to="{
          name: mediaType === 'movie' ? 'movieDetail' : 'tvDetail',
          params: {
            id: idFilm,
            title: movieTitle
          },
          query: { trailer: true }
        }"
        class="flex items-center gap-2 justify-center hover:bg-blue_main_hover px-4 py-2 rounded-lg w-fit mx-auto group"
      >
        <svg class="h-6 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path
            class="group-hover:fill-white"
            d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
          />
        </svg>
        <p class="font-semibold group-hover:text-white">Trailer</p>
      </RouterLink>
      <div></div>
    </RouterLink>
  </div>
</template>
