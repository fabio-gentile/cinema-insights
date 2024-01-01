<script setup>
import { getPersonCredits, getPersonDetails, getPersonExternalsCredits } from '@/services'
import { useRoute } from 'vue-router'
import { watch, watchEffect } from 'vue'
import router from '@/router'
import MovieCard from '@/components/card/MovieCard.vue'
import PersonWorks from '@/components/PersonWorks.vue'
import TitlePart from '@/components/ui/TitlePart.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import ExternalCredits from '@/components/ExternalCredits.vue'
import AppWrapper from '@/components/ui/AppWrapper.vue'
const route = useRoute()
const idPerson = +route.params.id.match(/\d+/)[0]
const { personDetails, isLoadingPersonDetails } = getPersonDetails(idPerson)

let age
watch(personDetails, (e) => {
  if (e.statusCode) {
    router.push('/error')
  }
})

watchEffect(() => {
  const person = personDetails['_object'].data

  if (person) {
    age = new Date() - new Date(person.birthday)
    age = Math.abs(new Date(age).getUTCFullYear() - 1970)
  }
})

const { personExternalsCredits, isLoadingPersonExternalsCredits } = getPersonExternalsCredits(idPerson)
let socialNetworks = {}

watchEffect(() => {
  const socials = personExternalsCredits['_object'].data

  if (socials) {
    const socialNetWorkToKeep = ['facebook_id', 'instagram_id', 'twitter_id', 'imdb_id']
    for (const property of socialNetWorkToKeep) {
      if (socials[property] !== null && socials[property] !== '') {
        socialNetworks[property] = socials[property]
      }
    }
  }
})

const { personCredits, isLoadingPersonCredits } = getPersonCredits(idPerson)

let works, worksByPopularity

watchEffect(() => {
  const allWorks = personCredits['_object'].data

  if (allWorks) {
    works = [...allWorks.cast, ...allWorks.crew]
    const uniqueWorks = Array.from(new Set(works.map((work) => work.id))).map((id) =>
      works.find((work) => work.id === id)
    )
    worksByPopularity = uniqueWorks.sort((a, b) => b.vote_count - a.vote_count)
  }
})
</script>

<template>
  <div v-if="isLoadingPersonDetails">Loading...</div>
  <div v-else class="mt-4 flex lg:gap-8 flex-col lg:flex-row">
    <!--      person info-->
    <div class="lg:max-w-[300px] w-full">
      <div class="flex flex-col justify-center items-center gap-4">
        <img
          v-if="personDetails.profile_path"
          :src="'https://image.tmdb.org/t/p/w500/' + personDetails.profile_path"
          :alt="'image of' + personDetails.name"
          class="object-contain w-40"
          loading="lazy"
        /><img
          v-else
          src="/noimage.png"
          :alt="'image of' + personDetails.name"
          class="object-contain w-40"
          loading="lazy"
        />
        <h2 class="text-center font-bold text-xl">{{ personDetails.name }}</h2>
        <ExternalCredits :is-person="true" :social-networks="socialNetworks" v-if="!isLoadingPersonExternalsCredits" />
      </div>
      <!--        personal informations-->
      <div class="flex-col mt-4">
        <TitlePart :title="'Informations'" />
        <div class="w-full lg:w-72 grid grid-cols-1 divide-y mt-4">
          <div class="flex gap-4 justify-between py-2" v-if="personDetails.known_for_department">
            <h6 class="font-semibold">Known for</h6>
            <p>{{ personDetails.known_for_department }}</p>
          </div>
          <div class="flex gap-4 justify-between py-2" v-if="personDetails.birthday">
            <h6 class="font-semibold">Age</h6>
            <p v-if="personDetails.deathday">
              {{ age + ' (' + (personDetails.birthday.slice(0, 4) + '-' + personDetails.deathday.slice(0, 4)) + ')' }}
            </p>
            <p v-else>
              {{ age }}
            </p>
          </div>
          <div class="flex gap-4 justify-between py-2 flex-wrap" v-if="personDetails.place_of_birth">
            <h6 class="font-semibold">Place of birth</h6>
            <p>{{ personDetails.place_of_birth }}</p>
          </div>
        </div>
      </div>
    </div>

    <!--      biography-->
    <div class="lg:mt-0 mt-4 lg:max-w-[calc(100vw-300px)] overflow-hidden">
      <div class="flex-col" v-if="personDetails.biography">
        <TitlePart :title="'Biography'" />
        <p class="mt-4">{{ personDetails.biography }}</p>
      </div>
      <div class="mt-4" v-if="!isLoadingPersonCredits">
        <TitlePart :title="'Known for'" class="mb-4" />
        <div v-if="worksByPopularity.length === 0">Loading...</div>
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
          <swiper-slide v-for="film in worksByPopularity.slice(0, 20)" :key="film.id">
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
      </div>
    </div>
  </div>
  <div class="mt-6">
    <TitlePart :title="'Filmography'" />
    <PersonWorks :works="personCredits" v-if="!isLoadingPersonCredits" class="mt-4" />
  </div>
</template>
