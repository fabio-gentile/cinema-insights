<template>
  <div class="text-4xl text-center md:text-5xl font-bold my-6">Cinema Insights Made Easy</div>
  <SearchBar />
  <HomePopularFilm />
  <HomePopularPerson />
  <HomeTheatre />
</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue'
import HomePopularFilm from '@/components/HomePopularFilm.vue'
import HomePopularPerson from '@/components/HomePopularPerson.vue'
import HomeTheatre from '@/components/HomeTheatre.vue'
</script>
