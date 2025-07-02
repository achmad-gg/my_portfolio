<template>
  <div
    class="max-w-full mx-auto p-6 bg-white dark:bg-gray-900 dark:text-white rounded shadow"
  >
    <h1 class="text-2xl font-bold mb-4">
      {{ isEdit ? "Update" : "Add" }} Project
    </h1>

    <form @submit.prevent="save" class="space-y-4">
      <!-- Gambar -->
      <div>
        <label class="block font-medium"
          >Image<span class="text-red-500">*</span></label
        >
        <input
          type="file"
          accept="image/*"
          class="file:bg-indigo-500 file:rounded file:border-none file:text-white file:py-1 file:px-1 hover:file:bg-indigo-600 hover:file:scale-105 px-2 py-1 file:cursor-pointer transition-all"
          @change="handleFileUpload"
        />
        <div v-if="preview" class="mt-3">
          <img
            :src="preview"
            alt="Preview"
            class="h-40 object-contain rounded border dark:border-gray-600"
          />
        </div>
      </div>

      <!-- Judul -->
      <div>
        <label class="block font-medium"
          >Title<span class="text-red-500">*</span></label
        >
        <input
          v-model="form.title"
          class="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          required
          placeholder="Title here"
        />
      </div>

      <!-- Deskripsi -->
      <div>
        <label class="block font-medium"
          >Description<span class="text-red-500">*</span></label
        >
        <textarea
          v-model="form.content"
          class="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          rows="4"
          required
          placeholder="Description here"
        />
      </div>

      <!-- Kategori -->
      <div>
        <label class="block font-medium mb-1"
          >Categories<span class="text-red-500">*</span></label
        >
        <Multiselect
          v-model="selectedCategories"
          :options="categories"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Select multiple categories"
          label="name"
          track-by="id"
          class="multiselect-custom dark:bg-gray-800 dark:text-white"
        />
      </div>

      <!-- Jenis -->
      <div>
        <label class="block font-medium"
          >Type<span class="text-red-500">*</span></label
        >
        <select
          v-model="form.bidang"
          class="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          required
        >
          <option disabled value="">Select</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Fullstack</option>
        </select>
      </div>

      <!-- Github -->
      <div>
        <label class="block font-medium">GitHub Link</label>
        <input
          v-model="form.github_link"
          type="url"
          class="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          placeholder="Github URL here"
        />
      </div>

      <!-- Demo -->
      <div>
        <label class="block font-medium">Demo Link</label>
        <input
          v-model="form.demo_link"
          type="url"
          class="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          placeholder="Demo URL here"
        />
      </div>

      <!-- Tombol -->
      <div class="flex justify-end space-x-3 mt-6">
        <button
          type="reset"
          @click="resetForm"
          class="border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-800 px-3 py-1 rounded transition"
        >
          Reset
        </button>
        <NuxtLink
          to="/dashboard/projects"
          class="border border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-800 px-3 py-1 rounded transition cursor-pointer"
        >
          Cancel
        </NuxtLink>
        <button
          type="submit"
          class="border border-green-600 text-green-500 hover:bg-green-50 dark:hover:bg-green-800 px-3 py-1 rounded transition"
        >
          Save
        </button>
      </div>
    </form>

    <transition name="fade">
      <div
        v-if="showAlert"
        class="fixed top-0 flex justify-center items-center gap-4 px-4 py-3 rounded text-sm z-50"
        :class="{
          'bg-green-50 text-green-700': alertType === 'success',
          'bg-red-50 text-red-700': alertType === 'error',
        }"
      >
        <div class="flex items-center gap-2">
          <svg
            v-if="alertType === 'success'"
            class="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            v-else
            class="w-5 h-5 text-red-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span>{{ alertMessage }}</span>
        </div>
        <button @click="showAlert = false" class="text-xl leading-none">
          &times;
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Multiselect from "vue-multiselect";

definePageMeta({
  middleware: "auth",
  layout: "admin",
});
useHead({ title: "Form - Admin" });

const { $api } = useNuxtApp();
const router = useRouter();
const route = useRoute();

const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref("success");

const triggerAlert = (message, type = "success") => {
  alertMessage.value = message;
  alertType.value = type;
  showAlert.value = true;
  setTimeout(() => (showAlert.value = false), 3000);
};

const id = route.query.id;
const isEdit = ref(!!id);
const preview = ref(null);
const categories = ref([]);
const selectedCategories = ref([]);

const form = reactive({
  title: "",
  content: "",
  bidang: "",
  github_link: "",
  demo_link: "",
  image: null,
});

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.image = file;
    preview.value = URL.createObjectURL(file);
  }
};

const resetForm = () => {
  if (confirm("Yakin ingin mereset form?")) {
    form.title = "";
    form.content = "";
    form.bidang = "";
    form.github_link = "";
    form.demo_link = "";
    form.image = null;
    if (preview.value) URL.revokeObjectURL(preview.value);
    preview.value = null;
    selectedCategories.value = [];
  }
};

const loadCategories = async () => {
  try {
    const res = await $api.get("/category");
    categories.value = res.data.data;
  } catch (err) {
    console.error("Gagal mengambil kategori:", err);
  }
};

const save = async () => {
  const categoryIds = selectedCategories.value.map((cat) => cat.id);
  if (!categoryIds.length)
    return triggerAlert("Silakan pilih minimal satu kategori!", "error");

  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    if (key === "image" && !value) return;
    formData.append(key, value || "");
  });
  categoryIds.forEach((id, i) => formData.append(`category_id[${i}]`, id));

  try {
    const url = isEdit.value ? `/projects/${id}?_method=PUT` : "/projects";
    await $api.post(url, formData);
    triggerAlert(
      `Project berhasil di${isEdit.value ? "update" : "tambahkan"}!`,
    );
    setTimeout(() => router.push("/dashboard/projects"), 1500);
  } catch (err) {
    const msg =
      err.response?.status === 422 ? "Validasi gagal!" : "Terjadi kesalahan.";
    triggerAlert(msg, "error");
    console.error(err);
  }
};

onMounted(async () => {
  await loadCategories();
  if (!id) return;
  try {
    const res = await $api.get(`/projects/${id}`);
    Object.assign(form, res.data.data);
    selectedCategories.value = res.data.data.categories;
    preview.value = `https://api-portofolio.up.railway.app/storage/project/${res.data.data.image}`;
  } catch (err) {
    triggerAlert("Gagal mengambil data project.", "error");
    router.push("/dashboard/projects");
  }
});
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
</style>
