<template>
  <div class="flex gap-8 font-bold mt-8 mb-4 items-center">
    <TitlePart :title="'Trending'" />
    <div class="relative">
      <select
        v-model="selectedOption"
        class="w-40 hover:bg-blue_main_hover bg-blue_main rounded-lg text-white p-2 px-4 appearance-none relative cursor-pointer"
      >
        <option value="all">All</option>
        <option value="movie">Movie</option>
        <option value="tv">TV Show</option>
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="fill-white w-6 absolute top-2 pointer-events-none right-3 z-10"
        viewBox="0 0 512 512"
      >
        <path
          d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
        />
      </svg>
    </div>
  </div>
  <!--  card-->
  <div class="flex gap-6 h-full">
    <div v-if="isLoadingTrending">Loading...</div>
    <swiper
      v-else
      :navigation="true"
      :slidesPerView="'auto'"
      :space-between="16"
      :centered-slides="false"
      :pagination="{
        clickable: true
      }"
      :modules="[Navigation]"
    >
      <swiper-slide v-for="film in filteredFilms" :key="film.id">
        <MovieCard
          :key="film.id"
          :name="film.name"
          :idFilm="film.id"
          :firstAirDate="film.first_air_date"
          :title="film.title"
          :posterPath="film.poster_path"
          :releaseDate="film.release_date"
          :voteAverage="film.vote_average"
          :originalTitle="film.original_title"
          :mediaType="film.media_type"
        />
      </swiper-slide>
      <swiper-slide>
        <ButtonFetchNext
          :hasNextPage="hasNextPageTrending"
          :fetchNextPage="fetchNextPageTrending"
          :isFetchingNextPage="isFetchingNextPageTrending"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { getTrending } from '@/services'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import ButtonFetchNext from '@/components/card/ButtonFetchNext.vue'
import MovieCard from '@/components/card/MovieCard.vue'
import TitlePart from '@/components/ui/TitlePart.vue'
const { resultTrending, isLoadingTrending, hasNextPageTrending, isFetchingNextPageTrending, fetchNextPageTrending } =
  getTrending()
const search = ref([])
const movie = ref([])
const tvShow = ref([])

watch(resultTrending, (e) => {
  const newResults = e.pages[e.pages.length - 1].results
  for (const result of newResults) {
    search.value.push(result)

    if (result.media_type === 'movie') {
      movie.value.push(result)
    } else if (result.media_type === 'tv') {
      tvShow.value.push(result)
    }
  }
})

const selectedOption = ref('all')
const filteredFilms = computed(() => {
  // console.log(search.value)
  if (selectedOption.value === 'all') {
    return search.value
  } else if (selectedOption.value === 'movie') {
    return movie.value
  } else {
    return tvShow.value
  }
})
</script>
