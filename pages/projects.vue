<template>
  <div>
    <section class="min-h-screen bg-gradient-to-t from-indigo-400 to-slate-100">
      <!-- Judul -->
      <div class="text-center pt-28">
        <h1 class="text-4xl font-extrabold text-slate-800 tracking-tight">
          Projects
        </h1>
        <p class="text-md text-slate-600 mt-2">Explore our latest works</p>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center py-20">
        <svg
          class="animate-spin h-10 w-10 text-indigo-500"
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

      <!-- Project Cards -->
      <div v-else-if="projects.length" class="flex justify-center">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 py-16"
        >
          <div
            v-for="project in projects"
            :key="project.id"
            class="bg-white bg-opacity-60 backdrop-blur-md w-80 h-[23rem] border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <!-- Gambar -->
            <div class="w-72 h-44 mx-auto mt-4 rounded-xl overflow-hidden">
              <img
                class="w-full h-full object-cover"
                :src="
                  project.image
                    ? `http://localhost:8000/storage/project/${project.image}`
                    : '/images/logo-3.png'
                "
                :alt="project.title"
              />
            </div>

            <!-- Konten -->
            <div class="px-5 pt-4">
              <h2 class="text-lg font-bold text-slate-800 capitalize truncate">
                {{ project.title }}
              </h2>
              <p
                class="mt-2 text-sm text-slate-600 line-clamp-2 whitespace-pre-line"
              >
                {{ project.content }}
              </p>
              <NuxtLink
                :to="`/project/${project.id}`"
                class="mt-4 inline-flex items-center text-sm font-medium border border-indigo-600 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700 rounded-md px-4 py-2 transition-all duration-300 focus:ring-4 focus:ring-indigo-300 focus:outline-none"
              >
                Read more
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-24 px-4 text-center text-gray-600"
      >
        <div
          class="bg-gray-200/50 w-32 h-32 flex items-center justify-center rounded-full shadow-xl mb-6 transition-transform duration-300 hover:scale-105"
        >
          <span class="text-5xl animate-bounce">🚀</span>
        </div>
        <h2 class="text-2xl font-bold">Projects Coming Soon</h2>
        <p class="text-md text-gray-500 mt-2 max-w-md">
          We’re working on something amazing. Stay tuned for awesome updates and
          new features!
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";


const { $api } = useNuxtApp();

useHead({ title: "Projects - Achmad" });

const projects = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const res = await $api.get("/projects");
    projects.value = res.data.data;
  } catch (err) {
    console.error("Gagal memuat project:", err);
  } finally {
    isLoading.value = false;
  }
});
</script>
