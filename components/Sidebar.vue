<template>
  <aside
    class="bg-white dark:bg-gray-800 dark:text-white shadow-md h-screen z-50 p-4 space-y-2 transition-all duration-300 fixed md:static top-0 left-0"
    :class="{
      'w-64': !collapsed,
      'w-20': collapsed,
      'translate-x-0': show || isDesktop,
      '-translate-x-full': !show && !isDesktop,
    }"
  >
    <!-- Header Admin -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center gap-2">
        <span
          class="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse"
        ></span>
        <span v-show="!collapsed" class="font-semibold">Achmad</span>
      </div>

      <!-- Tombol tutup sidebar (mobile) -->
      <button
        v-if="!isDesktop"
        class="text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white md:hidden"
        @click="$emit('close')"
        aria-label="Close Sidebar"
      >
        ✖
      </button>

      <!-- Tombol collapse (desktop) -->
      <button
        v-if="isDesktop"
        @click="toggleCollapse"
        :aria-label="collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'"
        class="text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
      >
        <!-- Expand Icon -->
        <svg
          v-if="collapsed"
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 12h16m-6-6l6 6-6 6"
          />
        </svg>

        <!-- Collapse Icon -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12H4m6-6l-6 6 6 6"
          />
        </svg>
      </button>
    </div>

    <!-- Menu Links -->
    <NuxtLink
      to="/dashboard/"
      @click="handleLinkClick"
      class="flex items-center gap-2 py-2 px-4 rounded transition-colors"
      :class="isActive('/dashboard/')"
    >
      <span>📊</span>
      <span v-show="!collapsed">Dashboard</span>
    </NuxtLink>

    <NuxtLink
      to="/dashboard/projects"
      @click="handleLinkClick"
      class="flex items-center gap-2 py-2 px-4 rounded transition-colors"
      :class="isActive('/dashboard/projects')"
    >
      <span>🗂️</span>
      <span v-show="!collapsed">Projects</span>
    </NuxtLink>

    <NuxtLink
      to="/dashboard/projects/category"
      @click="handleLinkClick"
      class="flex items-center gap-2 py-2 px-4 rounded transition-colors"
      :class="isActive('/dashboard/projects/category')"
    >
      <span>🏷️</span>
      <span v-show="!collapsed">Category</span>
    </NuxtLink>
  </aside>

  <!-- Overlay untuk mobile -->
  <div
    v-if="show && !isDesktop"
    class="fixed inset-0 bg-black bg-opacity-30 z-40"
    @click="$emit('close')"
  ></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({ show: Boolean });
const emit = defineEmits(["close"]);

const route = useRoute();
const isOpen = ref(false);
const isDesktop = ref(false);
const collapsed = ref(false);

const toggleCollapse = () => {
  if (!isDesktop.value) return;
  collapsed.value = !collapsed.value;
};

const handleLinkClick = () => {
  if (collapsed.value) collapsed.value = false;
  if (!isDesktop.value) emit("close");
};

const isActive = (path) =>
  route.path === path
    ? "bg-blue-100 text-blue-700 font-semibold dark:bg-gray-700 dark:text-blue-300"
    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";

const checkScreen = () => {
  isDesktop.value = window.innerWidth >= 768;
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreen);
});

watch(
  () => route.path,
  (newPath) => {
    isOpen.value = newPath.startsWith("/dashboard/home");
  },
);
</script>
