<template>
  <section
    class="min-h-screen flex justify-center items-center pt-12 pb-8 sm:pt-24 bg-gradient-to-br from-slate-50 to-stone-100 px-3 sm:px-4 lg:px-6"
  >
    <div
      class="bg-gradient-to-r from-indigo-600 to-indigo-700 w-full max-w-[77rem] rounded-xl sm:rounded-2xl shadow-2xl shadow-slate-900/25 overflow-hidden"
    >
      <div class="flex flex-col xl:flex-row">
        <!-- Modal Success -->
        <transition name="fade">
          <div
            v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <div
              class="bg-white rounded-xl p-6 max-w-md w-full shadow-xl text-center animate-fadeInUp"
            >
              <h2 class="text-lg font-semibold text-indigo-700">Success!</h2>
              <p class="text-gray-600 mt-2">
                Your message has been sent successfully. We will reply to your
                message within 24 hours.
              </p>
              <button
                @click="showModal = false"
                class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </transition>

        <!-- Header Section -->
        <div
          class="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 w-full xl:w-3/5 py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 xl:rounded-s-[300px] xl:rounded-ee-full xl:rounded-tr-full shadow-inner flex items-center justify-center relative overflow-hidden"
        >
          <!-- Decorative -->
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"
          ></div>

          <div class="text-center xl:text-left z-10">
            <h1
              class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight"
            >
              Want to collaborate
              <span class="block text-indigo-100 mt-1 sm:mt-2"> with me? </span>
            </h1>
            <p
              class="text-indigo-200 text-sm sm:text-base lg:text-lg mt-3 sm:mt-4 font-medium"
            >
              Contact Me now!
            </p>

            <!-- Mobile-friendly contact info -->
            <div
              class="hidden sm:flex flex-wrap gap-4 mt-6 xl:mt-8 text-indigo-200 text-sm"
            >
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-indigo-300 rounded-full"></div>
                <span>Quick Response</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-indigo-300 rounded-full"></div>
                <span>Professional Services</span>
              </div>
            </div>
          </div>
        </div>

        <transition name="fade">
          <div
            v-if="errorMessage"
            class="mb-4 px-4 py-3 rounded border-l-4 bg-red-50 border-red-500 text-red-700 text-sm"
          >
            <p>{{ errorMessage }}</p>
          </div>
        </transition>

        <!-- Form Section -->
        <div
          class="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 flex justify-center items-center w-full xl:w-2/5 min-h-[400px] sm:min-h-[500px]"
        >
          <form
            class="w-full max-w-md space-y-4 sm:space-y-5"
            @submit.prevent="handleSubmit"
          >
            <div class="space-y-4 sm:space-y-5">
              <div class="relative group">
                <input
                  v-model="form.name"
                  class="rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/80 w-full h-11 sm:h-12 px-4 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300 group-hover:bg-white/25"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div class="relative group">
                <input
                  v-model="form.email"
                  class="rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/80 w-full h-11 sm:h-12 px-4 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300 group-hover:bg-white/25"
                  type="email"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div class="relative group">
                <textarea
                  v-model="form.message"
                  class="h-24 sm:h-28 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/80 px-4 py-3 resize-none w-full focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300 group-hover:bg-white/25"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
            </div>

            <div class="flex justify-center pt-2 sm:pt-3">
              <button
                :class="[
                  'bg-white text-indigo-700 w-28 sm:w-32 h-11 sm:h-12 text-base sm:text-lg font-semibold rounded-full hover:scale-105 hover:bg-indigo-50 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95',
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : '',
                ]"
                type="submit"
                :disabled="isSubmitting"
              >
                <div
                  v-if="isSubmitting"
                  class="flex items-center justify-center gap-2"
                >
                  <div
                    class="w-4 h-4 border-2 border-indigo-700 border-t-transparent rounded-full animate-spin"
                  ></div>
                  <span class="hidden sm:inline">Sending</span>
                </div>
                <span v-else>Send</span>
              </button>
            </div>

            <!-- Mobile-friendly additional info -->
            <div
              class="text-center text-white/70 text-xs sm:text-sm mt-4 sm:hidden"
            >
              We'll get back to you within 24 hours
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

useHead({
  title: "Contact - Achmad",
});

const showModal = ref(false);
const { $api } = useNuxtApp();

const form = ref({
  name: "",
  email: "",
  message: "",
});

const isSubmitting = ref(false);
const errorMessage = ref("");

const handleSubmit = async () => {
  // Validasi
  if (
    !form.value.name.trim() ||
    !form.value.email.trim() ||
    !form.value.message.trim()
  ) {
    errorMessage.value = "Please fill in all fields.";
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    await $api.post("/contact", form.value);

    // Tampilkan modal sukses
    showModal.value = true;

    // Reset form
    form.value = {
      name: "",
      email: "",
      message: "",
    };
  } catch (error) {
    console.error("Gagal:", error);
    errorMessage.value = "Failed to send your message. Please try again later.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Custom animations for enhanced UX */
.group:hover input,
.group:hover textarea {
  transform: translateY(-1px);
}

/* Enhanced focus states */
input:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

/* Smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Loading animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.4s ease-out;
}
</style>
