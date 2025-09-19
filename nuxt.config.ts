export default defineNuxtConfig({
  compatibilityDate: "2025-05-09",
  modules: ["@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
      apiBase: "https://api-portofolio.up.railway.app/api",
      storageBase:
        "https://cwkkcgnwdzbyoxrcphwt.supabase.co/storage/v1/object/public/image/",
    },
  },

  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Achmad's Portfolio - Backend Developer & Database Enthusiast",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/images/logo.png" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  css: [
    "~/assets/css/tailwind.css",
    "vue-multiselect/dist/vue-multiselect.css",
  ],

  alias: {
    assets: "/<rootDir>/assets",
  },

  build: {
    transpile: ["vue-tippy"],
  },
  plugins: ["~/plugins/axios.js"],
});
