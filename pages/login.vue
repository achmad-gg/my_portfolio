<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div
      class="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row"
    >
      <!-- Left Panel (ilustrasi / welcome) -->
      <div
        class="hidden md:flex w-1/2 bg-blue-600 text-white items-center justify-center p-8"
      >
        <div class="text-center space-y-4">
          <h2 class="text-3xl font-bold">Welcome Back!</h2>
          <p class="text-sm opacity-80">
            Please login to access the admin dashboard.
          </p>
        </div>
      </div>

      <!-- Right Panel (Form) -->
      <div class="w-full md:w-1/2 p-8">
        <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        <div v-if="error" class="text-red-500 mb-4 text-sm text-center">
          {{ error }}
        </div>

        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Email</label
            >
            <input
              v-model="email"
              type="email"
              class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Password</label
            >
            <input
              type="password"
              v-model="password"
              class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
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
