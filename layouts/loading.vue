<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="flex justify-center items-center">
      <svg
        class="animate-spin h-12 w-12 text-purple-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke-width="4"
          :stroke="`rgba(255, 255, 255, 0.2)`"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
// You can add logic for this layout in the future if needed.
</script>

<style scoped>
/* Add any custom styles here */
</style>
