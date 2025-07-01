<template>
  <div class="max-w-xl mx-auto p-6 my-6 bg-white dark:bg-gray-800 shadow rounded text-gray-900 dark:text-gray-100">
    <h1 class="text-xl font-bold mb-4">
      {{ isEdit ? "Edit Category" : "Add Category" }}
    </h1>

    <form @submit.prevent="handleSubmit">
      <!-- Input Nama Kategori -->
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300 mb-1">Category Name</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500"
          placeholder="Enter category name"
        />
        <p v-if="errors.name" class="text-red-500 text-sm mt-1">
          {{ errors.name[0] }}
        </p>
      </div>

      <!-- Tombol Simpan -->
      <div class="flex gap-3">
        <button
          type="submit"
          class="border border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-800 px-2 py-1 rounded transition"
        >
          {{ isEdit ? "Update" : "Save" }}
        </button>

        <NuxtLink
          to="/dashboard/projects/category"
          class="border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-800 px-2 py-1 self-center rounded transition"
        >
          Cancel
        </NuxtLink>
      </div>
    </form>
  </div>
</template>
F

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

definePageMeta({
  middleware: "auth",
  layout: "admin",
});
useHead({ title: "Form - Admin" });

const router = useRouter();
const route = useRoute();

const isEdit = ref(false);
const form = ref({
  name: "",
});
const errors = ref({});

onMounted(async () => {
  if (route.query.id) {
    isEdit.value = true;
    try {
      const res = await axios.get(`http://localhost:8000/api/category`);
      const category = res.data.data.find((cat) => cat.id == route.query.id);
      if (category) {
        form.value.name = category.name;
      } else {
        alert("Category not found");
        router.push("/dashboard/projects/category");
      }
    } catch (err) {
      console.error("Error fetching category:", err);
    }
  }
});

const handleSubmit = async () => {
  errors.value = {};
  try {
    if (isEdit.value) {
      await axios.put(
        `http://localhost:8000/api/category/${route.query.id}`,
        form.value,
      );
      alert("Category updated successfully");
    } else {
      await axios.post("http://localhost:8000/api/category", form.value);
      alert("Category added successfully");
    }
    router.push("/dashboard/projects/category");
  } catch (err) {
    if (err.response?.status === 422) {
      errors.value = err.response.data;
    } else {
      alert("Something went wrong");
    }
  }
};
</script>
