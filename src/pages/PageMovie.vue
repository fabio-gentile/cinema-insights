<script setup>
import { getMovieGenres, getPopularMovies } from '@/services'
import TitlePart from '@/components/ui/TitlePart.vue'
import { Datepicker } from 'vanillajs-datepicker'
import { onMounted, ref, watch } from 'vue'
import 'vanillajs-datepicker/css/datepicker.min.css'

const { movieGenres, isLoadingMovieGenres } = getMovieGenres()
const {
  resultPopularMovies,
  isLoadingPopularMovies,
  hasNextPagePopularMovies,
  isFetchingNextPagePopularMovies,
  fetchNextPagePopularMovies
} = getPopularMovies()

const startDate = ref(null)
const endDate = ref(null)

onMounted(() => {
  const inputStartDatePicker = document.querySelector('#datePickerStart')
  const inputEndDatePicker = document.querySelector('#datePickerEnd')
  const todayDate = new Date()

  const initializeDatepicker = (input, maxDate) => {
    const datepicker = new Datepicker(input, {
      maxDate,
      autohide: true
    })

    input.addEventListener('changeDate', () => {
      startDate.value = datepicker.getDate()
      submitFilter()
    })
  }

  initializeDatepicker(inputStartDatePicker, todayDate)
  initializeDatepicker(inputEndDatePicker, todayDate)

  const rating = document.querySelector('#rating')
  rating.addEventListener('input', submitFilter)
})

const filters = ref([])

const addFilter = (genre) => {
  const index = filters.value.indexOf(genre)

  if (index === -1) {
    filters.value.push(genre)
  } else {
    filters.value.splice(index, 1)
  }

  submitFilter()
}

const movies = ref([])

watch(resultPopularMovies, (e) => {
  const newResults = e.pages[e.pages.length - 1].results
  movies.value.push(...newResults)
  submitFilter()
})

const filteredMovies = ref([])

const submitFilter = () => {
  filteredMovies.value = []

  if (filters.value.length === 0) {
    filteredMovies.value = [...movies.value]
  } else {
    filteredMovies.value = movies.value.filter((movie) =>
      filters.value.every((genre) => movie.genre_ids.includes(genre))
    )
  }

  const rating = document.querySelector('#rating')

  if (rating.value > 0) {
    filteredMovies.value = filteredMovies.value.filter((movie) => movie.vote_average >= rating.value)
  }

  endDate.value = endDate.value === null ? new Date('01-01-2200') : new Date(endDate.value)
  startDate.value = startDate.value === null ? new Date('01-01-1700') : new Date(startDate.value)

  filteredMovies.value = filteredMovies.value.filter((movie) => {
    const movieReleaseDate = new Date(movie.release_date)
    return movieReleaseDate >= startDate.value && movieReleaseDate <= endDate.value
  })

  // remove duplicates (bug from the api)
  filteredMovies.value = filteredMovies.value.filter(
    (movie, index, self) => self.findIndex((i) => i.id === movie.id) === index
  )
}
</script>

<template>
  <TitlePart :title="'Popular Movies'" class="mt-8" />
  <div class="flex gap-8 flex-col lg:flex-row">
    <!--      filters-->
    <details
      class="lg:max-w-[300px] w-full mt-4 rounded-lg bg-light_card_background dark:bg-dark_card_background h-fit"
    >
      <summary class="text-center text-xl p-4 font-semibold rounded-lg cursor-pointer bg-blue_main text-white">
        Filters
      </summary>
      <div class="p-4 grid gap-8">
        <div class="dark:text-black grid gap-4">
          <h4 class="font-semibold dark:text-white text-lg">Release Dates</h4>
          <div class="flex gap-2 items-center justify-between">
            <p class="dark:text-white w-24">from</p>
            <input
              type="text"
              name="date_picker_start"
              id="datePickerStart"
              class="border pl-3 py-1 w-full dark:bg-light_card_background"
            />
          </div>
          <div class="flex gap-2 items-center justify-between">
            <p class="dark:text-white w-24">to</p>
            <input
              type="text"
              name="date_picker_end"
              id="datePickerEnd"
              class="border pl-3 py-1 w-full dark:bg-light_card_background"
            />
          </div>
        </div>
        <div v-if="!isLoadingMovieGenres && movieGenres" class="grid gap-4">
          <h4 class="font-semibold text-lg">Genres</h4>
          <ul class="flex gap-4 flex-wrap">
            <li
              @click="addFilter(genre.id)"
              v-for="genre in movieGenres.genres"
              :key="genre.id"
              :class="[
                filters.includes(genre.id)
                  ? 'bg-blue_main text-white font-semibold'
                  : 'bg-white dark:bg-light_card_background dark:text-black'
              ]"
              class="text-sm p-2 px-4 hover:cursor-pointer rounded-lg"
            >
              {{ genre.name }}
            </li>
          </ul>
        </div>
        <div class="grid gap-4">
          <h4 class="font-semibold text-lg">Minimum Rating</h4>
          <div class="relative mb-6">
            <input
              type="range"
              name="rating"
              id="rating"
              min="0"
              max="10"
              step="1"
              value="0"
              class="cursor-pointer w-full"
            />
            <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">0</span>
            <span
              class="text-sm text-gray-500 dark:text-gray-400 absolute start-[10%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6"
              >1</span
            >
            <span
              class="text-sm text-gray-500 dark:text-gray-400 absolute start-[20%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6"
              >2</span
            >
            <span
              class="text-sm text-gray-500 dark:text-gray-400 absolute start-[30%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6"
              >3</span
            >
            <span
              class="text-sm text-gray-500 dark:text-gray-400 absolute start-[40%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6"
              >4</span
            >
            <span
              class="text-sm text-gray-500 dark:text-gray-400 absolute start-[50%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6"
              >5</span
            >
            <span
              class="text-sm text-gray-500 dark:text-gray-400 absolute start-[60%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6"
              >6</span
            >
            <span
              class="text-sm text-gray-500 dark:text-gray-400 absolute start-[70%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6"
              >7</span
            >
            <span
              class="text-sm text-gray-500 dark:text-gray-400 absolute start-[80%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6"
              >8</span
            >
            <span
              class="text-sm text-gray-500 dark:text-gray-400 absolute start-[90%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6"
              >9</span
            >
            <span class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">10</span>
          </div>
        </div>
      </div>
    </details>

    <!--      movie-->
    <div v-if="isLoadingPopularMovies">Loading...</div>
    <div class="w-full" v-else>
      <div v-if="filteredMovies.length === 0">No movies found. Try changing your filters</div>
      <div class="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">
        <div
          v-for="movie in filteredMovies"
          :key="movie.id"
          class="flex max-h-[200px] md:max-h-full w-full md:flex-col md:w-fit overflow-hidden rounded-lg bg-light_card_background dark:bg-dark_card_background"
        >
          <RouterLink
            :to="{
              name: 'movieDetail',
              params: {
                id: movie.id,
                title: movie.title.replaceAll(' ', '-').toLowerCase()
              }
            }"
            class="relative group/trailer"
          >
            <img
              v-if="movie.poster_path"
              class="rounded-t-lg h-full object-cover w-28 md:w-full md:h-80"
              :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
              :alt="'poster of ' + movie.original_title || movie.title || movie.name"
              loading="lazy"
            />
            <img
              v-else
              class="rounded-t-lg h-full object-cover w-28 md:w-full md:h-80"
              src="/noimage.png"
              :alt="'poster of ' + movie.original_title || movie.title || movie.name"
              loading="lazy"
            />
          </RouterLink>
          <RouterLink
            :to="{
              name: 'movieDetail',
              params: {
                id: movie.id,
                title: movie.title.replaceAll(' ', '-').toLowerCase()
              }
            }"
            class="p-3 md:p-2 flex flex-col w-[calc(100%-7rem)] md:w-[200px]"
          >
            <div>
              <div>
                <h2
                  :title="movie.original_title || movie.title || movie.name"
                  class="mb-2 font-semibold tracking-tight text-gray-900 dark:text-white hover:text-blue_main_hover overflow-hidden"
                >
                  {{ movie.original_title || movie.title || movie.name }}
                </h2>
              </div>
            </div>
            <div class="flex md:flex-col gap-5 md:gap-2 mb-4 md:mb-0">
              <div>
                <div class="flex items-center gap-2" title="Rating /10">
                  <svg class="h-4 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path
                      d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    />
                  </svg>
                  <p class="font-semibold">{{ movie.vote_average.toFixed(1) }}</p>
                </div>
              </div>
              <p>{{ movie.release_date }}</p>
            </div>
            <p class="line-clamp-3 mt-auto md:hidden">{{ movie.overview }}</p>
            <div></div>
          </RouterLink>
        </div>
      </div>
      <button
        @click="() => fetchNextPagePopularMovies()"
        :disabled="!hasNextPagePopularMovies || isFetchingNextPagePopularMovies"
        class="mt-8 font-bold bg-blue_main hover:bg-blue_main_hover rounded-lg text-white p-4 px-4 w-full text-xl relative cursor-pointer"
      >
        Load more...
      </button>
    </div>
  </div>
</template>
