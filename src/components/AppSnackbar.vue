<template>
  <transition name="fade-slide">
    <div
      v-if="isVisible"
      class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[1000] px-4 sm:px-6"
      role="status"
      aria-live="polite"
    >
      <div
        :class="[
          'rounded-lg shadow-xl text-white px-4 py-3 sm:px-5 sm:py-3.5 flex items-start gap-3 min-w-[280px] max-w-[90vw] sm:min-w-[360px] sm:max-w-[520px] border',
          type === 'success' && 'bg-green-600 border-green-700',
          type === 'error' && 'bg-red-600 border-red-700',
          type === 'info' && 'bg-gray-900 border-gray-800',
        ]"
      >
        <span class="inline-flex mt-0.5">
          <svg
            v-if="type === 'success'"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            v-else-if="type === 'error'"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01M5.64 5.64a9 9 0 1112.72 12.72A9 9 0 015.64 5.64z"
            />
          </svg>
          <svg
            v-else
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 3a9 9 0 100 18 9 9 0 000-18z"
            />
          </svg>
        </span>
        <p class="text-sm sm:text-base leading-5 sm:leading-6">{{ message }}</p>
        <button
          @click="hide"
          class="ml-auto -mr-1 p-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          aria-label="Close notification"
        >
          <svg
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import {
  useSnackbarState,
  hideSnackbar as hide,
} from "../composables/useSnackbar";

const { isVisible, message, type } = useSnackbarState();
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 200ms ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 8px);
}
</style>
