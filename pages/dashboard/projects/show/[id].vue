<template>
  <div class="max-w-3xl mx-auto px-6 py-10 text-slate-800">
    <NuxtLink
      to="/dashboard/projects"
      class="text-indigo-600 hover:underline text-sm inline-block mb-4"
    >
      ← Back
    </NuxtLink>

    <div
      v-if="!isLoading && project"
      class="bg-white p-6 rounded-lg shadow dark:bg-slate-800 dark:text-gray-100"
    >
      <img
        class="w-full max-h-72 object-contain rounded mb-6"
        :src="`http://api-portofolio.up.railway.app/storage/project/${project.image}`"
        :alt="project.title"
      />

      <h1 class="text-2xl font-bold mb-2">{{ project.title }}</h1>

      <!-- Bidang & Kategori -->
      <p class="italic text-gray-600 mb-4 dark:text-gray-100">
        <span class="capitalize">{{ project.bidang }}</span> |
        <span v-for="(cat, index) in project.categories" :key="cat.id">
          {{ cat.name
          }}<span v-if="index < project.categories.length - 1">, </span>
        </span>
      </p>

      <!-- Konten -->
      <p
        class="text-gray-700 dark:text-gray-100 leading-relaxed whitespace-pre-line break-words mb-4"
      >
        {{ project.content }}
      </p>

      <!-- Tautan -->
      <div class="text-sm space-y-1 flex gap-3">
        <p v-if="project.github_link">
          <a :href="project.github_link" target="_blank" class="">
            <IconsGithub />
          </a>
        </p>
        <p v-if="project.demo_link">
          <a :href="project.demo_link" target="_blank" class="hover:underline">
            <IconsDeploy />
          </a>
        </p>
      </div>
    </div>

    <div v-else class="flex justify-center py-10">
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
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";


definePageMeta({
  middleware: "auth",
  layout: "admin",
});
useHead({ title: "Detail Project - Admin" });

const route = useRoute();
const router = useRouter();
const project = ref(null);

const isLoading = ref(true);

onMounted(async () => {
  try {
    const res = await $api.get(
      `/projects/${route.params.id}`,
    );
    project.value = res.data.data;
  } catch (err) {
    console.error("Gagal memuat detail project:", err);
    router.push("/dashboard/projects");
  } finally {
    isLoading.value = false;
  }
});
</script>
