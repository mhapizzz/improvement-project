<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="onCancel"></div>
    <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="px-6 pt-5 pb-4">
        <div class="flex items-start">
          <div :class="iconBgClass" class="flex-shrink-0 mx-auto flex items-center justify-center h-10 w-10 rounded-full">
            <svg v-if="type==='danger'" class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M4.93 4.93a10 10 0 1014.14 14.14A10 10 0 004.93 4.93z" />
            </svg>
            <svg v-else class="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
            </svg>
          </div>
          <div class="ml-4 text-left w-full">
            <h3 class="text-lg leading-6 font-medium text-gray-900">{{ title }}</h3>
            <div class="mt-2">
              <p class="text-sm text-gray-600">{{ message }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="px-6 pb-5 pt-3 flex justify-end space-x-3 border-t border-gray-100">
        <button @click="onCancel" class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">{{ cancelText }}</button>
        <button @click="onConfirm" :class="confirmBtnClass" class="px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: 'Confirm' },
  message: { type: String, default: 'Are you sure?' },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' },
  type: { type: String, default: 'danger' }, // 'danger' | 'default'
})

const emit = defineEmits(['confirm', 'close'])

const onCancel = () => emit('close')
const onConfirm = () => emit('confirm')

const iconBgClass = computed(() => (props.type === 'danger' ? 'bg-red-100' : 'bg-gray-100'))
const confirmBtnClass = computed(() => (props.type === 'danger' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'))
</script>

<style scoped>
</style>


