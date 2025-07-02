<template>
  <div class="text-slate-800">
    <section
      class="relative h-screen w-full bg-gradient-to-bl from-indigo-200 via-indigo-400 to-indigo-600"
    >
      <div
        class="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 pt-44 gap-10"
      >
        <!-- Teks -->
        <div class="text-center md:text-left max-w-xl">
          <h1 class="text-3xl font-bold text-slate-700">Hey, I'm Achmad 👋</h1>
          <h2 class="text-5xl sm:text-6xl font-extrabold text-white mt-2">
            Website
          </h2>
          <h2 class="text-5xl sm:text-6xl font-extrabold text-slate-800">
            Development
          </h2>
          <p class="mt-4 text-base sm:text-lg text-slate-100 font-mono">
            A beginner programmer who is honing their skills
          </p>
        </div>

        <!-- Foto -->
        <div class="flex justify-center">
          <img
            class="w-52 sm:w-64 md:w-72 lg:w-80 rounded-full shadow-2xl outline outline-4 outline-offset-[10px] outline-indigo-200 shadow-indigo-300"
            src="/images/azizi.jpg"
            alt="zee"
            title="my wife"
          />
        </div>
      </div>

      <!-- Tombol Scroll -->
      <div class="flex justify-center pt-32 md:pt-20">
        <NuxtLink
          to="#about"
          class="w-10 h-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 rounded-full animate-bounce transition-colors duration-300"
        >
          <IconsDown />
        </NuxtLink>
      </div>
    </section>

    <!-- About & Skills -->
    <section
      id="about"
      class="min-h-screen bg-gradient-to-br from-stone-50 to-slate-100"
    >
      <div class="pt-24 px-6 md:px-10">
        <!-- Heading -->
        <h1
          class="text-3xl md:text-4xl lg:text-5xl font-black font-sans text-slate-800"
        >
          About <span class="text-indigo-600">me.</span>
        </h1>
        <div
          class="w-10 h-1 bg-indigo-600 my-4 rounded-full md:w-14 lg:w-20"
        ></div>

        <!-- Introduction -->
        <p
          class="text-lg md:text-2xl lg:text-3xl font-medium text-slate-700 leading-relaxed"
        >
          My name is <span class="font-bold">Ragil Achmad Habibu</span>, you can
          call me <span class="text-indigo-600 font-semibold">Achmad</span>. I'm
          a passionate and fast-learning
          <span class="text-indigo-600 font-semibold">web developer</span> who
          enjoys turning ideas into functional, user-friendly websites and
          applications. Currently, I'm sharpening my skills in
          <span class="text-indigo-600 font-semibold"
            >fullstack development</span
          >
          using Laravel and Nuxt.js.
        </p>

        <!-- Skills -->
        <div class="mt-14">
          <h2
            class="text-2xl md:text-3xl font-semibold text-center text-slate-800 pb-5"
          >
            Skills
          </h2>
          <div class="flex justify-center">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <!-- Skill Card 1 -->
              <div
                class="w-full max-w-xs bg-white/80 backdrop-blur-sm shadow-lg border border-stone-200 rounded-xl p-5 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <h3 class="text-center text-xl font-semibold text-indigo-600">
                  Frontend Development
                </h3>
                <p
                  class="text-center text-base text-slate-600 leading-relaxed mt-2"
                >
                  Proficient in building responsive UI using
                  <strong>Nuxt.js</strong>, <strong>Vue.js</strong>, and
                  <strong>Tailwind CSS</strong>. Experienced with
                  component-based design and SPA architecture.
                </p>
              </div>

              <!-- Skill Card 2 -->
              <div
                class="w-full max-w-xs bg-white/80 backdrop-blur-sm shadow-lg border border-stone-200 rounded-xl p-5 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <h3 class="text-center text-xl font-semibold text-indigo-600">
                  Backend Development
                </h3>
                <p
                  class="text-center text-base text-slate-600 leading-relaxed mt-2"
                >
                  Skilled in creating RESTful APIs using
                  <strong>Laravel</strong>, handling database interactions,
                  authentication, and CRUD operations with clean MVC
                  architecture.
                </p>
              </div>

              <!-- Skill Card 3 -->
              <div
                class="w-full max-w-xs bg-white/80 backdrop-blur-sm shadow-lg border border-stone-200 rounded-xl p-5 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <h3 class="text-center text-xl font-semibold text-indigo-600">
                  UI/UX & Tools
                </h3>
                <p
                  class="text-center text-base text-slate-600 leading-relaxed mt-2"
                >
                  Comfortable using <strong>Figma</strong> for prototyping, and
                  implementing clean, user-friendly interfaces. Also experienced
                  with Git, VSCode, and Postman for workflow.
                </p>
              </div>
            </div>
          </div>

          <!-- View Projects Button -->
          <div class="flex justify-center py-8">
            <NuxtLink
              class="text-base lg:text-lg text-indigo-600 hover:text-indigo-700 hover:-translate-y-1 transition-all duration-300 font-medium"
              to="#projects"
            >
              View Projects →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section
      id="projects"
      class="min-h-screen bg-gradient-to-t from-indigo-400 to-slate-100"
    >
      <h1
        class="pt-28 text-4xl font-extrabold text-center text-slate-800 tracking-tight"
      >
        Projects
      </h1>

      <!-- Spinner -->
      <div v-if="isLoading" class="flex justify-center py-16">
        <svg
          class="animate-spin h-10 w-10 text-indigo-500"
          viewBox="0 0 24 24"
          fill="none"
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

      <!-- Project List -->
      <div v-else class="py-16 px-4 max-w-7xl mx-auto">
        <div v-if="projects.length">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center"
          >
            <div
              v-for="(project, index) in projects.slice(0, 3)"
              :key="index"
              class="w-80 h-[21rem] bg-white bg-opacity-60 backdrop-blur-lg border border-gray-300 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <!-- Gambar -->
              <div class="w-72 h-44 mx-auto mt-4 rounded-t-2xl overflow-hidden">
                <img
                  class="w-full h-full object-cover"
                  :src="
                    project.image
                      ? `http://api-portofolio.up.railway.app/storage/project/${project.image}`
                      : '/images/logo-3.png'
                  "
                  :alt="project.title"
                />
              </div>

              <!-- Isi -->
              <div class="p-5">
                <h3
                  class="text-lg font-bold text-slate-800 capitalize truncate"
                >
                  {{ project.title }}
                </h3>
                <p
                  class="mt-2 text-sm text-slate-600 line-clamp-2 whitespace-pre-line break-words"
                >
                  {{ project.content }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-10 text-center">
            <NuxtLink
              to="/projects"
              class="border border-white text-white hover:bg-white/30 hover:shadow-lg hover:border-indigo-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium text-lg transition-all"
            >
              All Projects
            </NuxtLink>
          </div>
        </div>

        <!-- Empty state -->
        <div
          v-else
          class="flex flex-col items-center justify-center py-24 text-center text-gray-600"
        >
          <div
            class="bg-gradient-to-tr from-gray-200 to-gray-100 w-32 h-32 flex items-center justify-center rounded-full shadow-xl mb-6 transition hover:scale-105"
          >
            <span class="text-5xl animate-bounce">🚀</span>
          </div>
          <h2 class="text-2xl font-bold">Projects Coming Soon</h2>
          <p class="text-md text-slate-600 mt-2 max-w-md">
            We’re working on something amazing. Stay tuned for awesome updates
            and new features!
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

useHead({ title: "Home - Achmad" });

const projects = ref([]);
const isLoading = ref(true);
const { $api } = useNuxtApp(); 

onMounted(async () => {
  try {
    const res = await $api.get("/projects");
    projects.value = res.data.data;
  } catch (err) {
    console.error("Gagal memuat project:", err);
  } finally {
    isLoading.value = false;
  }
});
</script>
