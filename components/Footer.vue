<template>
  <footer class="bg-black text-white" aria-label="Footer">
    <div
      class="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left"
    >
      <!-- Logo -->
      <div class="font-black text-2xl flex justify-center md:justify-start">
        <IconsLogo aria-label="Logo" />
      </div>

      <!-- Copyright -->
      <p class="text-sm whitespace-nowrap">
        © 2025 Achmad. All rights reserved.
      </p>

      <!-- Social Links -->
      <div class="flex justify-center md:justify-end gap-4">
        <a
          href="https://github.com/achmad-gg"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <IconsGithub
            class="hover:scale-110 transition-transform duration-300"
          />
        </a>

        <a
          href="https://instagram.com/achmadqt"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <IconsInstagram
            class="hover:scale-110 transition-transform duration-300"
          />
        </a>
      </div>
    </div>
  </footer>
</template>
