<template>
  <div
    v-if="show"
    class="fixed bottom-6 right-6 z-50 flex items-center gap-4 px-5 py-4 rounded-xl shadow-xl text-white animate-fade border border-indigo-900"
    :class="bgClass"
  >
    <div class="font-semibold text-base">
      Ada versi baru dari website ini
    </div>

    <a
      :href="link"
      target="_blank"
      @click="show = false"
      class="px-4 py-2 rounded-lg bg-white/25 backdrop-blur-md text-white text-sm hover:bg-white/35 transition"
    >
      Kunjungi
    </a>
  </div>
</template>

<script setup>
const show = defineModel()

const props = defineProps({
  link: {
    type: String,
    required: true
  }
})

// warna toast ambil konsep gradasi ungu
const bgClass =
  'bg-gradient-to-r from-indigo-500 to-purple-500 backdrop-blur-md'
</script>

<style>
@keyframes fade {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade {
  animation: fade .35s ease-out;
}
</style>
