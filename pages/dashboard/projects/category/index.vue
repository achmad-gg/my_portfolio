<template>
  <div class="max-w-full p-6 min-h-full dark:bg-gray-800 dark:text-white">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-bold">Category List</h1>
      <NuxtLink
        to="/dashboard/projects/category/form"
        class="border border-green-500 text-green-500 px-3 py-1 rounded hover:bg-green-50 dark:hover:bg-green-900 transition"
      >
        Add
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center text-gray-500 py-10 animate-pulse">
      Loading...
    </div>

    <!-- Empty -->
    <div
      v-else-if="categories.length === 0"
      class="text-center text-gray-500 py-10"
    >
      No categories found.
    </div>

    <!-- Table -->
    <div
      v-else
      class="bg-white dark:bg-gray-800 shadow rounded overflow-x-auto"
    >
      <table class="w-full text-sm text-gray-800 dark:text-gray-100">
        <thead
          class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-xs"
        >
          <tr>
            <th class="text-left px-4 py-3">#</th>
            <th class="text-left px-4 py-3">Name</th>
            <th class="text-left px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(cat, index) in categories"
            :key="cat.id"
            class="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="px-4 py-2">{{ index + 1 }}</td>
            <td class="px-4 py-2 font-medium">{{ cat.name }}</td>
            <td class="px-4 py-2 space-x-2">
              <NuxtLink
                :to="`/dashboard/projects/category/form?id=${cat.id}`"
                class="border border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-800 px-2 py-1 rounded text-xs transition"
              >
                Update
              </NuxtLink>
              <button
                @click="deleteCategory(cat.id)"
                class="border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-800 px-2 py-1 rounded text-xs transition"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const categories = ref([]);
const isLoading = ref(true);
const router = useRouter();

const fetchCategories = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get("http://localhost:8000/api/category");
    categories.value = res.data.data;
  } catch (error) {
    console.error("Gagal memuat kategori:", error);
  } finally {
    isLoading.value = false;
  }
};

const deleteCategory = async (id) => {
  if (!confirm("Are you sure you want to delete this category?")) return;
  try {
    await axios.delete(`http://localhost:8000/api/category/${id}`);
    await fetchCategories();
  } catch (error) {
    console.error("Gagal menghapus kategori:", error);
    alert("Gagal menghapus kategori.");
  }
};

onMounted(() => {
  fetchCategories();
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
});
useHead({ title: "Category - Admin" });
</script>
