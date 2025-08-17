<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white"
    >
      <h2 class="text-2xl font-bold mb-2">Manajemen Barang</h2>
      <p class="text-blue-100">Kelola barang inventaris dan detailnya</p>
    </div>

    <!-- Search Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Cari</label
          >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari berdasarkan kode stok, part number, atau deskripsi..."
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
            <p class="text-2xl font-bold text-blue-600">{{ totalItems }}</p>
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
            <p class="text-sm font-medium text-gray-600">Barang Aktif</p>
            <p class="text-2xl font-bold text-green-600">{{ activeItems }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-full">
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Kategori</p>
            <p class="text-2xl font-bold text-purple-600">
              {{ totalCategories }}
            </p>
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
        Tambah Barang Baru
      </button>
    </div>

    <!-- Items Table -->
    <div
      class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Barang</h3>
        <p v-if="!isLoading" class="text-sm text-gray-600 mt-1">{{ total }} barang ditemukan</p>
        <div v-else class="mt-2 h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kode Stok
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
              Part Number
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Deskripsi
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tanggal Dibuat
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody v-if="!isLoading" class="bg-white divide-y divide-gray-200">
            <tr
              v-for="item in paginatedItems"
              :key="item.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ item.stock_code }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ item.part_number }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ item.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatDate(item.createdAt) }}
                </div>
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
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else class="bg-white divide-y divide-gray-200">
            <tr v-for="n in 10" :key="n">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td class="px-6 py-4">
                <div class="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
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

    <!-- Add/Edit Item Modal (reused) -->
    <AddNewItemModal
      :isOpen="isModalOpen || isEditOpen"
      :item="isEditOpen ? editingItem : null"
      :submitting="isSubmitting"
      @close="handleModalClose"
      @submit="handleModalSubmit"
    />

    <!-- Confirm Delete Modal -->
    <ConfirmModal
      :isOpen="isConfirmOpen"
      title="Hapus Barang"
      :message="confirmDeleteMessage"
      confirmText="Hapus"
      cancelText="Batal"
      type="danger"
      @close="isConfirmOpen = false; pendingDeleteItem = null"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import AddNewItemModal from "../../components/AddNewItemModal.vue";
import ConfirmModal from "../../components/ConfirmModal.vue";
import Pagination from "../../components/Pagination.vue";
import {
  getItemList,
  createItem,
  deleteItemById,
} from "../../services/itemService";
import { showSuccess, showError } from "../../composables/useSnackbar";

// State
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const isModalOpen = ref(false);
const isEditOpen = ref(false);
const editingItem = ref(null);
const items = ref([]);
const isLoading = ref(false);
const loadError = ref(null);
const isSubmitting = ref(false);
const total = ref(0);
const pageFrom = ref(0);
const pageTo = ref(0);
const lastPage = ref(1);

// Delete confirmation state
const isConfirmOpen = ref(false)
const pendingDeleteItem = ref(null)
const confirmDeleteMessage = computed(() => {
  const name = pendingDeleteItem.value?.part_number || pendingDeleteItem.value?.partNumber || 'barang ini'
  return `Apakah Anda yakin ingin menghapus barang "${name}"?`
})

// Derived state
// Filtering is client-side within the current page only
const filteredItems = computed(() => {
  let filtered = items.value;
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.stock_code?.toLowerCase().includes(query) ||
        item.part_number?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
    );
  }
  return filtered;
});

const totalItems = computed(() => total.value);
const activeItems = computed(() => total.value);
const totalCategories = computed(() => {
  const categories = new Set(
    items.value.map((item) => item.stock_code?.substring(0, 3))
  );
  return categories.size;
});
const paginatedItems = computed(() => filteredItems.value);

// Actions
const fetchItems = async () => {
  isLoading.value = true;
  loadError.value = null;
  try {
    const response = await getItemList(currentPage.value, itemsPerPage.value);
    // Response shape per backend:
    // { status, message, data: { current_page, data: [...], from, to, total, last_page } }
    const payload = response?.data || {};
    const list = Array.isArray(payload.data) ? payload.data : [];
    // Normalize keys to camelCase used in UI
    items.value = list.map((raw) => ({
      id: raw.id ?? raw._id ?? raw.itemId,
      stock_code: raw.stock_code ?? raw.stockCode,
      part_number: raw.part_number ?? raw.partNumber,
      description: raw.description ?? "",
      createdAt: raw.created_at ?? raw.createdAt,
    }));
    total.value = Number(payload.total || items.value.length);
    pageFrom.value = Number(payload.from || 0);
    pageTo.value = Number(payload.to || items.value.length);
    lastPage.value = Number(payload.last_page || 1);
  } catch (error) {
    console.error(error);
    loadError.value = "Gagal memuat barang.";
  } finally {
    isLoading.value = false;
  }
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

const openAddModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const closeEditModal = () => {
  isEditOpen.value = false;
  editingItem.value = null;
};

const handleModalClose = () => {
  if (isEditOpen.value) {
    closeEditModal();
  } else if (isModalOpen.value) {
    closeModal();
  }
};

const handleItemSubmit = async (itemData, type) => {
  try {
    const payload = {
      id: itemData.id,
      stock_code: itemData.stock_code,
      part_number: itemData.part_number,
      description: itemData.description,
    };
    await createItem(payload);
    if (type === "create") {
      showSuccess("Barang berhasil ditambahkan!");
      currentPage.value = 1;
    } else {
      showSuccess("Barang berhasil diperbarui!");
    }
    await fetchItems();
    return true;
  } catch (error) {
    console.error(error);
    showError("Gagal menambahkan barang.");
    return false;
  }
};

const editItem = (item) => {
  // Pass a shallow copy to avoid mutating the table directly before save
  editingItem.value = { ...item };
  isEditOpen.value = true;
};

const handleModalSubmit = async (data) => {
  isSubmitting.value = true;
  let success = false;
  try {
    if (data && data.id) {
      success = await handleItemSubmit(data, "update");
    } else {
      success = await handleItemSubmit(data, "create");
    }
  } finally {
    isSubmitting.value = false;
  }
  if (success) {
    isModalOpen.value = false;
    isEditOpen.value = false;
  }
};

const deleteItem = (item) => {
  pendingDeleteItem.value = item
  isConfirmOpen.value = true
}

const confirmDelete = async () => {
  if (!pendingDeleteItem.value) return
  const item = pendingDeleteItem.value
  isConfirmOpen.value = false
  try {
    await deleteItemById(item.id ?? item._id ?? item.itemId)
    await fetchItems()
    showSuccess('Barang berhasil dihapus!')
    if (items.value.length === 0 && currentPage.value > 1) {
      currentPage.value = Math.max(1, currentPage.value - 1)
      await fetchItems()
    }
  } catch (error) {
    console.error(error)
    showError('Gagal menghapus barang.')
  } finally {
    pendingDeleteItem.value = null
  }
}

const handlePageChange = async (newPage) => {
  currentPage.value = newPage;
  await fetchItems();
};

// Watchers & lifecycle
watch(searchQuery, () => {
  // Client-side filter within current page
  currentPage.value = 1;
});

onMounted(fetchItems);
</script>

<style scoped>
/* Any additional custom styles if needed */
</style>
