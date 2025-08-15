<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white"
    >
      <h2 class="text-2xl font-bold mb-2">Stok Tersedia</h2>
      <p class="text-green-100">
        Lihat tingkat inventaris saat ini dan kuantitas stok
      </p>
    </div>

    <!-- Filter and Search Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Cari Barang</label
          >
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari berdasarkan nama barang, kode, atau deskripsi..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              @input="handleSearch"
              :disabled="isLoading"
            />
            <div v-if="isLoading" class="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div class="animate-pulse h-4 w-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        <!-- Sort By -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Urutkan Berdasarkan</label
          >
          <select
            v-model="sortBy"
            @change="handleSort"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            :disabled="isLoading"
          >
            <option value="">Pilih Bidang Pengurutan</option>
            <option value="stock_code">Kode Stok</option>
            <option value="part_number">Nomor Bagian</option>
            <option value="stock_on_hand">Stok Tersedia</option>
            <!-- <option value="updated_at">Terakhir Diperbarui</option> -->
          </select>
        </div>

        <!-- Sort Order -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Urutan Pengurutan</label
          >
          <select
            v-model="sortOrder"
            @change="handleSort"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            :disabled="isLoading"
          >
            <option value="">Pilih Urutan</option>
            <option value="asc">Menaik</option>
            <option value="desc">Menurun</option>
          </select>
        </div>

        <!-- Refresh Button -->
        <div class="flex items-end">
          <button
            @click="fetchInventory"
            :disabled="isLoading"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {{ isLoading ? 'Memuat...' : 'Segarkan' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-full">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Barang</p>
            <p v-if="!isLoading" class="text-2xl font-bold text-blue-600">{{ totalItems }}</p>
            <div v-else class="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-full">
            <svg
              class="w-6 h-6 text-green-600"
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
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Tersedia</p>
            <p v-if="!isLoading" class="text-2xl font-bold text-green-600">{{ inStockCount }}</p>
            <div v-else class="h-8 bg-gray-200 rounded animate-pulse w-12"></div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 rounded-full">
            <svg
              class="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Stok Menipis</p>
            <p v-if="!isLoading" class="text-2xl font-bold text-yellow-600">{{ lowStockCount }}</p>
            <div v-else class="h-8 bg-gray-200 rounded animate-pulse w-12"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stock List -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Barang Inventaris</h3>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Barang
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kode Stok
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nomor Bagian
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stok Tersedia
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Terakhir Diperbarui
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Skeleton Rows -->
            <tr v-for="n in 5" :key="n" class="animate-pulse">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-200"></div>
                  </div>
                  <div class="ml-4">
                    <div class="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 bg-gray-200 rounded w-20"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 bg-gray-200 rounded w-16"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 bg-gray-200 rounded w-12"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-6 bg-gray-200 rounded-full w-20"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 bg-gray-200 rounded w-20"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Error State -->
      <div v-else-if="loadError" class="p-6 text-center">
        <div class="text-red-600">
          <svg class="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Gagal memuat inventaris</h3>
          <p class="mt-1 text-sm text-gray-500">{{ loadError }}</p>
          <div class="mt-6">
            <button
              @click="fetchInventory"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Coba lagi
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="inventoryItems.length === 0" class="p-6 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada barang inventaris</h3>
        <p class="mt-1 text-sm text-gray-500">Mulai dengan menambahkan beberapa barang ke inventaris Anda.</p>
      </div>

      <!-- Inventory Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Barang
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kode Stok
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nomor Bagian
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stok Tersedia
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Terakhir Diperbarui
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="item in inventoryItems"
              :key="item.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ item.stock_code || 'Tidak Ada' }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ item.part_number || 'Tidak ada nomor bagian' }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ item.stock_code || 'Tidak Ada' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ item.part_number || 'Tidak Ada' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ item.quantity || 0 }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusClass(item.quantity, 0)
                  ]"
                >
                  {{ getStatusText(item.quantity, 0) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ formatDate(item.updated_at) }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-3 border-t border-gray-200">
        <Pagination
          :current-page="currentPage"
          :total-items="total"
          :items-per-page="itemsPerPage"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import Pagination from "../../components/Pagination.vue";
import { getSOHList } from "../../services/sohService";

// State
const searchQuery = ref("");
const sortBy = ref("stock_code");
const sortOrder = ref("asc");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const inventoryItems = ref([]);
const isLoading = ref(false);
const loadError = ref(null);
const total = ref(0);
const pageFrom = ref(0);
const pageTo = ref(0);
const lastPage = ref(1);

// Computed properties
const totalItems = computed(() => total.value);

const inStockCount = computed(() => {
  return inventoryItems.value.filter(item => 
    item.quantity && item.quantity > 0
  ).length;
});

const lowStockCount = computed(() => {
  return inventoryItems.value.filter(item => 
    item.quantity && item.quantity <= 0
  ).length;
});

// Methods
const fetchInventory = async () => {
  isLoading.value = true;
  loadError.value = null;
  
  try {
    // Call the SOH API using GET method with query parameters
    console.log('API Call Debug:', {
      page: currentPage.value,
      search: searchQuery.value,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value
    });
    
    const response = await getSOHList(
      currentPage.value,
      searchQuery.value,
      sortBy.value,
      sortOrder.value
    );
    
    // Handle the response structure: { status, message, data: { current_page, data: [...], ... } }
    if (response.status === 200 && response.data) {
      const responseData = response.data;
      const list = Array.isArray(responseData.data) ? responseData.data : [];
      
      console.log('API Response Debug:', {
        status: response.status,
        message: response.message,
        responseData: responseData,
        listLength: list.length
      });
      
      // Normalize keys to match the API response structure
      inventoryItems.value = list.map((raw) => ({
        id: raw.id,
        stock_code: raw.stock_code,
        part_number: raw.part_number,
        quantity: Number(raw.stock_on_hand) || 0,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
        // Set default values for missing fields
        name: raw.stock_code || 'Tidak Ada',
        code: raw.part_number || 'Tidak Ada',
        description: raw.stock_code || 'Tidak Ada',
        category: 'Umum',
        min_quantity: 0,
        unit: 'pcs',
        site: 'Tidak Ada',
        plant: 'Tidak Ada',
      }));
      
      // Update pagination from the response
      total.value = Number(responseData.total || 0);
      pageFrom.value = Number(responseData.from || 0);
      pageTo.value = Number(responseData.to || 0);
      lastPage.value = Number(responseData.last_page || 1);
      // Don't override currentPage here as it might interfere with pagination
      // currentPage.value = Number(responseData.current_page || 1);
      
      // Debug pagination data
      console.log('Pagination Debug:', {
        total: total.value,
        from: pageFrom.value,
        to: pageTo.value,
        lastPage: lastPage.value,
        currentPage: currentPage.value
      });
    } else {
      throw new Error(response.message || 'Format respons tidak valid');
    }
    
  } catch (error) {
    console.error('Error fetching inventory:', error);
    loadError.value = error.message || 'Gagal memuat data inventaris';
  } finally {
    isLoading.value = false;
  }
};

// Debounce function for search
let searchTimeout = null;
const debounceSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    currentPage.value = 1;
    fetchInventory();
  }, 500);
};

const handleSearch = () => {
  debounceSearch();
};

const handleSort = () => {
  currentPage.value = 1;
  fetchInventory();
};

const handlePageChange = (page) => {
  console.log('Page change requested:', page);
  currentPage.value = page;
  fetchInventory();
};

const getStatusClass = (quantity, minQuantity) => {
  if (quantity < 0) {
    return 'bg-red-100 text-red-800'; // Negative stock
  }
  if (!quantity || quantity === 0) {
    return 'bg-red-100 text-red-800'; // Out of stock
  }
  if (minQuantity && quantity <= minQuantity) {
    return 'bg-yellow-100 text-yellow-800'; // Low stock
  }
  return 'bg-green-100 text-green-800'; // In stock
};

const getStatusText = (quantity, minQuantity) => {
  if (quantity < 0) {
    return 'Stok Negatif';
  }
  if (!quantity || quantity === 0) {
    return 'Habis Stok';
  }
  if (minQuantity && quantity <= minQuantity) {
    return 'Stok Menipis';
  }
  return 'Tersedia';
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  let parsed = dateString;
  // Handle common backend format "YYYY-MM-DD HH:mm:ss" which Safari won't parse
  if (
    typeof parsed === "string" &&
    /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(parsed)
  ) {
    parsed = parsed.replace(" ", "T");
  }
  const date = new Date(parsed);
  if (isNaN(date.getTime())) return String(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Watchers
watch(searchQuery, () => {
  if (!isLoading.value) {
    debounceSearch();
  }
});

watch([sortBy, sortOrder], () => {
  if (!isLoading.value) {
    currentPage.value = 1;
    fetchInventory();
  }
});

// Lifecycle
onMounted(() => {
  fetchInventory();
});
</script>
