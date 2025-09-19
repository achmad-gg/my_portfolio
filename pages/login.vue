<template>
  <div class="flex items-center justify-center min-h-screen px-4 bg-gray-100">
    <div
      class="flex flex-col w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row"
    >
      <!-- Left Panel (ilustrasi / welcome) -->
      <div
        class="items-center justify-center hidden w-1/2 p-8 text-white bg-blue-600 md:flex"
      >
        <div class="space-y-4 text-center">
          <h2 class="text-3xl font-bold">Welcome Back!</h2>
          <p class="text-sm opacity-80">
            Please login to access the admin dashboard.
          </p>
        </div>
      </div>

      <!-- Right Panel (Form) -->
      <div class="w-full p-8 md:w-1/2">
        <h2 class="mb-6 text-2xl font-bold text-center text-gray-800">
          Admin Login
        </h2>

        <div v-if="error" class="mb-4 text-sm text-center text-red-500">
          {{ error }}
        </div>

        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              v-model="email"
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              type="password"
              v-model="password"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            class="w-full py-2 font-semibold text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookie } from "#app";

const { $api } = useNuxtApp();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
  try {
    const res = await $api.post("/login", {
      email: email.value,
      password: password.value,
    });

    // ✅ Simpan token di cookie selama 7 hari
    const token = useCookie("token", {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
    token.value = res.data.token;

    // ✅ Redirect ke dashboard
    router.push("/dashboard");
  } catch (err) {
    console.error(err);
    error.value = "Email atau password salah";
  }
};

definePageMeta({ layout: "login" });
useHead({ title: "Login" });
</script>
