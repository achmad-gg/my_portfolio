<script setup>
import ToastUpdate from '~/components/ToastUpdate.vue'

const showToast = ref(true)
const linkWebsite = 'https://gg-achmad.vercel.app'
</script>

<template>
  <NuxtLayout />
  <ToastUpdate v-model="showToast" :link="linkWebsite" />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
