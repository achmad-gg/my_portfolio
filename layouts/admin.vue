<template>
  <div class="flex h-screen bg-gray-100 relative">
    <!-- Sidebar -->
    <Sidebar :show="showSidebar" @close="showSidebar = false" />

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <Topbar @toggleSidebar="showSidebar = !showSidebar" />
      <main class="overflow-auto flex-1 dark:bg-gray-900">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'
import axios from 'axios'

import { useCookie } from '#app'

const token = useCookie('token')
console.log('Token (from layout):', token.value)

axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
definePageMeta({
  middleware: 'auth'
})

const showSidebar = ref(false)
</script>
