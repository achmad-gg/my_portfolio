<template>
  <div>
    <!-- Header -->
    <header
      class="bg-white dark:bg-gray-800 transition-colors duration-500 shadow px-4 py-3 flex justify-between items-center text-slate-800 dark:text-white"
    >
      <!-- Kiri: Judul dan tombol sidebar -->
      <div class="flex items-center gap-3">
        <!-- Tombol Sidebar (mobile) -->
        <button
          class="md:hidden text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-2xl transition-colors duration-300"
          @click="$emit('toggleSidebar')"
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
        <h1 class="font-bold text-lg">Dashboard</h1>
      </div>

      <!-- Kanan: Tombol-tombol -->
      <div class="flex items-center gap-2 ml-auto">
        <!-- Dark Mode Toggle -->
        <button
          @click="toggleDarkMode"
          class="text-lg w-10 h-10 flex items-center justify-center rounded-full border dark:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <transition name="slide-fade" mode="out-in">
            <svg
              v-if="!isDark"
              key="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-5 h-5 text-gray-800"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>

            <svg
              v-else
              key="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 text-gray-300"
            >
              <path
                d="M12 3V4M12 20V21M4 12H3M6.314 6.314L5.5 5.5M17.686 6.314L18.5 5.5M6.314 17.69L5.5 18.5M17.686 17.69L18.5 18.5M21 12H20M16 12C16 14.209 14.209 16 12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12Z"
              />
            </svg>
          </transition>
        </button>

        <!-- Logout -->
        <button
          @click="showConfirm = true"
          class="text-red-600 flex items-center gap-1 px-2 py-1 hover:bg-red-50 dark:hover:bg-red-800 hover:text-red-700 dark:hover:text-red-200 rounded transition-colors duration-300 text-sm md:text-base"
        >
          Logout
          <svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10 3V6H4L4 10H10L10 13H11L16 8L11 3H10Z" />
            <path d="M0 2V14H2V2H0Z" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Modal Logout -->
    <transition name="fade">
      <div
        v-if="showConfirm"
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div
          class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-sm text-center transition-colors duration-500"
        >
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Are you sure you want to logout?
          </h2>
          <div class="flex justify-center gap-3 mt-4">
            <button
              @click="confirmLogout"
              class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Yes, Logout
            </button>
            <button
              @click="showConfirm = false"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCookie } from "#app";
import { ref, onMounted } from "vue";

const router = useRouter();
const token = useCookie("token");
const showConfirm = ref(false);
const isDark = ref(false);

const confirmLogout = () => {
  token.value = null;
  showConfirm.value = false;
  router.push("/login");
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  updateDarkClass(isDark.value);
  localStorage.setItem("dark", isDark.value);
};

const updateDarkClass = (enabled) => {
  document.documentElement.classList[enabled ? "add" : "remove"]("dark");
};

onMounted(() => {
  const saved = localStorage.getItem("dark") === "true";
  isDark.value = saved;
  updateDarkClass(saved);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
