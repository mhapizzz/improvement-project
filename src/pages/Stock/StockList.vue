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
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Date Range</label
          >
          <input
            v-model="dateFilter"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Search -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Search</label
          >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by part number, description..."
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
        <p class="text-sm text-gray-600 mt-1">
          {{ filteredTransactions.length }} transactions found
        </p>
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
                Document No.
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Part Number
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
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
                  {{ transaction.documentNo }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ transaction.referenceNo }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatDate(transaction.date) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ transaction.partNumber }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ transaction.stockCode }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">
                  {{ transaction.description }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span
                    :class="
                      transaction.type === 'in'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    "
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ transaction.type === "in" ? "+" : "-"
                    }}{{ transaction.quantity }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusColor(transaction.status)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ transaction.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="viewTransaction(transaction)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  View
                </button>
                <button
                  @click="editTransaction(transaction)"
                  class="text-indigo-600 hover:text-indigo-900"
                  v-if="transaction.status === 'Draft'"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <Pagination
      :current-page="currentPage"
      :total-items="filteredTransactions.length"
      :items-per-page="itemsPerPage"
      @page-change="handlePageChange"
    />

    <!-- Stock Modal -->
    <StockModal
      :isOpen="isModalOpen"
      :type="modalType"
      @close="closeModal"
      @submit="handleTransactionSubmit"
    />
  </div>
</template>

<script>
import StockModal from "../../components/StockModal.vue";
import Pagination from "../../components/Pagination.vue";

export default {
  name: "StockList",
  components: {
    StockModal,
    Pagination,
  },
  data() {
    return {
      selectedFilter: "all",
      dateFilter: "",
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 10,
      isModalOpen: false,
      modalType: "in",
      stockTransactions: [
        {
          id: 1,
          type: "in",
          documentNo: "1100086756",
          referenceNo: "025/DO/HRS-AGM/VI/2025",
          date: "2025-05-10",
          partNumber: "23236859",
          stockCode: "SP00606599",
          description: "FRONT SPRING FMX400 NO.1",
          quantity: 3,
          status: "Completed",
          site: "AGM Blok 4",
          plant: "HRS Site AGM Blok 4",
        },
        {
          id: 2,
          type: "out",
          documentNo: "423059",
          referenceNo: "RESV-2025-001",
          date: "2025-05-10",
          partNumber: "23236859",
          stockCode: "SP00606599",
          description: "FRONT SPRING FMX400 NO.1",
          quantity: 1,
          status: "Completed",
          site: "AGM Blok 4",
          plant: "HRS Site AGM Blok 4",
          recipient: "Izul",
        },
        {
          id: 3,
          type: "in",
          documentNo: "1100086757",
          referenceNo: "026/DO/HRS-AGM/VI/2025",
          date: "2025-05-11",
          partNumber: "45678901",
          stockCode: "SP00606600",
          description: "BRAKE PAD SET FRONT",
          quantity: 5,
          status: "Draft",
          site: "AGM Blok 4",
          plant: "HRS Site AGM Blok 4",
        },
        {
          id: 4,
          type: "out",
          documentNo: "423060",
          referenceNo: "RESV-2025-002",
          date: "2025-05-11",
          partNumber: "78901234",
          stockCode: "SP00606601",
          description: "ENGINE OIL FILTER",
          quantity: 2,
          status: "Processing",
          site: "AGM Blok 4",
          plant: "HRS Site AGM Blok 4",
          recipient: "Ahmad",
        },
        {
          id: 5,
          type: "in",
          documentNo: "1100086758",
          referenceNo: "027/DO/HRS-AGM/VI/2025",
          date: "2025-05-12",
          partNumber: "34567890",
          stockCode: "SP00606602",
          description: "TRANSMISSION FLUID",
          quantity: 10,
          status: "Completed",
          site: "AGM Blok 4",
          plant: "HRS Site AGM Blok 4",
        },
      ],
    };
  },
  computed: {
    filteredTransactions() {
      let filtered = this.stockTransactions;

      // Filter by type
      if (this.selectedFilter !== "all") {
        filtered = filtered.filter(
          (transaction) => transaction.type === this.selectedFilter
        );
      }

      // Filter by date
      if (this.dateFilter) {
        filtered = filtered.filter(
          (transaction) => transaction.date === this.dateFilter
        );
      }

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (transaction) =>
            transaction.partNumber.toLowerCase().includes(query) ||
            transaction.description.toLowerCase().includes(query) ||
            transaction.stockCode.toLowerCase().includes(query) ||
            transaction.documentNo.toLowerCase().includes(query)
        );
      }

      return filtered;
    },
    stockInCount() {
      return this.stockTransactions.filter((t) => t.type === "in").length;
    },
    stockOutCount() {
      return this.stockTransactions.filter((t) => t.type === "out").length;
    },
    totalItems() {
      return this.stockTransactions.length;
    },

    paginatedTransactions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredTransactions.slice(start, end);
    },
  },
  methods: {
    filterTransactions() {
      this.currentPage = 1; // Reset to first page when filtering
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
    getStatusColor(status) {
      const colors = {
        Draft: "bg-gray-100 text-gray-800",
        Processing: "bg-yellow-100 text-yellow-800",
        Completed: "bg-green-100 text-green-800",
        Cancelled: "bg-red-100 text-red-800",
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    },
    viewTransaction(transaction) {
      if (transaction.type === "in") {
        this.$router.push(`/stock/in/${transaction.id}`);
      } else {
        this.$router.push(`/stock/out/${transaction.id}`);
      }
    },
    editTransaction(transaction) {
      if (transaction.type === "in") {
        this.$router.push(`/stock/in/${transaction.id}/edit`);
      } else {
        this.$router.push(`/stock/out/${transaction.id}/edit`);
      }
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
    },
    openStockModal(type) {
      this.modalType = type;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleTransactionSubmit(transactionData) {
      // Generate a unique ID for the new transaction
      const newId = Math.max(...this.stockTransactions.map((t) => t.id)) + 1;

      // Generate document number based on type
      const documentNo = this.generateDocumentNumber(transactionData.type);

      // Create the new transaction with proper structure
      const newTransaction = {
        id: newId,
        type: transactionData.type,
        documentNo: documentNo,
        referenceNo: transactionData.spbNumber,
        date: transactionData.date,
        site: transactionData.site,
        plant: transactionData.plant,
        status: "Draft",
        createdAt: transactionData.createdAt,
        poNumber: transactionData.poNumber,
        spbNumber: transactionData.spbNumber,
      };

      // Add recipient for stock out
      if (transactionData.type === "out") {
        newTransaction.recipient = transactionData.recipient;
      }

      // For simplicity, if there are multiple items, we'll create separate transactions
      // In a real application, you might want to handle this differently
      transactionData.items.forEach((item, index) => {
        const itemTransaction = {
          ...newTransaction,
          id: newId + index,
          partNumber: item.partNumber,
          stockCode: item.stockCode,
          description: item.description,
          quantity: item.quantity,
        };

        this.stockTransactions.unshift(itemTransaction);
      });

      // Show success message
      alert(
        `${
          transactionData.type === "in" ? "Stock IN" : "Stock OUT"
        } transaction created successfully!`
      );

      // Reset current page to show the new transaction
      this.currentPage = 1;
    },
    generateDocumentNumber(type) {
      // Generate a simple document number based on type
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const random = Math.floor(Math.random() * 10000);

      if (type === "in") {
        return `11000${random}`;
      } else {
        return `4230${random}`;
      }
    },
  },
};
</script>

<style scoped>
/* Any additional custom styles if needed */
</style>
