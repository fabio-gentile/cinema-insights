<script setup>
import { getTrendingPerson } from '@/services'
import { computed, ref, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import ButtonFetchNext from '@/components/card/ButtonFetchNext.vue'
import TitlePart from '@/components/ui/TitlePart.vue'

const {
  resultTrendingPerson,
  isLoadingTrendingPerson,
  hasNextPageTrendingPerson,
  isFetchingNextPageTrendingPerson,
  fetchNextPageTrendingPerson
} = getTrendingPerson()
const search = ref([])
const directors = ref([])
const actors = ref([])

watch(resultTrendingPerson, (e) => {
  const newResults = e.pages[e.pages.length - 1].results
  for (const result of newResults) {
    search.value.push(result)

    if (result.known_for_department === 'Directing') {
      directors.value.push(result)
    } else {
      actors.value.push(result)
    }
  }
})

const selectedOption = ref('all')
const filteredPersons = computed(() => {
  if (selectedOption.value === 'all') {
    return search.value
  } else if (selectedOption.value === 'Directing') {
    return directors.value
  } else {
    return actors.value
  }
})
</script>

<template>
  <div class="flex gap-8 font-bold mt-8 mb-4 items-center">
    <TitlePart :title="'Stars'" />
    <div class="relative">
      <select
        v-model="selectedOption"
        class="w-40 hover:bg-blue_main_hover bg-blue_main rounded-lg text-white p-2 px-4 appearance-none relative cursor-pointer"
      >
        <option value="all">All</option>
        <option value="Directing">Directing</option>
        <option value="Acting">Acting</option>
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
  <div class="flex gap-6 overflow-x-auto h-full">
    <div v-if="isLoadingTrendingPerson">Loading...</div>
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
      <swiper-slide v-for="person in filteredPersons" :key="person.id">
        <div
          class="inline-block w-[210px] md:w-60 bg-light_card_background dark:bg-dark_card_background border border-gray-200 rounded-lg shadow dark:border-gray-700"
        >
          <RouterLink
            :to="{
              name: 'personDetail',
              params: {
                id: person.id,
                title: person.name.replaceAll(' ', '-').toLowerCase()
              }
            }"
            class="relative"
          >
            <img
              class="rounded-t-lg h-60 object-cover md:h-96 w-full"
              :src="'https://image.tmdb.org/t/p/w500/' + person.profile_path"
              :alt="'poster of ' + person.name || person.original_title"
            />
          </RouterLink>
          <div class="py-4 px-2 md:px-3 flex flex-col justify-between">
            <div class="mb-3">
              <RouterLink
                :to="{
                  name: 'personDetail',
                  params: {
                    id: person.id,
                    title: person.name.replaceAll(' ', '-').toLowerCase()
                  }
                }"
                :title="person.name || person.original_title"
                class="mb-2 truncate font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue_main"
                >{{ person.name || person.original_title }}
              </RouterLink>
            </div>
            <div>
              <p class="mb-2 font-semibold">Known for</p>
              <ul class="list-disc">
                <li
                  class="mb-2 truncate text-md text-gray-600 dark:text-gray-200"
                  v-for="project in person.known_for"
                  :key="project.id"
                >
                  <RouterLink
                    :to="{
                      name: project.media_type === 'movie' ? 'movieDetail' : 'tvDetail',
                      params: {
                        id: project.id,
                        title: (project.title !== undefined ? project.title : project.name)
                          .replaceAll(' ', '-')
                          .toLowerCase()
                      }
                    }"
                    class="hover:underline"
                    :title="project.title || project.name"
                    >- {{ project.title || project.name }}</RouterLink
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <ButtonFetchNext
          :hasNextPage="hasNextPageTrendingPerson"
          :fetchNextPage="fetchNextPageTrendingPerson"
          :isFetchingNextPage="isFetchingNextPageTrendingPerson"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>
