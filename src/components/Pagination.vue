<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="text-sm text-gray-700 text-center sm:text-left w-full sm:w-auto">
        Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
      </div>
      <div class="flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-end">
        <button
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span class="px-3 py-1 text-sm font-medium text-gray-700">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
})

const emit = defineEmits(['page-change'])

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})

const startItem = computed(() => {
  return (props.currentPage - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
})

const goToPreviousPage = () => {
  if (props.currentPage > 1) {
    emit("page-change", props.currentPage - 1)
  }
}

const goToNextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit("page-change", props.currentPage + 1)
  }
}
</script>

<style scoped>
/* Component-specific styles if needed */
</style> 
