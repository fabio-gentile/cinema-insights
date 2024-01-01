<script setup>
const { works } = defineProps(['works'])

const getReleaseDate = (work) => work.release_date || work.first_air_date
const sortByDateDesc = (a, b) => new Date(getReleaseDate(b)) - new Date(getReleaseDate(a))

const uniqueWorks = [...works.cast, ...works.crew].filter(
  (work, index, self) => self.findIndex((w) => w.id === work.id) === index
)

const worksByDate = uniqueWorks.filter((work) => getReleaseDate(work) !== '').sort(sortByDateDesc)

const worksPerYear = worksByDate.reduce((acc, work) => {
  const year = new Date(getReleaseDate(work)).getFullYear()
  if (!isNaN(year)) {
    acc[year] = acc[year] || []
    acc[year].push(work)
  }
  return acc
}, {})

Object.values(worksPerYear).forEach((worksInYear) => worksInYear.sort(sortByDateDesc))

const sortedYears = Object.keys(worksPerYear).sort((a, b) => b - a)
</script>

<template>
  <div v-if="worksPerYear" class="rounded-lg border border-gray-200 shadow dark:border-gray-700">
    <div
      v-for="(year, index) in sortedYears"
      :key="year"
      class="bg-light_card_background dark:bg-dark_card_background border-gray-300"
      :class="{ 'border-b-[1px]': index !== sortedYears.length - 1 }"
    >
      <div v-for="work in worksPerYear[year]" :key="work.id" class="px-2 lg:px-4 py-3">
        <RouterLink
          :to="{
            name: work.media_type === 'movie' ? 'movieDetail' : 'tvDetail',
            params: {
              id: work.id,
              title: (work.title !== undefined ? work.title : work.name).replaceAll(' ', '-').toLowerCase()
            }
          }"
          class="group"
        >
          <p class="font-semibold group-hover:text-blue_main_hover">{{ year }} - {{ work.title || work.name }}</p>
          <p class="ml-4" v-if="work.department">
            {{ work.department }}
          </p>
          <p class="ml-4" v-else-if="work.character">
            <span class="text-gray-400">playing</span> {{ work.character === 'Self' ? 'himself' : work.character }}
          </p>
          <p class="ml-4 text-gray-400" v-else>role not mentionned</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
