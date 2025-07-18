<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <!-- Modal Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold">
            {{ type === 'in' ? 'New Stock IN' : 'New Stock OUT' }}
          </h2>
          <button @click="closeModal" class="text-white hover:text-gray-200 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        <!-- Header Information -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Transaction Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- PO Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">PO Number</label>
              <input 
                v-model="formData.poNumber"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter PO Number"
                required
              >
            </div>

            <!-- SPB Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">SPB Number</label>
              <input 
                v-model="formData.spbNumber"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter SPB Number"
                required
              >
            </div>

            <!-- Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input 
                v-model="formData.date"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
            </div>

            <!-- Site -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Site</label>
              <input 
                v-model="formData.site"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Site"
                required
              >
            </div>

            <!-- Plant -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Plant</label>
              <input
                v-model="formData.plant" 
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Plant"
                required
              >
            </div>

            <!-- Recipient (only for Stock OUT) -->
            <div v-if="type === 'out'">
              <label class="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
              <input 
                v-model="formData.recipient"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Recipient Name"
                required
              >
            </div>
          </div>
        </div>

        <!-- Items Section -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Items</h3>
            <button 
              type="button"
              @click="addItem"
              class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Item
            </button>
          </div>

          <!-- Items List -->
          <div class="space-y-4">
            <div 
              v-for="(item, index) in formData.items" 
              :key="index"
              class="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div class="flex justify-between items-center mb-3">
                <h4 class="text-sm font-medium text-gray-700">Item {{ index + 1 }}</h4>
                <button 
                  type="button"
                  @click="removeItem(index)"
                  class="text-red-600 hover:text-red-800 transition-colors"
                  :disabled="formData.items.length === 1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Stock Code -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Stock Code</label>
                  <input 
                    v-model="item.stockCode"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Stock Code"
                    required
                  >
                </div>

                <!-- Part Number -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Part Number</label>
                  <input 
                    v-model="item.partNumber"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Part Number"
                    required
                  >
                </div>

                <!-- Description -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input 
                    v-model="item.description"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Description"
                    required
                  >
                </div>

                <!-- Quantity -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input 
                    v-model.number="item.quantity"
                    type="number"
                    min="1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Quantity"
                    required
                  >
                </div>
              </div>
            </div>
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
            Save Transaction
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'in', // 'in' or 'out'
    validator: value => ['in', 'out'].includes(value)
  }
})

const emit = defineEmits(['close', 'submit'])

const formData = reactive({
  poNumber: '',
  spbNumber: '',
  date: '',
  site: '',
  plant: '',
  recipient: '', // Only for stock out
  items: [
    {
      stockCode: '',
      partNumber: '',
      description: '',
      quantity: 1
    }
  ]
})

const addItem = () => {
  formData.items.push({
    stockCode: '',
    partNumber: '',
    description: '',
    quantity: 1
  })
}

const removeItem = (index) => {
  if (formData.items.length > 1) {
    formData.items.splice(index, 1)
  }
}

const closeModal = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  formData.poNumber = ''
  formData.spbNumber = ''
  formData.date = ''
  formData.site = ''
  formData.plant = ''
  formData.recipient = ''
  formData.items = [
    {
      stockCode: '',
      partNumber: '',
      description: '',
      quantity: 1
    }
  ]
}

const handleSubmit = () => {
  // Validate form
  if (!validateForm()) {
    return
  }

  // Prepare data for emission
  const transactionData = {
    ...formData,
    type: props.type,
    status: 'Draft',
    createdAt: new Date().toISOString()
  }

  // Emit the data to parent component
  emit('submit', transactionData)
  
  // Close modal and reset form
  closeModal()
}

const validateForm = () => {
  // Basic validation
  if (!formData.poNumber || !formData.spbNumber || !formData.date || 
      !formData.site || !formData.plant) {
    alert('Please fill in all required fields in the transaction information section.')
    return false
  }

  if (props.type === 'out' && !formData.recipient) {
    alert('Please enter the recipient name for stock out transaction.')
    return false
  }

  // Validate items
  for (let i = 0; i < formData.items.length; i++) {
    const item = formData.items[i]
    if (!item.stockCode || !item.partNumber || !item.description || !item.quantity) {
      alert(`Please fill in all fields for item ${i + 1}.`)
      return false
    }
    if (item.quantity <= 0) {
      alert(`Quantity for item ${i + 1} must be greater than 0.`)
      return false
    }
  }

  return true
}

// Watch for modal opening to set default date
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    // Set default date to today
    formData.date = new Date().toISOString().split('T')[0]
  }
})
</script>

<style scoped>
/* Additional styles if needed */
</style> 
