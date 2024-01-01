<template>
  <!--  card-->
  <div v-if="isLoadingMovieRecommendations">Loading...</div>
  <div v-else-if="movieRecommendations.results.length > 0">
    <TitlePart :title="'Recommendations'" class="my-4" />
  </div>
  <swiper
    v-if="!isLoadingMovieRecommendations"
    :navigation="true"
    :slidesPerView="'auto'"
    :space-between="16"
    :centered-slides="false"
    :pagination="{
      clickable: true
    }"
    :modules="[Navigation]"
  >
    <swiper-slide v-for="film in movieRecommendations.results" :key="film.id">
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
  </swiper>
</template>

<script setup>
import MovieCard from '@/components/card/MovieCard.vue'

const props = defineProps({
  idFilm: Number
})
import { getMovieRecommendations } from '@/services'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import TitlePart from '@/components/ui/TitlePart.vue'

const { movieRecommendations, isLoadingMovieRecommendations } = getMovieRecommendations(props.idFilm)
</script>
