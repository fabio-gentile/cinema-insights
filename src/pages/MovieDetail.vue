<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMovieCredit, getMovieExternalId, getMovieImage, getMovieKeyword, getMovieDetails } from '@/services'
import { getMovieVideo } from '@/services'
import MovieRecommendation from '@/components/MovieRecommendation.vue'
import TopCast from '@/components/TopCast.vue'
import TitlePart from '@/components/ui/TitlePart.vue'
import ExternalCredits from '@/components/ExternalCredits.vue'
import HeaderMedia from '@/components/HeaderMedia.vue'
import Keywords from '@/components/Keywords.vue'

const route = useRoute()
const router = useRouter()
let idMovie = +route.params.id.match(/\d+/)[0]

const { movieDetails, isLoadingMovieDetails } = getMovieDetails(idMovie)
watch(movieDetails, (newData) => {
  if (newData.statusCode) {
    router.push('/error')
    // console.log(newData.statusCode)
  }
})

// console.log('movieDetails ', movieDetails)

const movie = ref(movieDetails)
let movieOriginalLanguage

watchEffect(() => {
  if (movie.value) {
    movieOriginalLanguage = movie.value.spoken_languages.filter(
      (lang) => lang.iso_639_1 === movie.value.original_language
    )
  }
})

const formatToHours = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}

const { movieVideo, isLoadingMovieVideo } = getMovieVideo(idMovie)
let videoCount

const { movieImage, isLoadingMovieImage } = getMovieImage(idMovie)
let imageCount

watchEffect(() => {
  const images = movieImage['_object'].data
  const videos = movieVideo['_object'].data

  if (images) {
    imageCount = images.logos.length + images.backdrops.length + images.posters.length
  }

  if (videos) {
    videoCount = videos.results.length
  }
})

const { movieCredit, isLoadingMovieCredit } = getMovieCredit(idMovie)

let director, writer, star, topStars, topWriters

watchEffect(() => {
  const credits = movieCredit['_object'].data

  if (credits) {
    director = credits.crew.filter((crew) => crew.job === 'Director')
    writer = credits.crew.filter((crew) => crew.department === 'Writing')
    star = [...credits.cast].sort((a, b) => b.popularity - a.popularity)
    topStars = star.slice(0, 6)
    topWriters = writer.slice(0, 4)
  }
})

const { movieKeyword, isLoadingMovieKeyword } = getMovieKeyword(idMovie)

const { movieExternalId, isLoadingMovieExternalId } = getMovieExternalId(idMovie)

let socialNetworks = {}

watchEffect(() => {
  const socials = movieExternalId['_object'].data

  if (socials) {
    const socialNetWorkToKeep = ['facebook_id', 'instagram_id', 'twitter_id', 'imdb_id']
    for (const property of socialNetWorkToKeep) {
      if (socials[property] !== null && socials[property] !== '') {
        socialNetworks[property] = socials[property]
      }
    }
  }
})
</script>
<template>
  <div v-if="isLoadingMovieDetails">Loading...</div>
  <div v-else-if="movieDetails.statusCode">{{ movieDetails.statusCode }}</div>
  <div v-else>
    <HeaderMedia
      :details="movieDetails"
      :image="movieImage"
      :video="movieVideo"
      v-if="!isLoadingMovieVideo && !isLoadingMovieImage && !isLoadingMovieDetails"
    />
    <div>
      <h2 class="font-bold text-xl lg:text-3xl">{{ movie.title || movie.original_title }}</h2>
      <div class="flex gap-4 mt-2">
        <p>{{ movie.release_date.slice(0, 4) }}</p>
        <p>{{ formatToHours(+movie.runtime) }}</p>
        <div class="flex items-center gap-1">
          <p>{{ movie.vote_average.toFixed(1) }}</p>
          <svg class="h-4 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
            />
          </svg>
        </div>
      </div>
      <!--        button video | button photo-->
      <div class="flex gap-3 items-center mt-2 text-white lg:hidden">
        <div
          class="hover:bg-blue_main_hover bg-blue_main w-1/2 py-1 md:py-2 font-bold flex gap-2 items-center justify-center"
        >
          <svg class="h-5 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              class="fill-white"
              d="m11.5 14.5l7-4.5l-7-4.5v9ZM8 18q-.825 0-1.413-.588T6 16V4q0-.825.588-1.413T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.588 1.413T20 18H8Zm0-2h12V4H8v12Zm-4 6q-.825 0-1.413-.588T2 20V6h2v14h14v2H4ZM8 4v12V4Z"
            />
          </svg>
          <p class="uppercase">
            <span v-if="videoCount > 0">{{ videoCount }}</span> Vidéos
          </p>
        </div>
        <div
          class="hover:bg-blue_main_hover bg-blue_main w-1/2 py-1 md:py-2 font-bold flex gap-2 items-center justify-center"
        >
          <svg class="h-5 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              class="fill-white"
              d="M13.25 12.5L12.1 11q-.15-.175-.4-.175t-.4.175l-1.675 2.2q-.2.25-.063.525t.463.275h7.95q.325 0 .462-.275t-.062-.525l-2.425-3.175q-.15-.2-.4-.2t-.4.2l-1.9 2.475ZM8 18q-.825 0-1.413-.588T6 16V4q0-.825.588-1.413T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.588 1.413T20 18H8Zm0-2h12V4H8v12Zm-4 6q-.825 0-1.413-.588T2 20V7q0-.425.288-.713T3 6q.425 0 .713.288T4 7v13h13q.425 0 .713.288T18 21q0 .425-.288.713T17 22H4ZM8 4v12V4Z"
            />
          </svg>
          <p class="uppercase">
            <span v-if="imageCount > 0">{{ imageCount }}</span> Photos
          </p>
        </div>
      </div>

      <!--        gauche poster | droite haut genres bas droite description-->
      <div class="mt-4 flex gap-3">
        <img
          class="block md:hidden w-32 object-cover"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          :alt="'image from ' + movie.title || movie.original_title"
          loading="lazy"
        />
        <div>
          <!--            category-->
          <div class="flex gap-2 mb-2 flex-wrap">
            <span
              v-for="genre in movie.genres"
              :key="genre.id"
              class="text-sm p-1 px-2 bg-light_card_background dark:bg-dark_card_background w-fit rounded-lg"
            >
              {{ genre.name }}
            </span>
          </div>
          <!--            synopsis-->
          <div class="mb-2">
            <p><span class="font-bold">Synopsis : </span>{{ movie.overview }}</p>
          </div>
        </div>
      </div>

      <!--        credit pour directeur producteur scenario etc-->
      <div v-if="!isLoadingMovieCredit" class="grid grid-cols-1 divide-y my-3">
        <div v-if="director" class="flex flex-wrap gap-2 py-2">
          <p class="font-bold">Director<span v-if="director.length > 1">s</span></p>
          <RouterLink
            :to="{
              name: 'personDetail',
              params: {
                id: e.id,
                title: e.name.replaceAll(' ', '-').toLowerCase()
              }
            }"
            v-for="e in director"
            :key="e.id"
            class="hover:underline"
            :title="e.name || e.original_title"
            >- {{ e.name }}</RouterLink
          >
        </div>
        <div v-if="topWriters" class="flex flex-wrap gap-2 py-2">
          <p class="font-bold w-fit">Writer<span v-if="topWriters.length > 1">s</span></p>
          <RouterLink
            :to="{
              name: 'personDetail',
              params: {
                id: e.id,
                title: e.name.replaceAll(' ', '-').toLowerCase()
              }
            }"
            v-for="e in topWriters"
            :key="e.id"
            class="hover:underline"
            :title="e.name || e.original_title"
            >- {{ e.name }}</RouterLink
          >
        </div>
        <div v-if="topStars" class="flex gap-2 py-2 flex-wrap">
          <p class="font-bold">Star<span v-if="topStars.length > 1">s</span></p>
          <RouterLink
            :to="{
              name: 'personDetail',
              params: {
                id: e.id,
                title: e.name.replaceAll(' ', '-').toLowerCase()
              }
            }"
            v-for="e in topStars"
            :key="e.id"
            class="hover:underline"
            :title="e.name || e.original_title"
            >- {{ e.name }}</RouterLink
          >
        </div>
      </div>
      <div class="mt-6 flex gap-4 md:gap-20 flex-col sm:flex-row">
        <div class="flex-col">
          <TitlePart :title="'Informations'" />
          <div class="w-full sm:w-72 grid grid-cols-1 divide-y mt-4">
            <div class="flex gap-4 justify-between py-2">
              <h6 class="font-semibold">Status</h6>
              <p>{{ movie.status }}</p>
            </div>
            <div class="flex gap-4 justify-between py-2">
              <h6 class="font-semibold">Budget</h6>
              <p v-if="movie.budget">{{ movie.budget.toLocaleString() }}$</p>
              <p v-else>Not mentionned</p>
            </div>
            <div class="flex gap-4 justify-between py-2">
              <h6 class="font-semibold">Revenue</h6>
              <p v-if="movie.revenue">{{ movie.revenue.toLocaleString() }}$</p>
              <p v-else>Not mentionned</p>
            </div>
            <div class="flex gap-4 justify-between py-2">
              <h6 v-if="movie.revenue - movie.budget >= 0" class="font-semibold">Profit</h6>
              <h6 v-else class="font-semibold">Loss</h6>
              <p v-if="movie.revenue && movie.budget">
                {{
                  movie.revenue - movie.budget < 0
                    ? ((movie.revenue - movie.budget) * -1).toLocaleString()
                    : (movie.revenue - movie.budget).toLocaleString()
                }}$
              </p>
              <p v-else>Not mentionned</p>
            </div>
            <div class="flex gap-4 justify-between py-2">
              <h6 class="font-semibold">Original language</h6>
              <p v-if="movieOriginalLanguage">{{ movieOriginalLanguage[0].english_name }}</p>
              <p v-else>Not mentionned</p>
            </div>
          </div>
        </div>

        <!--          keywords-->
        <div class="flex flex-col">
          <Keywords :keywords="movieKeyword" :is-movie="true" v-if="!isLoadingMovieKeyword" />
          <!--          socials networks-->
          <ExternalCredits
            :is-person="false"
            :social-networks="socialNetworks"
            v-if="!isLoadingMovieExternalId"
            class="mt-4"
          />
        </div>
      </div>
    </div>

    <MovieRecommendation :idFilm="idMovie" />

    <TopCast v-if="star && !isLoadingMovieCredit" :actors="star.slice(0, 15)" />
  </div>
</template>
