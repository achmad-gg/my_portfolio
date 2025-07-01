<template>
  <div class="flex flex-col justify-center items-center min-h-screen bg-gray-200 text-center">
    <h1 class="text-4xl font-semibold text-red-600">Oops! Something went wrong.</h1>
    <p class="text-lg text-gray-700">We couldn't find the page you're looking for.</p>
    <NuxtLink to="/" class="text-blue-600 mt-4 hover:underline">
      Go back to Home
    </NuxtLink>
  </div>
</template>

<script setup>
// You can add more error handling logic if necessary
</script>

<style scoped>
/* Add any custom styles here */
</style>
