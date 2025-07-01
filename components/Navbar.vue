<template>
  <nav
    class="fixed top-[21px] left-1/2 transform -translate-x-1/2 rounded-xl w-[91vw] max-w-8xl backdrop-blur-md shadow-xl text-black outline outline-1 outline-indigo-600 z-50"
  >
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <NuxtLink
          to="/"
          class="text-xl font-extrabold flex items-center transition"
          @click="closeMenu"
        >
          <span>AchmadHI.</span>
        </NuxtLink>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden text-gray-800 focus:outline-none"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              v-if="!isMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Desktop Menu -->
        <div
          class="hidden md:flex items-center space-x-5 font-sans font-medium"
        >
          <NuxtLink
            to="/"
            class="hover:text-indigo-600 transition-all duration-200"
            >Home</NuxtLink
          >
          <NuxtLink
            to="/projects"
            class="hover:text-indigo-600 transition-all duration-200"
            >Projects</NuxtLink
          >
          <NuxtLink
            to="/contact"
            class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all duration-200"
          >
            Contact
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        class="md:hidden px-4 pb-4 border-t border-indigo-600"
      >
        <NuxtLink
          to="/"
          class="block py-2 hover:text-indigo-600"
          @click="closeMenu"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/projects"
          class="block py-2 hover:text-indigo-600"
          @click="closeMenu"
          >Projects</NuxtLink
        >
        <NuxtLink
          to="/contact"
          class="block py-2 mt-2 bg-indigo-600 text-white rounded-md text-center hover:bg-indigo-700"
          @click="closeMenu"
        >
          Contact
        </NuxtLink>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const isMenuOpen = ref(false);
const route = useRoute();

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}
</script>
