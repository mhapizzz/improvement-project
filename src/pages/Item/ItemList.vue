<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
      <h2 class="text-2xl font-bold mb-2">Item Management</h2>
      <p class="text-blue-100">Manage your inventory items and their details</p>
    </div>

    <!-- Search Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by stock code, part number, or description..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-full">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Items</p>
            <p class="text-2xl font-bold text-blue-600">{{ totalItems }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-full">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Items</p>
            <p class="text-2xl font-bold text-green-600">{{ activeItems }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-full">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Categories</p>
            <p class="text-2xl font-bold text-purple-600">{{ totalCategories }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-4">
      <button
        @click="openAddModal"
        class="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium shadow-sm"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add New Item
      </button>
    </div>

    <!-- Items Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Items</h3>
        <p class="text-sm text-gray-600 mt-1">{{ filteredItems.length }} items found</p>
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
                Created Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="item in paginatedItems"
              :key="item.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.stockCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.partNumber }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ item.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(item.createdAt) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="editItem(item)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Edit
                </button>
                <button
                  @click="deleteItem(item)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-700">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
          {{ Math.min(currentPage * itemsPerPage, filteredItems.length) }}
          of {{ filteredItems.length }} results
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span class="px-3 py-1 text-sm font-medium text-gray-700">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Add Item Modal -->
    <AddNewItemModal
      :isOpen="isModalOpen"
      @close="closeModal"
      @submit="handleItemSubmit"
    />
  </div>
</template>

<script>
import AddNewItemModal from "../../components/AddNewItemModal.vue";

export default {
  name: "ItemList",
  components: {
    AddNewItemModal,
  },
  data() {
    return {
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 10,
      isModalOpen: false,
      items: [
        {
          id: 1,
          stockCode: "SP00606599",
          partNumber: "23236859",
          description: "FRONT SPRING FMX400 NO.1",
          createdAt: "2025-01-15T10:30:00Z",
        },
        {
          id: 2,
          stockCode: "SP00606600",
          partNumber: "45678901",
          description: "BRAKE PAD SET FRONT",
          createdAt: "2025-01-15T11:00:00Z",
        },
        {
          id: 3,
          stockCode: "SP00606601",
          partNumber: "78901234",
          description: "ENGINE OIL FILTER",
          createdAt: "2025-01-15T14:30:00Z",
        },
        {
          id: 4,
          stockCode: "SP00606602",
          partNumber: "34567890",
          description: "TRANSMISSION FLUID",
          createdAt: "2025-01-15T16:00:00Z",
        },
        {
          id: 5,
          stockCode: "SP00606603",
          partNumber: "56789012",
          description: "AIR FILTER ELEMENT",
          createdAt: "2025-01-16T09:15:00Z",
        },
      ],
    };
  },
  computed: {
    filteredItems() {
      let filtered = this.items;

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.stockCode.toLowerCase().includes(query) ||
            item.partNumber.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );
      }

      return filtered;
    },
    totalItems() {
      return this.items.length;
    },
    activeItems() {
      return this.items.length; // For now, assume all items are active
    },
    totalCategories() {
      // Calculate unique categories based on first 3 letters of stock code
      const categories = new Set(this.items.map(item => item.stockCode.substring(0, 3)));
      return categories.size;
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
    openAddModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleItemSubmit(itemData) {
      // Add the new item to the list
      this.items.unshift(itemData);
      
      // Show success message
      alert("Item added successfully!");
      
      // Reset current page to show the new item
      this.currentPage = 1;
    },
    editItem(item) {
      // For now, show alert. In a real app, this would open an edit modal
      alert(`Edit item: ${item.partNumber}`);
    },
    deleteItem(item) {
      if (confirm(`Are you sure you want to delete item "${item.partNumber}"?`)) {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index > -1) {
          this.items.splice(index, 1);
          alert("Item deleted successfully!");
          
          // Adjust current page if needed
          if (this.currentPage > this.totalPages && this.totalPages > 0) {
            this.currentPage = this.totalPages;
          }
        }
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  watch: {
    searchQuery() {
      this.currentPage = 1; // Reset to first page when searching
    },
  },
};
</script>

<style scoped>
/* Any additional custom styles if needed */
</style> 
