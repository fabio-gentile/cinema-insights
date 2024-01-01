<script setup>
import { watch } from 'vue'
import { getTvShowDetails, getTvShowSeason } from '@/services'
import { useRoute } from 'vue-router'
import router from '@/router'
const route = useRoute()
const idTvShow = +route.params.id.match(/\d+/)[0]
const idSeason = +route.params.season
const { tvShowDetails, isLoadingTvShowDetails } = getTvShowDetails(idTvShow)
const { tvShowSeason, isLoadingTvShowSeason } = getTvShowSeason(idTvShow, idSeason)

watch(tvShowDetails, (e) => {
  if (e.statusCode) {
    router.push('/error')
  }
})

watch(tvShowSeason, (e) => {
  if (e.statusCode) {
    router.push('/tv/' + idTvShow + '/seasons/1')
  }
})
</script>

<template>
  <div v-if="isLoadingTvShowDetails">Loading...</div>
  <div v-else class="text-center grid gap-2 my-6">
    <h2 class="font-bold text-2xl lg:text-4xl">
      {{ tvShowDetails.title || tvShowDetails.original_title || tvShowDetails.original_name }}
    </h2>
    <p>
      {{ tvShowDetails.first_air_date.slice(0, 4) }}-{{
        tvShowDetails.status === 'Ended' ? tvShowDetails.last_air_date.slice(0, 4) : ''
      }}
    </p>
    <p>{{ tvShowDetails.number_of_seasons }} seasons - {{ tvShowDetails.number_of_episodes }} episodes</p>
  </div>
  <div class="flex justify-between flex-col lg:flex-row" v-if="!isLoadingTvShowSeason">
    <!--      season filter-->
    <section class="hidden lg:flex flex-col grid-cols-1 sticky h-fit top-4">
      <RouterLink
        :to="{
          name: 'tvSeason',
          params: {
            id: idTvShow,
            title: route.params.title,
            season: season.season_number
          }
        }"
        class="p-2 border gap-1 max-w-[160px]"
        v-for="season in tvShowDetails.seasons"
        :key="season.id"
        :class="{ 'bg-blue_main text-white': +season.season_number === +idSeason }"
      >
        <h4 class="font-semibold text-xl">{{ season.name }}</h4>
        <div class="hidden lg:block">
          <p>
            <span v-if="season.air_date">{{ season.air_date.slice(0, 4) }}, </span>{{ season.episode_count }} episodes
          </p>
          <div class="flex items-center gap-2 w-fit" title="Rating /10" v-if="season.vote_average > 0">
            <svg
              :class="{ 'fill-white': +season.season_number === +idSeason }"
              class="h-4 fill-black dark:fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              />
            </svg>
            <p class="font-semibold">
              {{ season.vote_average.toFixed(1) }}
            </p>
          </div>
        </div>
      </RouterLink>
    </section>
    <section class="lg:hidden flex flex-wrap justify-center gap-2 w-full bg-gray-50 dark:bg-grey_main">
      <RouterLink
        :to="{
          name: 'tvSeason',
          params: {
            id: idTvShow,
            title: route.params.title,
            season: season.season_number
          }
        }"
        class="px-4 py-2 border rounded-full"
        :href="season.season_number"
        v-for="season in tvShowDetails.seasons"
        :key="season.id"
        :class="{ 'bg-blue_main text-white': +season.season_number === +idSeason }"
      >
        {{ season.season_number }}
      </RouterLink>
    </section>
    <div v-if="isLoadingTvShowSeason">Loading...</div>
    <div v-else class="w-full lg:w-10/12">
      <div class="mt-6 lg:mt-0 flex-1">
        <!--          latest season -->
        <div v-for="episode in tvShowSeason.episodes" :key="episode.id">
          <div
            class="flex flex-col lg:flex-row mb-4 bg-light_card_background dark:bg-dark_card_background border border-gray-200 rounded-lg shadow dark:border-gray-700"
            v-if="new Date() >= new Date(episode.air_date) && episode.overview !== ''"
          >
            <img
              v-if="episode.still_path"
              class="rounded-lg block lg:h-48 object-contain"
              :src="'https://image.tmdb.org/t/p/w500/' + episode.still_path"
              :alt="'image of the season ' + tvShowSeason.name + ' episode ' + episode.name"
              loading="lazy"
            />
            <img
              v-else
              class="rounded-lg block lg:h-48 object-contain"
              :src="'https://image.tmdb.org/t/p/w500/' + tvShowDetails.poster_path"
              :alt="'image of the season ' + tvShowSeason.name + ' episode ' + episode.name"
              loading="lazy"
            />
            <div class="flex flex-col gap-2 p-4">
              <h3 class="font-bold">{{ episode.episode_number }} - {{ episode.name }}</h3>
              <p>{{ episode.air_date }}</p>
              <div class="flex items-center gap-2 w-fit" v-if="episode.vote_average > 0">
                <svg class="h-4 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  />
                </svg>
                <p class="font-semibold">
                  {{ episode.vote_average.toFixed(1) }}
                </p>
              </div>
              <p class="mt-auto line-clamp-[10] lg:line-clamp-3">
                {{ episode.overview !== '' ? episode.overview : 'TBD' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
