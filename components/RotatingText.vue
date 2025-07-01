<template>
  <div class="overflow-hidden h-10 relative text-white text-3xl text-center">
    <transition name="fade" mode="out-in">
      <span
        :key="currentText"
        class="absolute inset-0 flex justify-center items-center"
      >
        {{ currentText }}
      </span>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  texts: {
    type: Array,
    required: true,
  },
  interval: {
    type: Number,
    default: 3000,
  },
});

const currentIndex = ref(0);
const currentText = ref(props.texts[0]);

let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.texts.length;
    currentText.value = props.texts[currentIndex.value];
  }, props.interval);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from {
  opacity: 0;
  /* transform: scaleY(0.8); */
}

.fade-leave-to {
  opacity: 0;
  /* transform: scaleY(1.2); */
}
</style>
