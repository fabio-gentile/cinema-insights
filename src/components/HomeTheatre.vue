<template>
  <div class="flex gap-8 font-bold mt-8 mb-4 items-center">
    <TitlePart :title="'Now in theatres'" />
  </div>
  <!--  card-->
  <div class="flex gap-6 h-full">
    <div v-if="isLoadingNowTheatre">Loading...</div>
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
      <swiper-slide v-for="film in films" :key="film.id">
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
          :mediaType="'movie'"
        />
      </swiper-slide>
      <swiper-slide>
        <ButtonFetchNext
          :hasNextPage="hasNextPageNowTheatre"
          :fetchNextPage="fetchNextPageNowTheatre"
          :isFetchingNextPage="isFetchingNextPageNowTheatre"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { getNowTheatre } from '@/services'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import ButtonFetchNext from '@/components/card/ButtonFetchNext.vue'
import MovieCard from '@/components/card/MovieCard.vue'
import { ref, watch } from 'vue'
import TitlePart from '@/components/ui/TitlePart.vue'

const {
  resultNowTheatre,
  isLoadingNowTheatre,
  hasNextPageNowTheatre,
  isFetchingNextPageNowTheatre,
  fetchNextPageNowTheatre
} = getNowTheatre()

const films = ref([])
watch(resultNowTheatre, (e) => {
  const newResults = e.pages[e.pages.length - 1].results
  for (const result of newResults) {
    films.value.push(result)
  }
})
</script>
