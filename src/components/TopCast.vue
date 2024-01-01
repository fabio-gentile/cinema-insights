<template>
  <TitlePart :title="'Top cast'" class="my-4" />
  <div class="flex gap-6 mb-4 h-full">
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
      <swiper-slide v-for="actor in actors" :key="actor.id">
        <div
          class="inline-block w-[210px] h-full md:w-60 bg-light_card_background dark:bg-dark_card_background border border-gray-200 rounded-lg shadow dark:border-gray-700"
        >
          <RouterLink
            class="relative"
            :to="{
              name: 'personDetail',
              params: {
                id: actor.id,
                title: actor.name.replaceAll(' ', '-').toLowerCase()
              }
            }"
          >
            <img
              v-if="actor.profile_path"
              class="rounded-t-lg h-60 object-cover md:h-96 w-full"
              :src="'https://image.tmdb.org/t/p/w500/' + actor.profile_path"
              :alt="'photo of ' + actor.name || actor.original_name"
              loading="lazy"
            />
            <img
              v-else
              class="rounded-t-lg h-60 object-cover md:h-96 w-full"
              src="/noimage.png"
              :alt="'photo of ' + actor.name || actor.original_name"
              loading="lazy"
            />
          </RouterLink>
          <div class="py-4 px-2 md:px-3 flex flex-col justify-between">
            <div class="mb-3">
              <RouterLink
                :to="{
                  name: 'personDetail',
                  params: {
                    id: actor.id,
                    title: actor.name.replaceAll(' ', '-').toLowerCase()
                  }
                }"
                :title="actor.name || actor.original_name"
                class="mb-2 truncate font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue_main"
                >{{ actor.name || actor.original_name }}
              </RouterLink>
            </div>
            <div>
              <p class="text-md text-gray-600 dark:text-gray-200">{{ actor.character }}</p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import TitlePart from '@/components/ui/TitlePart.vue'

defineProps({
  actors: Array
})

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
</script>
