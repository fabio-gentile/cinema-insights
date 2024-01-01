<template>
  <div class="w-full dark:bg-grey_main bg-gray-50 min-h-screen">
    <HeaderNav />
    <AppWrapper>
      <router-view :key="route.path"></router-view>
    </AppWrapper>
    <FooterNav />
  </div>
</template>

<script setup>
import FooterNav from '@/components/ui/FooterNav.vue'
import HeaderNav from '@/components/ui/HeaderNav.vue'
import { useRoute } from 'vue-router'
import AppWrapper from '@/components/ui/AppWrapper.vue'
const route = useRoute()
</script>

<style></style>
