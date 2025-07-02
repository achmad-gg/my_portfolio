<template>
  <div
    class="relative bg-gradient-to-br from-indigo-100 to-indigo-200 min-h-screen"
  >
    <!-- Tombol Back -->
    <button
      @click="goBack"
      class="absolute top-24 left-5 md:left-7 lg:top-24 xl:top-28 lg:left-16 z-20 border border-indigo-500 px-3 py-1 rounded-md text-indigo-600 hover:bg-indigo-200 text-sm font-medium transition-all"
    >
      Back
    </button>

    <!-- Konten Utama -->
    <div class="max-w-5xl mx-auto px-6 py-36 md:py-24 text-slate-800">
      <!-- Loading Spinner -->
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

      <!-- Detail Project -->
      <div
        v-else-if="project"
        class="bg-white/80 backdrop-blur-md p-8 md:top-10 lg:top-12 rounded-2xl shadow-xl relative border border-indigo-100"
      >
        <!-- Label Bidang -->
        <span
          class="absolute top-10 left-10 bg-indigo-600/70 md:bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded shadow-md"
        >
          {{ project.bidang }}
        </span>

        <!-- Gambar -->
        <div class="mb-6 rounded-lg overflow-hidden border bg-white">
          <img
            class="w-full max-h-72 object-contain mx-auto"
            :src="
              project.image
                ? `http://localhost:8000/storage/project/${project.image}`
                : '/images/logo-3.png'
            "
            :alt="project.title"
          />
        </div>

        <!-- Judul -->
        <h1
          class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight"
        >
          {{ project.title }}
        </h1>

        <!-- Kategori -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="cat in project.categories"
            :key="cat.id"
            class="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full"
          >
            {{ cat.name }}
          </span>
        </div>

        <!-- Deskripsi -->
        <p
          class="text-base leading-relaxed text-slate-700 whitespace-pre-line break-words"
        >
          {{ project.content }}
        </p>

        <!-- Link -->
        <div
          v-if="project.github_link || project.demo_link"
          class="mt-10 flex flex-wrap gap-4"
        >
          <a
            v-if="project.github_link"
            :href="project.github_link"
            target="_blank"
            class="inline-flex items-center border border-black text-black hover:bg-slate-200 px-3 py-2 text-sm font-semibold rounded-md transition"
          >
            <IconsGithub class="mx-2" /> GitHub
          </a>
          <a
            v-if="project.demo_link"
            :href="project.demo_link"
            target="_blank"
            class="inline-flex items-center border border-indigo-500 text-indigo-500 hover:bg-indigo-100 px-3 py-2 text-sm font-semibold rounded-md transition"
          >
            <IconsDeploy class="mx-2" /> Live Demo
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

useHead({ title: "Project Detail" });

const route = useRoute();
const project = ref(null);
const isLoading = ref(true);
const { $api } = useNuxtApp();

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "/projects";
  }
};

onMounted(async () => {
  try {
    const res = await $api.get(`/projects/${route.params.id}`);
    project.value = res.data.data;
  } catch (err) {
    console.error("Project tidak ditemukan:", err);
    // Tampilkan halaman error 404
    throw showError({ statusCode: 404, statusMessage: "Project Not Found!" });
  } finally {
    isLoading.value = false;
  }
});
</script>
