<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 animate-fade-in">
      <h2 class="text-lg font-bold text-gray-800 mb-2">Konfirmasi</h2>
      <p class="text-sm text-gray-600">{{ message }}</p>

      <div class="mt-4 flex justify-end space-x-2">
        <button
          @click="$emit('cancel')"
          class="px-3 py-1 border rounded text-gray-500 hover:bg-gray-100"
        >
          Batal
        </button>
        <button
          @click="$emit('confirm')"
          class="px-3 py-1 border border-red-500 text-red-500 hover:bg-red-50 rounded"
        >
          Ya, Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease;
}
</style>
