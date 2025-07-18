<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 w-full h-full">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Modal Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold">Add New Item</h2>
          <button @click="closeModal" class="text-white hover:text-gray-200 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        <!-- Item Information -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Item Information</h3>
          
          <!-- Stock Code -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Stock Code</label>
            <input 
              v-model="formData.stockCode"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Stock Code"
              required
            >
          </div>

          <!-- Part Number -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Part Number</label>
            <input 
              v-model="formData.partNumber"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Part Number"
              required
            >
          </div>

          <!-- Description -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              v-model="formData.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Description"
              required
            ></textarea>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button 
            type="button"
            @click="closeModal"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Save Item
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit'])

const formData = reactive({
  stockCode: '',
  partNumber: '',
  description: ''
})

const closeModal = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  formData.stockCode = ''
  formData.partNumber = ''
  formData.description = ''
}

const handleSubmit = () => {
  // Validate form
  if (!validateForm()) {
    return
  }

  // Prepare data for emission
  const itemData = {
    ...formData,
    id: Date.now(), // Simple ID generation
    createdAt: new Date().toISOString()
  }

  // Emit the data to parent component
  emit('submit', itemData)
  
  // Close modal and reset form
  closeModal()
}

const validateForm = () => {
  // Basic validation
  if (!formData.stockCode || !formData.partNumber || !formData.description) {
    alert('Please fill in all required fields.')
    return false
  }

  return true
}
</script>

<style scoped>
/* Additional styles if needed */
</style> 
