<script setup>
import { ref, watch, watchEffect } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import {
  getTvShowKeyword,
  getTvShowDetails,
  getTvShowImage,
  getTvShowExternalId,
  getTvShowCredit,
  getAggregateCredits
} from '@/services'
import { getTvShowVideo } from '@/services'
import '@/assets/styles/navigation.css'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import TvShowRecommendations from '@/components/TvShowRecommendations.vue'
import TitlePart from '@/components/ui/TitlePart.vue'
import ExternalCredits from '@/components/ExternalCredits.vue'
import HeaderMedia from '@/components/HeaderMedia.vue'
import Keywords from '@/components/Keywords.vue'
const route = useRoute()
const idMovie = +route.params.id.match(/\d+/)[0]

const { tvShowDetails, isLoadingTvShowDetails } = getTvShowDetails(idMovie)

watch(tvShowDetails, (newData) => {
  if (newData.statusCode) {
    router.push('/error')
  }
})

const tvShow = ref(tvShowDetails)
let tvShowOriginalLanguage, lastSeason

watchEffect(() => {
  if (tvShow.value) {
    tvShowOriginalLanguage = tvShow.value.spoken_languages.filter(
      (lang) => lang.iso_639_1 === tvShow.value.original_language
    )
    lastSeason = tvShow.value.seasons.filter((season) => season.season_number === tvShow.value.number_of_seasons)
  }
})

// cast
const { tvShowCredit, isLoadingTvShowCredit } = getTvShowCredit(idMovie)
let credit, writer, star, topStars, topWriters

watchEffect(() => {
  const credits = tvShowCredit['_object'].data

  if (credits) {
    credit = credits
    writer = credit.crew.filter((crew) => crew.department === 'Writing')
    star = [...credit.cast].sort((a, b) => b.popularity - a.popularity)
    topStars = star.slice(0, 6)
    topWriters = writer.slice(0, 4)
  }
})

// videos
const { tvShowVideo, isLoadingTvShowVideo } = getTvShowVideo(idMovie)
let videoCount

const { tvShowImage, isLoadingTvShowImage } = getTvShowImage(idMovie)
let imageCount

watchEffect(() => {
  const images = tvShowImage['_object'].data
  const videos = tvShowVideo['_object'].data

  if (images) {
    imageCount = images.logos.length + images.backdrops.length + images.posters.length
  }

  if (videos) {
    videoCount = videos.results.length
  }
})

const { tvShowKeyword, isLoadingTvShowKeyword } = getTvShowKeyword(idMovie)

const { tvShowExternalId, isLoadingTvShowExternalId } = getTvShowExternalId(idMovie)

let socialNetworks = {}
watchEffect(() => {
  const socials = tvShowExternalId['_object'].data

  if (socials) {
    const socialNetWorkToKeep = ['facebook_id', 'instagram_id', 'twitter_id', 'imdb_id']
    for (const property of socialNetWorkToKeep) {
      if (socials[property] !== null && socials[property] !== '') {
        socialNetworks[property] = socials[property]
      }
    }
  }
})

const { aggregateCredits, isLoadingAggregateCredits } = getAggregateCredits(idMovie)
</script>
<template>
  <div v-if="isLoadingTvShowDetails">Loading...</div>
  <div v-else-if="tvShowDetails.statusCode">{{ tvShowDetails.statusCode }}</div>
  <div v-else>
    <HeaderMedia
      :details="tvShowDetails"
      :image="tvShowImage"
      :video="tvShowVideo"
      v-if="!isLoadingTvShowImage && !isLoadingTvShowVideo && !isLoadingTvShowDetails"
    />
    <div>
      <h2 class="font-bold text-xl lg:text-3xl">
        {{ tvShow.title || tvShow.original_title || tvShow.original_name }}
      </h2>
      <div class="flex gap-4 mt-2">
        <p>{{ tvShow.number_of_episodes }} episodes</p>
        <p>
          {{ tvShow.first_air_date.slice(0, 4) }}-{{
            tvShow.status === 'Ended' ? tvShow.last_air_date.slice(0, 4) : ''
          }}
        </p>
        <div class="flex items-center gap-1">
          <p>{{ tvShow.vote_average.toFixed(1) }}</p>
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
          :src="'https://image.tmdb.org/t/p/w500/' + tvShow.poster_path"
          :alt="'image from ' + tvShow.title || tvShow.original_title"
          loading="lazy"
        />
        <div>
          <!--            category-->
          <div class="flex gap-2 mb-2 flex-wrap">
            <span
              :key="genre.id"
              v-for="genre in tvShow.genres"
              class="text-sm p-1 px-2 bg-light_card_background dark:bg-dark_card_background w-fit rounded-lg"
            >
              {{ genre.name }}
            </span>
          </div>
          <!--            synopsis-->
          <div class="mb-2">
            <!--              <p><span class="font-bold">Synopsis : </span>{{ truncateText(tvShow.overview) }}</p>-->
            <p class="line-clamp-[8] sm:line-clamp-none">
              <span class="font-bold">Synopsis : </span>{{ tvShow.overview }}
            </p>
          </div>
        </div>
      </div>

      <!--        credit pour directeur producteur scenario etc-->
      <div class="grid grid-cols-1 divide-y my-3">
        <div class="flex flex-wrap gap-2 py-2" v-if="tvShow.created_by.length > 0">
          <p class="font-bold">Director<span v-if="tvShow.created_by.length > 0">s</span></p>
          <RouterLink
            :to="{
              name: 'personDetail',
              params: {
                id: e.id,
                title: e.name.replaceAll(' ', '-').toLowerCase()
              }
            }"
            v-for="e in tvShow.created_by"
            :key="e.id"
            class="hover:underline"
            :title="e.name || e.original_title"
            >- {{ e.name }}</RouterLink
          >
        </div>
        <div v-if="!isLoadingTvShowCredit">
          <div v-if="topWriters.length > 0" class="flex flex-wrap gap-2 py-2">
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
          <div v-if="topStars.length > 0" class="flex gap-2 py-2 flex-wrap">
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
      </div>
      <div class="mt-6 flex gap-4 md:gap-20 flex-col sm:flex-row">
        <div class="flex-col">
          <TitlePart :title="'Informations'" />
          <div class="w-full sm:w-72 grid grid-cols-1 divide-y mt-4">
            <div class="flex gap-4 justify-between py-2">
              <h6 class="font-semibold">Status</h6>
              <p>{{ tvShow.status }}</p>
            </div>
            <div class="flex gap-4 justify-between py-2">
              <h6 class="font-semibold">Number of seasons</h6>
              <p v-if="tvShow.number_of_seasons">{{ tvShow.number_of_seasons }}</p>
              <p v-else>Not mentionned</p>
            </div>
            <div class="flex gap-4 justify-between py-2">
              <h6 class="font-semibold">Number of episodes</h6>
              <p v-if="tvShow.number_of_episodes">{{ tvShow.number_of_episodes }}</p>
              <p v-else>Not mentionned</p>
            </div>
            <div class="flex gap-4 justify-between py-2">
              <h6 class="font-semibold">Original language</h6>
              <p v-if="tvShowOriginalLanguage.length > 0">{{ tvShowOriginalLanguage[0].english_name }}</p>
              <p v-else>Not mentionned</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <Keywords :keywords="tvShowKeyword" :is-movie="false" v-if="!isLoadingTvShowKeyword" />
          <!--          socials networks-->
          <ExternalCredits :social-networks="socialNetworks" v-if="!isLoadingTvShowExternalId" class="mt-4" />
        </div>
      </div>
      <div class="mt-6">
        <TitlePart :title="'Latest season'" />
        <!--          latest season -->
        <div class="flex my-4">
          <img
            class="rounded-lg hidden md:block md:h-48 object-contain"
            :src="'https://image.tmdb.org/t/p/w500/' + lastSeason[0].poster_path"
            :alt="'image of the episode ' + tvShow.last_episode_to_air.name"
            loading="lazy"
            v-if="lastSeason[0].poster_path"
          />
          <img
            v-else
            class="rounded-lg hidden md:block md:h-48 object-contain"
            :src="'https://image.tmdb.org/t/p/w500/' + tvShow.poster_path"
            :alt="'image of the episode ' + tvShow.last_episode_to_air.name"
            loading="lazy"
          />
          <div class="flex flex-col gap-2 py-4 pl-4">
            <h3 class="font-bold">{{ tvShow.name }}</h3>
            <p>Season {{ lastSeason[0].season_number }} - {{ tvShow.last_episode_to_air.episode_number }} episodes</p>
            <!--              <p>{{ tvShow.last_episode_to_air.air_date }}</p>-->
            <div class="flex items-center gap-2 w-fit" title="Rating /10" v-if="lastSeason[0].vote_average > 0">
              <svg class="h-4 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path
                  d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                />
              </svg>
              <p class="font-semibold">
                {{ lastSeason[0].vote_average.toFixed(1) }}
              </p>
            </div>
            <p class="mt-auto line-clamp-[10] md:line-clamp-3">
              {{ lastSeason[0].overview !== '' ? lastSeason[0].overview : tvShow.overview }}
            </p>
          </div>
        </div>
        <!--          all season-->
        <RouterLink
          :to="{
            name: 'tvSeason',
            params: {
              id: idMovie,
              title: (tvShow.title !== undefined ? tvShow.title : tvShow.name).replaceAll(' ', '-').toLowerCase(),
              season: 1
            }
          }"
          class="font-bold text-xl flex gap-4 items-center w-fit group hover:text-blue_main_hover"
        >
          See all the seasons
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 group-hover:fill-blue_main_hover dark:fill-white"
            viewBox="0 0 320 512"
          >
            <path
              d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
            />
          </svg>
        </RouterLink>
      </div>

      <!--        cast-->
      <div v-if="isLoadingAggregateCredits">Loading</div>
      <div v-else-if="aggregateCredits.cast.length > 0">
        <TitlePart :title="'Cast'" class="my-4" />
        <div class="mb-6">
          <!--            swiper here-->
          <swiper
            :navigation="true"
            :slidesPerView="'auto'"
            :space-between="16"
            :centered-slides="false"
            :pagination="{
              clickable: true
            }"
            :modules="[Navigation]"
          >
            <swiper-slide v-for="cast in aggregateCredits.cast.slice(0, 15)" :key="cast.id">
              <div
                class="md:h-[520px] h-[380px] inline-block w-[210px] md:w-60 bg-light_card_background dark:bg-dark_card_background border border-gray-200 rounded-lg shadow dark:border-gray-700"
              >
                <RouterLink
                  :to="{
                    name: 'personDetail',
                    params: {
                      id: cast.id,
                      title: cast.name.replaceAll(' ', '-').toLowerCase()
                    }
                  }"
                  :title="cast.name"
                  class="relative"
                >
                  <img
                    v-if="cast.profile_path"
                    class="rounded-t-lg h-60 object-cover md:h-96 w-full"
                    :src="'https://image.tmdb.org/t/p/w500/' + cast.profile_path"
                    :alt="'poster of ' + cast.name || cast.original_name"
                    loading="lazy"
                  />
                  <img
                    v-else
                    class="rounded-t-lg h-60 object-cover md:h-96 w-full"
                    src="/noimage.png"
                    :alt="'poster of ' + cast.name || cast.original_name"
                    loading="lazy"
                  />
                </RouterLink>
                <div class="py-4 px-2 md:px-3 flex flex-col justify-between">
                  <div class="mb-1">
                    <RouterLink
                      :to="{
                        name: 'personDetail',
                        params: {
                          id: cast.id,
                          title: cast.name.replaceAll(' ', '-').toLowerCase()
                        }
                      }"
                      :title="cast.name"
                      class="mb-2 truncate font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue_main"
                      >{{ cast.name || cast.original_name }}
                    </RouterLink>
                  </div>
                  <div>
                    <p class="text-md text-gray-600 dark:text-gray-200">
                      {{ cast.roles[0].character }}
                    </p>
                    <p class="text-md text-gray-600 dark:text-gray-200">{{ cast.total_episode_count }} episodes</p>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>

          <TvShowRecommendations :idTvShow="idMovie" />
        </div>
      </div>
    </div>
  </div>
</template>
