<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
  >
    <div
      class="relative max-w-2xl w-full mx-4 p-6 bg-white dark:bg-gray-900 dark:text-white rounded-xl shadow-lg overflow-y-auto max-h-[90vh] transition-all scale-in"
    >
      <!-- Tombol Close -->
      <button
        @click="$emit('update:modelValue', false)"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>

      <!-- Slot Konten -->
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
@keyframes scaleIn {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.scale-in {
  animation: scaleIn 0.2s ease-out forwards;
}
</style>
