<template>
  <div class="text-slate-800">
    <section
      class="relative w-full h-screen bg-gradient-to-bl from-indigo-200 via-indigo-400 to-indigo-600"
    >
      <div
        class="fixed top-0 z-50 w-full h-[100vh] backdrop-blur-lg bg-black/30 flex items-center justify-center animate-fadeIn"
      >
        <div
          class="z-50 max-w-lg p-8 text-center border border-indigo-200 shadow-2xl bg-white/90 rounded-2xl"
        >
          <h1 class="text-3xl font-bold text-slate-800">Under Maintenance</h1>
          <p class="mt-4 text-lg text-slate-600">
            We're working on a fresh new look for this website! Please bear with
            us as we make things even better. Check back soon for an enhanced
            experience!
          </p>
          <div class="mt-6">
            <a
              href="https://www.instagram.com/achmadqt/"
              class="font-semibold text-indigo-600 hover:underline"
            >
              Contact us for updates
            </a>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col-reverse items-center justify-between gap-10 px-6 md:flex-row md:px-12 pt-44"
      >
        <!-- Teks -->
        <div class="max-w-xl text-center md:text-left">
          <h1 class="text-3xl font-bold text-slate-700">Hey, I'm Achmad 👋</h1>
          <h2 class="mt-2 text-5xl font-extrabold text-white sm:text-6xl">
            Website
          </h2>
          <h2 class="text-5xl font-extrabold sm:text-6xl text-slate-800">
            Development
          </h2>
          <p class="mt-4 font-mono text-base sm:text-lg text-slate-100">
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

      <div class="flex justify-center pt-32 md:pt-20">
        <button
          @click="scrollToAbout"
          class="flex items-center justify-center w-10 h-10 transition-colors duration-300 bg-indigo-600 rounded-full hover:bg-indigo-700 animate-bounce"
        >
          <IconsDown />
        </button>
      </div>
    </section>

    <!-- About & Skills -->
    <section
      id="about"
      class="min-h-screen bg-gradient-to-br from-stone-50 to-slate-100"
    >
      <div class="px-6 pt-24 md:px-10">
        <!-- Heading -->
        <h1
          class="font-sans text-3xl font-black md:text-4xl lg:text-5xl text-slate-800"
        >
          About <span class="text-indigo-600">me.</span>
        </h1>
        <div
          class="w-10 h-1 my-4 bg-indigo-600 rounded-full md:w-14 lg:w-20"
        ></div>

        <!-- Introduction -->
        <p
          class="text-lg font-medium leading-relaxed md:text-2xl lg:text-3xl text-slate-700"
        >
          My name is <span class="font-bold">Ragil Achmad Habibu</span>, you can
          call me <span class="font-semibold text-indigo-600">Achmad</span>. I'm
          a passionate and fast-learning
          <span class="font-semibold text-indigo-600">web developer</span> who
          enjoys turning ideas into functional, user-friendly websites and
          applications. Currently, I'm sharpening my skills in
          <span class="font-semibold text-indigo-600"
            >fullstack development</span
          >
          using Laravel and Nuxt.js.
        </p>

        <!-- Skills -->
        <div class="mt-14">
          <h2
            class="pb-5 text-2xl font-semibold text-center md:text-3xl text-slate-800"
          >
            Skills
          </h2>
          <div class="flex justify-center">
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <!-- Skill Card 1 -->
              <div
                class="w-full max-w-xs p-5 transition-all duration-300 border shadow-lg bg-white/80 backdrop-blur-sm border-stone-200 rounded-xl hover:shadow-xl hover:scale-105"
              >
                <h3 class="text-xl font-semibold text-center text-indigo-600">
                  Frontend Development
                </h3>
                <p
                  class="mt-2 text-base leading-relaxed text-center text-slate-600"
                >
                  Proficient in building responsive UI using
                  <strong>Nuxt.js</strong>, <strong>Vue.js</strong>, and
                  <strong>Tailwind CSS</strong>. Experienced with
                  component-based design and SPA architecture.
                </p>
              </div>

              <!-- Skill Card 2 -->
              <div
                class="w-full max-w-xs p-5 transition-all duration-300 border shadow-lg bg-white/80 backdrop-blur-sm border-stone-200 rounded-xl hover:shadow-xl hover:scale-105"
              >
                <h3 class="text-xl font-semibold text-center text-indigo-600">
                  Backend Development
                </h3>
                <p
                  class="mt-2 text-base leading-relaxed text-center text-slate-600"
                >
                  Skilled in creating RESTful APIs using
                  <strong>Laravel</strong>, handling database interactions,
                  authentication, and CRUD operations with clean MVC
                  architecture.
                </p>
              </div>

              <!-- Skill Card 3 -->
              <div
                class="w-full max-w-xs p-5 transition-all duration-300 border shadow-lg bg-white/80 backdrop-blur-sm border-stone-200 rounded-xl hover:shadow-xl hover:scale-105"
              >
                <h3 class="text-xl font-semibold text-center text-indigo-600">
                  UI/UX & Tools
                </h3>
                <p
                  class="mt-2 text-base leading-relaxed text-center text-slate-600"
                >
                  Comfortable using <strong>Figma</strong> for prototyping, and
                  implementing clean, user-friendly interfaces. Also experienced
                  with Git, VSCode, and Postman for workflow.
                </p>
              </div>
            </div>
          </div>

          <!-- View Projects Button -->
          <div class="flex justify-center pt-32 md:pt-20">
            <button
              @click="scrollToProject"
              class="flex justify-center text-lg font-semibold text-indigo-500 transition-all duration-300 hover:scale-110"
            >
              View Projects
            </button>
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
        class="text-4xl font-extrabold tracking-tight text-center pt-28 text-slate-800"
      >
        Projects
      </h1>

      <!-- Spinner -->
      <div v-if="isLoading" class="flex justify-center py-16">
        <svg
          class="w-10 h-10 text-indigo-500 animate-spin"
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
      <div v-else class="px-4 py-16 mx-auto max-w-7xl">
        <div v-if="projects.length">
          <div
            class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 justify-items-center"
          >
            <div
              v-for="(project, index) in projects.slice(0, 3)"
              :key="index"
              class="w-80 h-[21rem] bg-white bg-opacity-60 backdrop-blur-lg border border-gray-300 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <!-- Gambar -->
              <div class="mx-auto mt-4 overflow-hidden w-72 h-44 rounded-t-2xl">
                <img
                  class="object-cover w-full h-48"
                  :src="getProjectImage(project.image)"
                  :alt="project.title || 'Project Image'"
                  onerror="this.src='/images/logo-3.png'"
                />
              </div>

              <!-- Isi -->
              <div class="p-5">
                <h3
                  class="text-lg font-bold capitalize truncate text-slate-800"
                >
                  {{ project.title }}
                </h3>
                <p
                  class="mt-2 text-sm break-words whitespace-pre-line text-slate-600 line-clamp-2"
                >
                  {{ project.content }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-10 text-center">
            <NuxtLink
              to="/projects"
              class="px-3 py-2 text-lg font-medium text-white transition-all border border-white rounded-md hover:bg-white/30 hover:shadow-lg hover:border-indigo-600 hover:text-indigo-600"
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
            class="flex items-center justify-center w-32 h-32 mb-6 transition rounded-full shadow-xl bg-gradient-to-tr from-gray-200 to-gray-100 hover:scale-105"
          >
            <span class="text-5xl animate-bounce">🚀</span>
          </div>
          <h2 class="text-2xl font-bold">Projects Coming Soon</h2>
          <p class="max-w-md mt-2 text-md text-slate-600">
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

const getProjectImage = (image) => {
  return image
    ? `https://cwkkcgnwdzbyoxrcphwt.supabase.co/storage/v1/object/public/image/${image}`
    : "/images/logo-3.png";
};

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

const scrollToAbout = () => {
  const section = document.querySelector("#about");
  section?.scrollIntoView({ behavior: "smooth" });
};

const scrollToProject = () => {
  const section = document.querySelector("#projects");
  section?.scrollIntoView({ behavior: "smooth" });
};
</script>
