<template>
  <!--  <div class="max-w-7xl mx-auto md:mt-8 p-4">-->
  <div class="mt-12 flex flex-col gap-6 md:gap-8">
    <SearchBar />
    <h2>Results for "{{ query }}"</h2>
    <div v-if="isLoadingSearchMulti">Loading...</div>
    <div v-else-if="resultSearchQuery.results.length < 1">Not result found.</div>
    <div v-else v-for="result in search" :key="result.id">
      <RouterLink
        :to="{
          name: result.media_type === 'movie' ? 'movieDetail' : 'tvDetail',
          params: {
            id: result.id,
            title: (result.title !== undefined ? result.title : result.name).replaceAll(' ', '-').toLowerCase()
          }
        }"
        class="flex"
      >
        <img
          :src="'https://image.tmdb.org/t/p/w500/' + result.poster_path || result.backdrop_path || result.profile_path"
          alt="image"
          class="min-w-[96px] min-h-[144px] max-w-[96px] max-h-[144px] object-cover bg-grey_main"
          v-if="result.poster_path || result.backdrop_path !== null || result.profile_path"
        />
        <img
          src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2296%22%20height%3D%22144%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2096%20144%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%20%20%20%20%20%20%20%20%20%20%23holder%20text%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ffffff%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-family%3A%20sans-serif%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-size%3A%2011px%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-weight%3A%20400%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22holder%22%3E%0A%20%20%20%20%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%234876ea%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctext%20text-anchor%3D%22middle%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20dy%3D%22.3em%22%3EImage%20not%20found%3C%2Ftext%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fsvg%3E"
          alt="image"
          class="min-w-[96px] min-h-[144px] max-w-[96px] max-h-[144px] object-cover bg-grey_main"
          v-else
        />
        <div class="flex flex-col px-4 py-2">
          <h2 class="font-bold">{{ result.title || result.original_name }}</h2>
          <p>April 7, 2013</p>
          <p class="text-ellipsis overflow-hidden mt-auto line-clamp-2">
            {{ result.overview }}
          </p>
        </div>
      </RouterLink>
    </div>
    <div>
      <!--        item-->
    </div>
  </div>
  <!--  </div>-->
</template>

<script setup>
import { ref, watch } from 'vue'
import { useSearchMulti } from '@/services'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'

const route = useRoute()
const query = ref(route.params.query)

const { resultSearchQuery, isLoadingSearchMulti } = useSearchMulti(query.value)

onBeforeRouteUpdate((e) => {
  window.location.replace(e.params.query)
})

// filter empty result
const search = ref()
watch(resultSearchQuery, (e) => {
  search.value = e.results.filter((search) => !!search.overview)
  console.log(search.value)
})
</script>
