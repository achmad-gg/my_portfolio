<template>
  <div
    class="max-w-full mx-auto min-h-full p-6 bg-white text-slate-800 dark:bg-gray-900 dark:text-gray-100"
  >
    <!-- Heading -->
    <h1 class="text-2xl font-bold mb-2">Welcome, Achmad 👋</h1>
    <p class="mb-6 text-gray-600 dark:text-gray-300">
      The following is a summary of project management.
    </p>

    <!-- Statistik -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <div
        class="p-6 border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded shadow"
      >
        <h2 class="text-sm text-gray-500 dark:text-gray-300">Total Projects</h2>
        <p class="text-2xl font-bold">{{ total }}</p>
      </div>
      <div
        class="p-6 border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded shadow"
      >
        <h2 class="text-sm text-gray-500 dark:text-gray-300">Frontend</h2>
        <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          {{ frontend }}
        </p>
      </div>
      <div
        class="p-6 border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded shadow"
      >
        <h2 class="text-sm text-gray-500 dark:text-gray-300">Backend</h2>
        <p class="text-2xl font-bold text-yellow-500 dark:text-yellow-400">
          {{ backend }}
        </p>
      </div>
      <div
        class="p-6 border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded shadow"
      >
        <h2 class="text-sm text-gray-500 dark:text-gray-300">Fullstack</h2>
        <p class="text-2xl font-bold text-purple-500 dark:text-purple-400">
          {{ fullstack }}
        </p>
      </div>
    </div>

    <!-- Project Terbaru -->
    <h2 class="text-lg font-semibold mb-2">Latest Projects</h2>
    <div class="overflow-x-auto">
      <table
        class="min-w-full text-sm bg-white dark:bg-gray-800 rounded border border-slate-200 dark:border-gray-700 shadow mb-6"
      >
        <thead
          class="bg-gray-100 dark:bg-gray-700 text-xs uppercase text-gray-600 dark:text-gray-300"
        >
          <tr>
            <th class="p-3 text-left whitespace-nowrap">Title</th>
            <th class="p-3 text-left whitespace-nowrap">Categories</th>
            <th class="p-3 text-left whitespace-nowrap">Type</th>
            <th class="p-3 text-right whitespace-nowrap">Created</th>
            <th class="p-3 text-right whitespace-nowrap">Updated</th>
          </tr>
        </thead>
        <tbody v-if="latestProjects.length">
          <tr
            v-for="(p, i) in latestProjects"
            :key="i"
            class="border-t border-slate-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <td class="p-3 font-medium whitespace-nowrap">{{ p.title }}</td>
            <td class="p-3 space-x-1 whitespace-nowrap">
              <span
                v-for="cat in p.categories"
                :key="cat.id"
                class="bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300 text-xs px-2 py-0.5 rounded-full"
              >
                {{ cat.name }}
              </span>
            </td>
            <td class="p-3 capitalize whitespace-nowrap">{{ p.bidang }}</td>
            <td
              class="p-3 text-right text-gray-600 dark:text-gray-300 text-sm whitespace-nowrap"
            >
              {{ new Date(p.created_at).toLocaleDateString() }}
            </td>
            <td
              class="p-3 text-right text-gray-600 dark:text-gray-300 text-sm whitespace-nowrap"
            >
              {{ new Date(p.updated_at).toLocaleDateString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-10">
      <svg
        class="animate-spin h-8 w-8 text-indigo-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
        />
      </svg>
    </div>

    <!-- Tidak ada project -->
    <div
      v-else-if="!latestProjects.length"
      class="text-center text-gray-500 dark:text-gray-400 py-10"
    >
      The project doesn't exist yet
    </div>

    <!-- Aksi Cepat -->
    <div class="flex gap-4">
      <NuxtLink
        to="/dashboard/projects/form"
        class="border border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900 hover:scale-105 px-2 py-1 rounded transition"
      >
        Add Project
      </NuxtLink>
      <NuxtLink
        to="/dashboard/projects"
        class="border border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:scale-105 px-2 py-1 rounded transition"
      >
        View All
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useCookie } from "#app";

useHead({ title: "Dashboard - Admin" });
definePageMeta({
  middleware: "auth",
  layout: "admin",
});

const token = useCookie("token");
console.log("Token on dashboard:", token.value);

const projects = ref([]);

const isLoading = ref(true);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/projects");
    projects.value = res.data.data;
  } catch (err) {
    console.error("Gagal memuat data project:", err);
  } finally {
    isLoading.value = false;
  }
});

const total = computed(() => projects.value.length);
const frontend = computed(
  () => projects.value.filter((p) => p.bidang === "frontend").length,
);
const backend = computed(
  () => projects.value.filter((p) => p.bidang === "backend").length,
);
const fullstack = computed(
  () => projects.value.filter((p) => p.bidang === "fullstack").length,
);
const latestProjects = computed(() =>
  projects.value.slice().reverse().slice(0, 3),
);
</script>
