<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white"
    >
      <h2 class="text-2xl font-bold mb-2">Stock Management</h2>
      <p class="text-blue-100">
        Track all incoming and outgoing inventory transactions
      </p>
    </div>

    <!-- Filter and Search Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Transaction Type Filter -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Transaction Type</label
          >
          <select
            v-model="selectedFilter"
            @change="filterTransactions"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Transactions</option>
            <option value="in">Stock IN</option>
            <option value="out">Stock OUT</option>
          </select>
        </div>

        <!-- Date Range Filter -->
        <!-- <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Date Range</label
          >
          <input
            v-model="dateFilter"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div> -->

        <!-- Search -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Search</label
          >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by reservation number, PO number, SPB number..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Stock IN</p>
            <p class="text-2xl font-bold text-green-600">{{ stockInCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-3 bg-red-100 rounded-full">
            <svg
              class="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Stock OUT</p>
            <p class="text-2xl font-bold text-red-600">{{ stockOutCount }}</p>
          </div>
        </div>
      </div>

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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Items</p>
            <p class="text-2xl font-bold text-blue-600">{{ totalItems }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-4">
      <button
        @click="openStockModal('in')"
        class="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 font-medium shadow-sm"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        New Stock IN
      </button>

      <button
        @click="openStockModal('out')"
        class="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 font-medium shadow-sm"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        New Stock OUT
      </button>
    </div>

    <!-- Stock Transactions Table -->
    <div
      class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Stock Transactions</h3>
        <p v-if="!isLoading" class="text-sm text-gray-600 mt-1">
          {{ total }} transactions found
        </p>
        <div v-else class="mt-2 h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Document Numbers
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Site
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Plant
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Recipient/Sender
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody v-if="!isLoading" class="bg-white divide-y divide-gray-200">
            <tr
              v-for="transaction in paginatedTransactions"
              :key="transaction.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="
                    transaction.type === 'in'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  "
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  <svg
                    :class="
                      transaction.type === 'in'
                        ? 'text-green-600'
                        : 'text-red-600'
                    "
                    class="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      :d="
                        transaction.type === 'in'
                          ? 'M7 16l-4-4m0 0l4-4m-4 4h18'
                          : 'M17 8l4 4m0 0l-4 4m4-4H3'
                      "
                    />
                  </svg>
                  {{ transaction.type === "in" ? "IN" : "OUT" }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  <div v-if="transaction.reservation_number">
                    <span class="font-semibold">Reservation:</span> {{ transaction.reservation_number }}
                  </div>
                  <div v-if="transaction.po_number">
                    <span class="font-semibold">PO:</span> {{ transaction.po_number }}
                  </div>
                  <div v-if="transaction.spb_number">
                    <span class="font-semibold">SPB:</span> {{ transaction.spb_number }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatDate(transaction.date) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ transaction.site }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ transaction.plant }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  <span v-if="transaction.recipient" class="text-red-600">
                    To: {{ transaction.recipient }}
                  </span>
                  <span v-else-if="transaction.sender" class="text-green-600">
                    From: {{ transaction.sender }}
                  </span>
                  <span v-else class="text-gray-500">-</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatDate(transaction.created_at) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="openDetailModal(transaction.id)"
                  class="text-green-600 hover:text-green-900 mr-3"
                >
                  Detail
                </button>
                <!-- <button
                  @click="viewTransaction(transaction)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  View
                </button> -->
                <button
                  @click="editTransaction(transaction)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else class="bg-white divide-y divide-gray-200">
            <!-- Skeleton Loading Rows -->
            <tr v-for="n in 5" :key="n" class="animate-pulse">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 bg-gray-200 rounded w-16"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 bg-gray-200 rounded w-20"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 bg-gray-200 rounded w-24"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 bg-gray-200 rounded w-32"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 bg-gray-200 rounded w-28"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 bg-gray-200 rounded w-24"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 bg-gray-200 rounded w-20"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                  <div class="h-8 bg-gray-200 rounded w-16"></div>
                  <div class="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <Pagination
      :current-page="currentPage"
      :total-items="total"
      :items-per-page="itemsPerPage"
      @page-change="handlePageChange"
    />

    <!-- Stock Modal -->
    <StockModal
      :isOpen="isModalOpen"
      :type="modalType"
      :isEditing="!!selectedTransactionForEdit"
      :transactionData="selectedTransactionForEdit"
      @close="closeModal"
      @submit="handleTransactionSubmit"
    />

    <!-- Stock Detail Modal -->
    <StockDetailModal
      :isOpen="isDetailModalOpen"
      :transactionId="selectedTransactionId"
      @close="closeDetailModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import StockModal from "../../components/StockModal.vue";
import StockDetailModal from "../../components/StockDetailModal.vue";
import { getStockList, getStockTransactionDetail } from "../../services/stockService";
import { showSuccess, showError } from "../../composables/useSnackbar";
import Pagination from "../../components/Pagination.vue"; // Added Pagination import

// Router
const router = useRouter();

// State
const selectedFilter = ref("all");
const dateFilter = ref("");
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const isModalOpen = ref(false);
const modalType = ref("in");
const stockTransactions = ref([]);
const isLoading = ref(false);
const loadError = ref(null);
const total = ref(0);
const pageFrom = ref(0);
const pageTo = ref(0);
const lastPage = ref(1);

// Detail Modal State
const isDetailModalOpen = ref(false);
const selectedTransactionId = ref(null);

// Edit Modal State
const selectedTransactionForEdit = ref(null);

// Computed properties
const filteredTransactions = computed(() => {
  let filtered = stockTransactions.value;

  // Filter by type
  if (selectedFilter.value !== "all") {
    filtered = filtered.filter(
      (transaction) => transaction.type === selectedFilter.value
    );
  }

  // Filter by date
  if (dateFilter.value) {
    filtered = filtered.filter(
      (transaction) => transaction.date === dateFilter.value
    );
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (transaction) =>
        (transaction.reservation_number && transaction.reservation_number.toLowerCase().includes(query)) ||
        (transaction.po_number && transaction.po_number.toLowerCase().includes(query)) ||
        (transaction.spb_number && transaction.spb_number.toLowerCase().includes(query)) ||
        (transaction.site && transaction.site.toLowerCase().includes(query)) ||
        (transaction.plant && transaction.plant.toLowerCase().includes(query))
    );
  }

  return filtered;
});

const stockInCount = computed(() => {
  return stockTransactions.value.filter((t) => t.type === "in").length;
});

const stockOutCount = computed(() => {
  return stockTransactions.value.filter((t) => t.type === "out").length;
});

const totalItems = computed(() => {
  return stockTransactions.value.length;
});

const totalPages = computed(() => lastPage.value || 1);

const paginatedTransactions = computed(() => filteredTransactions.value);

// Methods
const fetchStockTransactions = async () => {
  isLoading.value = true;
  loadError.value = null;
  try {
    const response = await getStockList(
      currentPage.value,
      searchQuery.value,
      "", // sortBy - can be added later
      ""  // sortOrder - can be added later
    );
    
    const payload = response?.data || {};
    const list = Array.isArray(payload.data) ? payload.data : [];
    
    // Normalize keys to match the API response
    stockTransactions.value = list.map((raw) => ({
      id: raw.id || raw._id,
      _id: raw._id || raw.id, // Ensure _id is available for updates
      reservation_number: raw.reservation_number,
      po_number: raw.po_number,
      spb_number: raw.spb_number,
      type: raw.type,
      date: raw.date,
      site: raw.site,
      plant: raw.plant,
      recipient: raw.recipient,
      sender: raw.sender,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    }));
    
    total.value = Number(payload.total || stockTransactions.value.length);
    pageFrom.value = Number(payload.from || 0);
    pageTo.value = Number(payload.to || stockTransactions.value.length);
    lastPage.value = Number(payload.last_page || 1);
  } catch (error) {
    console.error(error);
    loadError.value = "Failed to load stock transactions.";
    showError("Failed to load stock transactions.");
  } finally {
    isLoading.value = false;
  }
};

const filterTransactions = () => {
  currentPage.value = 1; // Reset to first page when filtering
  fetchStockTransactions();
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
    month: "long",
    year: "numeric",
  });
};

const viewTransaction = (transaction) => {
  if (transaction.type === "in") {
    router.push(`/stock/in/${transaction.id}`);
  } else {
    router.push(`/stock/out/${transaction.id}`);
  }
};

const editTransaction = async (transaction) => {
  try {
    // Fetch full transaction details including items for editing
    const response = await getStockTransactionDetail(transaction.id);
    const fullTransaction = response?.data || transaction;
    
    // Set modal to edit mode and populate with transaction data
    modalType.value = transaction.type;
    isModalOpen.value = true;
    // Pass full transaction data to modal for editing
    selectedTransactionForEdit.value = fullTransaction;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    showError('Failed to load transaction details for editing');
  }
};

const handlePageChange = async (newPage) => {
  currentPage.value = newPage;
  await fetchStockTransactions();
};

const openStockModal = (type) => {
  modalType.value = type;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedTransactionForEdit.value = null;
};

const openDetailModal = (transactionId) => {
  console.log('Opening detail modal for transaction:', transactionId);
  selectedTransactionId.value = transactionId;
  isDetailModalOpen.value = true;
  console.log('Modal state:', { isDetailModalOpen: isDetailModalOpen.value, selectedTransactionId: selectedTransactionId.value });
};

const closeDetailModal = () => {
  isDetailModalOpen.value = false;
  selectedTransactionId.value = null;
};

const handleTransactionSubmit = async (transactionData) => {
  try {
    // The modal has already called the API, so we just need to refresh the list
    await fetchStockTransactions()
    
    // Reset current page to show the new/updated transaction
    currentPage.value = 1
    
    // Close modal
    closeModal()
    
    // Show appropriate success message
    if (selectedTransactionForEdit.value) {
      showSuccess('Transaction updated successfully!')
    } else {
      showSuccess('Transaction created successfully!')
    }
  } catch (error) {
    console.error('Failed to refresh transactions:', error)
    showError('Transaction saved but failed to refresh the list.')
  }
}

// Watchers
watch(searchQuery, () => {
  currentPage.value = 1;
  fetchStockTransactions();
});

watch(selectedFilter, () => {
  currentPage.value = 1;
  fetchStockTransactions();
});

// Lifecycle
onMounted(fetchStockTransactions);
</script>

<style scoped>
/* Any additional custom styles if needed */
</style>
