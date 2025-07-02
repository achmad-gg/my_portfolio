<template>
  <div class="max-w-full min-h-full p-6 dark:bg-gray-900 dark:text-white">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex gap-4 items-center">
        <h1 class="text-2xl font-bold">Project Lists</h1>

        <transition name="fade-scale" appear>
          <div
            v-if="selectedProject !== null"
            ref="actionsRef"
            class="flex gap-2"
          >
            <button
              @click="editProject"
              class="border border-yellow-400 text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900 hover:scale-105 transition-all px-3 py-1 rounded"
            >
              Update
            </button>
            <button
              @click="deleteProject"
              class="border border-red-500 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 hover:scale-105 transition-all px-3 py-1 rounded"
            >
              Delete
            </button>
            <button
              @click="goToDetail"
              class="border border-indigo-500 text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:scale-105 transition-all px-3 py-1 rounded"
            >
              Detail
            </button>
          </div>
        </transition>
      </div>

      <NuxtLink
        to="/dashboard/projects/form"
        class="border border-green-500 text-green-500 hover:bg-green-100 dark:hover:bg-green-900 hover:scale-105 transition-all px-3 py-1 rounded"
      >
        Add
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="text-center py-10 text-gray-500 dark:text-gray-400 animate-pulse"
    >
      Loading projects...
    </div>

    <!-- Empty State -->
    <div
      v-else-if="projects.length === 0"
      class="text-center py-10 text-gray-500 dark:text-gray-400"
    >
      The project doesn't exist yet
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto rounded shadow">
      <table
        ref="tableRef"
        class="min-w-full text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
      >
        <thead
          class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 uppercase text-xs"
        >
          <tr>
            <th class="px-4 py-3 text-left">No</th>
            <th class="px-4 py-3 text-left">Title</th>
            <th class="px-4 py-3 text-left w-[250px]">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(project, index) in projects"
            :key="project.id"
            :class="{
              'bg-indigo-100 dark:bg-indigo-900':
                selectedProject?.id === project.id,
              'hover:bg-gray-50 dark:hover:bg-gray-700':
                selectedProject?.id !== project.id,
            }"
            @click="selectedProject = project"
            class="cursor-pointer"
          >
            <td class="px-4 py-3">{{ index + 1 }}</td>
            <td class="px-4 py-3 font-semibold max-w-[200px] truncate">
              {{ project.title }}
            </td>
            <td class="px-4 py-3 max-w-[300px] truncate">
              {{ project.content }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Delete Modal -->
      <transition name="fade">
        <div
          v-if="showDeleteModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div
            class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg"
          >
            <h2
              class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              Hapus Project?
            </h2>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-6">
              Apakah kamu yakin ingin menghapus project ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div class="flex justify-end gap-2">
              <button
                @click="showDeleteModal = false"
                :disabled="isDeleting"
                class="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
              >
                Batal
              </button>
              <button
                @click="confirmDelete"
                :disabled="isDeleting"
                class="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 flex items-center gap-2 disabled:opacity-70"
              >
                <svg
                  v-if="isDeleting"
                  class="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
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
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>{{ isDeleting ? "Menghapus..." : "Ya, Hapus" }}</span>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";

definePageMeta({ middleware: "auth", layout: "admin" });
useHead({ title: "Projects - Admin" });

const router = useRouter();
const route = useRoute();

const projects = ref([]);
const selectedProject = ref(null);
const tableRef = ref(null);
const actionsRef = ref(null);
const isLoading = ref(false);
const showDeleteModal = ref(false);
const isDeleting = ref(false);
const { $api } = useNuxtApp();

const fetchProjects = async () => {
  isLoading.value = true;
  try {
    const res = await $api.get("/projects");
    projects.value = res.data.data;
  } catch (err) {
    console.error("Gagal memuat project:", err);
  } finally {
    isLoading.value = false;
  }
};

const handleClickOutside = (event) => {
  const outsideTable = !tableRef.value?.contains(event.target);
  const outsideActions = !actionsRef.value?.contains(event.target);
  if (outsideTable && outsideActions) selectedProject.value = null;
};

const deleteProject = () => {
  if (selectedProject.value) showDeleteModal.value = true;
};

const confirmDelete = async () => {
  isDeleting.value = true;
  try {
    await $api.delete(`/projects/${selectedProject.value.id}`);
    showDeleteModal.value = false;
    selectedProject.value = null;
    await fetchProjects();
  } catch (err) {
    console.error("Gagal menghapus:", err);
    alert("Gagal menghapus project!");
  } finally {
    isDeleting.value = false;
  }
};

const editProject = () => {
  if (selectedProject.value) {
    router.push(`/dashboard/projects/form?id=${selectedProject.value.id}`);
  }
};

const goToDetail = () => {
  if (selectedProject.value) {
    router.push(`/dashboard/projects/show/${selectedProject.value.id}`);
  }
};

onMounted(() => {
  fetchProjects();
  window.addEventListener("click", handleClickOutside);
});

// ✅ Watch route change and reload if route is this page
watchEffect(() => {
  if (route.fullPath === "/dashboard/projects") {
    fetchProjects();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
