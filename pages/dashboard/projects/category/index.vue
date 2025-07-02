<template>
  <div class="max-w-full p-6 min-h-full dark:bg-gray-800 dark:text-white">
    <transition name="fade">
      <div
        v-if="message"
        :class="[
          'mb-4 p-3 rounded border text-sm transition-all duration-300',
          messageType === 'success'
            ? 'bg-green-100 text-green-700 border-green-400'
            : 'bg-red-100 text-red-700 border-red-400',
        ]"
      >
        {{ message }}
      </div>
    </transition>

    <div class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-bold">Category List</h1>
      <NuxtLink
        to="/dashboard/projects/category/form"
        class="border border-green-500 text-green-500 px-3 py-1 rounded hover:bg-green-50 dark:hover:bg-green-900 transition"
      >
        Add
      </NuxtLink>
    </div>

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
                @click="askDelete(cat.id)"
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
  <!-- Konfirmasi Modal -->
  <transition name="fade">
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-900 p-6 rounded shadow max-w-sm w-full">
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Confirm Deletion
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete this category?
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="showConfirmModal = false"
            class="px-4 py-2 text-sm border rounded border-gray-400 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 text-sm border rounded border-red-500 text-red-500 hover:bg-red-100 dark:hover:bg-red-800"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const { $api } = useNuxtApp();
const categories = ref([]);
const isLoading = ref(true);
const router = useRouter();

const message = ref("");
const messageType = ref("success");

const showMessage = (msg, type = "success") => {
  message.value = msg;
  messageType.value = type;
  setTimeout(() => {
    message.value = "";
  }, 3000);
};

const fetchCategories = async () => {
  isLoading.value = true;
  try {
    const res = await $api.get("/category");
    categories.value = res.data.data;
  } catch (error) {
    console.error("Gagal memuat kategori:", error);
    showMessage("Failed to load categories", "error");
  } finally {
    isLoading.value = false;
  }
};

const showConfirmModal = ref(false);
const deleteId = ref(null);

const askDelete = (id) => {
  deleteId.value = id;
  showConfirmModal.value = true;
};

const confirmDelete = async () => {
  try {
    await $api.delete(`/category/${deleteId.value}`);
    showMessage("Category deleted successfully", "success");
    await fetchCategories();
  } catch (error) {
    console.error("Gagal menghapus kategori:", error);
    showMessage("Failed to delete category", "error");
  } finally {
    showConfirmModal.value = false;
    deleteId.value = null;
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
