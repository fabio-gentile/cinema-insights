<template>
  <!--  card-->
  <div v-if="isLoadingTvShowRecommendations">Loading...</div>
  <div v-else-if="tvShowRecommendations.results.length > 0">
    <TitlePart :title="'Recommendations'" class="my-4" />
  </div>
  <swiper
    v-if="!isLoadingTvShowRecommendations"
    :navigation="true"
    :slidesPerView="'auto'"
    :space-between="16"
    :centered-slides="false"
    :pagination="{
      clickable: true
    }"
    :modules="[Navigation]"
  >
    <swiper-slide v-for="tvShow in tvShowRecommendations.results" :key="tvShow.id">
      <MovieCard
        :key="tvShow.id"
        :name="tvShow.name"
        :idFilm="tvShow.id"
        :firstAirDate="tvShow.first_air_date"
        :title="tvShow.title"
        :posterPath="tvShow.poster_path"
        :releaseDate="tvShow.release_date"
        :voteAverage="tvShow.vote_average"
        :originalTitle="tvShow.original_title"
        :mediaType="tvShow.media_type"
      />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import MovieCard from '@/components/card/MovieCard.vue'

const props = defineProps({
  idTvShow: Number
})
import { getTvShowRecommendations } from '@/services'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import TitlePart from '@/components/ui/TitlePart.vue'
const { tvShowRecommendations, isLoadingTvShowRecommendations } = getTvShowRecommendations(props.idTvShow)
</script>
