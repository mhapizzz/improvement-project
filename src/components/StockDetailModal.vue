<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
        <!-- Header -->
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">
              Stock Transaction Detail
            </h3>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="px-6 py-8">
          <!-- Skeleton Loading -->
          <div class="space-y-6">
            <!-- Transaction Info Skeleton -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="h-5 bg-gray-200 rounded w-32 mb-3 animate-pulse"></div>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="h-5 bg-gray-200 rounded w-32 mb-3 animate-pulse"></div>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Transaction Items Skeleton -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="h-5 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
              <div class="space-y-3">
                <div class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="px-6 py-8">
          <div class="text-center">
            <div class="text-red-600 mb-4">
              <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Error Loading Details</h3>
            <p class="text-gray-600">{{ error }}</p>
            <button
              @click="loadDetails"
              class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>

        <!-- Content -->
        <div v-else-if="transactionData" class="px-6 py-6">
          <!-- Transaction Header Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-900 mb-3">Transaction Information</h4>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">ID:</span>
                  <span class="font-medium">{{ transactionData.id }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Type:</span>
                  <span class="font-medium">
                    <span 
                      :class="[
                        'px-2 py-1 rounded-full text-xs font-medium',
                        transactionData.type === 'in' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      ]"
                    >
                      {{ transactionData.type === 'in' ? 'Stock In' : 'Stock Out' }}
                    </span>
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Date:</span>
                  <span class="font-medium">{{ formatDate(transactionData.date) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Site:</span>
                  <span class="font-medium">{{ transactionData.site }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Plant:</span>
                  <span class="font-medium">{{ transactionData.plant }}</span>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-900 mb-3">Reference Numbers</h4>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">PO Number:</span>
                  <span class="font-medium">{{ transactionData.po_number || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">SPB Number:</span>
                  <span class="font-medium">{{ transactionData.spb_number || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Reservation:</span>
                  <span class="font-medium">{{ transactionData.reservation_number || 'N/A' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Transaction Items -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-4">Transaction Items ({{ transactionData.transaction_stock_items.length }})</h4>
            
            <div v-if="transactionData.transaction_stock_items.length === 0" class="text-center py-8 text-gray-500">
              No items found in this transaction
            </div>
            
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item ID</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Code</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part Number</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <!-- <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th> -->
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in transactionData.transaction_stock_items" :key="item.id" class="hover:bg-gray-50">
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{{ item.item_id }}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {{ item.item?.stock_code || 'N/A' }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {{ item.item?.part_number || 'N/A' }}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-900">
                      {{ item.item?.description || 'N/A' }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <span class="font-medium">{{ item.qty }}</span>
                    </td>
                    <!-- <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {{ item.item?.price ? `$${item.item.price}` : 'N/A' }}
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Timestamps -->
          <div class="mt-6 text-sm text-gray-500 text-center">
            <p>Created: {{ formatDateTime(transactionData.created_at) }}</p>
            <p v-if="transactionData.updated_at !== transactionData.created_at">
              Updated: {{ formatDateTime(transactionData.updated_at) }}
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div class="flex justify-end">
            <button
              @click="closeModal"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { getStockTransactionDetail } from '../services/stockService'

export default {
  name: 'StockDetailModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    transactionId: {
      type: [String, Number],
      default: null
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const loading = ref(false)
    const error = ref(null)
    const transactionData = ref(null)

    const closeModal = () => {
      emit('close')
    }

    const loadDetails = async () => {
      if (!props.transactionId) return
      
      console.log('StockDetailModal: Loading details for transaction:', props.transactionId);
      loading.value = true
      error.value = null
      
      try {
        const response = await getStockTransactionDetail(props.transactionId)
        console.log('StockDetailModal: API response:', response);
        if (response.status === 200) {
          transactionData.value = response.data
        } else {
          error.value = response.message || 'Failed to load transaction details'
        }
      } catch (err) {
        console.error('StockDetailModal: API error:', err);
        error.value = err.message || 'An error occurred while loading details'
      } finally {
        loading.value = false
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString()
    }

    const formatDateTime = (dateString) => {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleString()
    }

    // Watch for changes in transactionId and load details when modal opens
    watch(() => props.transactionId, (newId) => {
      console.log('StockDetailModal: transactionId changed to:', newId);
      if (newId && props.isOpen) {
        loadDetails()
      }
    })

    watch(() => props.isOpen, (isOpen) => {
      console.log('StockDetailModal: isOpen changed to:', isOpen);
      if (isOpen && props.transactionId) {
        loadDetails()
      } else if (!isOpen) {
        // Reset state when modal closes
        transactionData.value = null
        error.value = null
        loading.value = false
      }
    })

    return {
      loading,
      error,
      transactionData,
      closeModal,
      loadDetails,
      formatDate,
      formatDateTime
    }
  }
}
</script>
