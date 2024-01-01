<script setup>
const props = defineProps({
  keywords: Object,
  isMovie: Boolean
})
const keywords = props.keywords
const isMovie = props.isMovie
</script>

<template>
  <div v-if="isMovie">
    <h6 v-if="keywords.keywords.length > 0" class="font-semibold">Keywords</h6>
    <div class="flex gap-2 flex-wrap mt-3">
      <span
        :key="keyword.id"
        v-for="keyword in keywords.keywords"
        class="text-sm p-1 px-2 bg-light_card_background dark:bg-dark_card_background rounded-lg"
      >
        {{ keyword.name }}
      </span>
    </div>
  </div>
  <div v-else>
    <h6 v-if="keywords.results.length > 0" class="font-semibold">Keywords</h6>
    <div class="flex gap-2 flex-wrap mt-3">
      <span
        :key="keyword.id"
        v-for="keyword in keywords.results"
        class="text-sm p-1 px-2 bg-light_card_background dark:bg-dark_card_background rounded-lg"
      >
        {{ keyword.name }}
      </span>
    </div>
  </div>
</template>
