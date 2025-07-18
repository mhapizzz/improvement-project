<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-red-600 to-pink-600 rounded-lg p-6 text-white">
      <h2 class="text-2xl font-bold mb-2">Stock OUT</h2>
      <p class="text-red-100">Manage outgoing inventory items</p>
    </div>

    <!-- Information Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Reservation Information</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-600">No. Resv:</span>
            <span class="text-sm font-semibold text-gray-900">423059</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-600">Tanggal:</span>
            <span class="text-sm font-semibold text-gray-900">10 Mei 2025</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-600">Recipient:</span>
            <span class="text-sm font-semibold text-gray-900">Izul</span>
          </div>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-600">Site:</span>
            <span class="text-sm font-semibold text-gray-900">AGM Blok 4</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-600">Plant:</span>
            <span class="text-sm font-semibold text-gray-900">HRS Site AGM Blok 4</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-4">
      <button 
        @click="scanBarcode" 
        class="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium shadow-sm"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h2a1 1 0 001-1V6a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h2" />
        </svg>
        Scan Barcode
      </button>
      
      <button 
        @click="addMaterial" 
        class="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 font-medium shadow-sm"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Material
      </button>
    </div>

    <!-- Stock Items Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Stock Items</h3>
        <p class="text-sm text-gray-600 mt-1">{{ stockItems.length }} items to be issued</p>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Code
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Part Number
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in stockItems" :key="index" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.stockCode || '-' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ item.partNumber || '-' }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ item.description || '-' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {{ item.qty }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                  @click="removeItem(index)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                  v-if="stockItems.length > 1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Summary Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Total Items</h3>
          <p class="text-sm text-gray-600">Ready to issue</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-red-600">{{ totalQuantity }}</div>
          <div class="text-sm text-gray-500">{{ stockItems.length }} products</div>
        </div>
      </div>
      
      <div class="mt-6 flex flex-wrap gap-3">
        <button class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 font-medium">
          Process Stock Out
        </button>
        <button class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium">
          Save Draft
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StockOut",
  data() {
    return {
      stockItems: [
        {
          stockCode: "SP00606599",
          partNumber: "23236859",
          description: "FRONT SPRING FMX400 NO.1",
          qty: 3
        }
      ]
    };
  },
  computed: {
    totalQuantity() {
      return this.stockItems.reduce((total, item) => total + item.qty, 0);
    }
  },
  methods: {
    scanBarcode() {
      // Enhanced barcode scanning functionality
      alert("Scanning barcode...");
    },
    addMaterial() {
      this.stockItems.push({
        stockCode: "",
        partNumber: "",
        description: "",
        qty: 0
      });
    },
    removeItem(index) {
      if (this.stockItems.length > 1) {
        this.stockItems.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
/* Any additional custom styles if needed */
</style>
