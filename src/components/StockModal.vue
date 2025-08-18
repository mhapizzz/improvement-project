<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div
      class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
    >
      <!-- Modal Header -->
      <div
        class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg"
      >
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold">
            {{ isEditing ? "Ubah" : "Baru" }}
            {{ type === "in" ? "Stok Masuk" : "Stok Keluar" }}
          </h2>
          <button
            @click="closeModal"
            class="text-white hover:text-gray-200 transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        <!-- Header Information -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Informasi Transaksi
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- PO Number (only for Stock IN) -->
            <div v-if="type === 'in'">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nomor PO</label
              >
              <input
                v-model="formData.poNumber"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan Nomor PO"
                required
              />
            </div>

            <!-- SPB Number (only for Stock IN) -->
            <div v-if="type === 'in'">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nomor SPB</label
              >
              <input
                v-model="formData.spbNumber"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan Nomor SPB"
                required
              />
            </div>

            <!-- Reservation Number (only for Stock OUT) -->
            <div v-if="type === 'out'">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nomor Reservasi</label
              >
              <input
                v-model="formData.reservationNumber"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan Nomor Reservasi"
                required
              />
            </div>

            <!-- Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Tanggal</label
              >
              <input
                v-model="formData.date"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <!-- Site -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Lokasi</label
              >
              <input
                v-model="formData.site"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan Lokasi"
                disabled
                required
              />
            </div>

            <!-- Plant -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Pabrik</label
              >
              <input
                v-model="formData.plant"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan Pabrik"
                disabled
                required
              />
            </div>

            <!-- Sender (only for Stock IN) -->
            <div v-if="type === 'in'">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Pengirim</label
              >
              <input
                v-model="formData.sender"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan Nama Pengirim"
                required
              />
            </div>

            <!-- Recipient (only for Stock OUT) -->
            <div v-if="type === 'out'">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Penerima</label
              >
              <input
                v-model="formData.recipient"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan Nama Penerima"
                required
              />
            </div>
          </div>
        </div>

        <!-- Items Section -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Barang</h3>
            <button
              type="button"
              @click="addItem"
              class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              <svg
                class="w-4 h-4 mr-2"
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
              Tambah Barang
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
                <h4 class="text-sm font-medium text-gray-700">
                  Barang {{ index + 1 }}
                </h4>
                <button
                  type="button"
                  @click="removeItem(index)"
                  class="text-red-600 hover:text-red-800 transition-colors"
                  :disabled="formData.items.length === 1"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Item Selection -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Pilih Barang</label
                  >
                  <select
                    v-model="item.item_id"
                    @change="onItemChange(index)"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    :disabled="isLoadingItems"
                  >
                    <option value="">Pilih barang</option>
                    <option v-if="isLoadingItems" value="" disabled>
                      Memuat barang...
                    </option>
                    <option
                      v-else
                      v-for="availableItem in availableItems"
                      :key="availableItem.id"
                      :value="availableItem.id"
                    >
                      {{ availableItem.description }}
                    </option>
                  </select>
                </div>

                <!-- Stock Code (Read-only) -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Kode Stok</label
                  >
                  <div
                    v-if="isLoadingItems"
                    class="h-10 bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                  <input
                    v-else
                    :value="getItemDetails(item.item_id)?.stock_code || ''"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                    readonly
                  />
                </div>

                <!-- Part Number (Read-only) -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Part Number</label
                  >
                  <input
                    :value="getItemDetails(item.item_id)?.part_number || ''"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                    readonly
                  />
                </div>

                <!-- Description (Read-only) -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Deskripsi</label
                  >
                  <input
                    :value="getItemDetails(item.item_id)?.description || ''"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                    readonly
                  />
                </div>

                <!-- Quantity -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Jumlah</label
                  >
                  <input
                    v-model.number="item.qty"
                    type="number"
                    min="1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan Jumlah"
                    required
                  />
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
            Batal
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isEditing ? "Memperbarui..." : "Menyimpan..." }}
            </span>
            <span v-else>{{
              isEditing ? "Perbarui Transaksi" : "Simpan Transaksi"
            }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref, onMounted } from "vue";
import { showError, showSuccess } from "../composables/useSnackbar";
import { getItemList } from "../services/itemService";
import {
  createStockTransaction,
  updateStockTransaction,
} from "../services/stockService";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "in", // 'in' or 'out'
    validator: (value) => ["in", "out"].includes(value),
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  transactionData: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "submit"]);

// State
const isSubmitting = ref(false);
const availableItems = ref([]);
const isLoadingItems = ref(false);

const formData = reactive({
  _id: "", // Add _id field for updates
  poNumber: "",
  spbNumber: "",
  reservationNumber: "",
  date: "",
  site: "AGM Blok 4",
  plant: "30G3",
  sender: "", // Only for stock in
  recipient: "", // Only for stock out
  items: [
    {
      item_id: "",
      qty: 1,
    },
  ],
});

// Methods
const fetchAvailableItems = async () => {
  isLoadingItems.value = true;
  try {
    const response = await getItemList(1, 1000); // Get all items for selection
    const payload = response?.data || {};
    const list = Array.isArray(payload.data) ? payload.data : [];

    availableItems.value = list.map((raw) => ({
      id: raw.id,
      stock_code: raw.stock_code || raw.stockCode,
      part_number: raw.part_number || raw.partNumber,
      description: raw.description || "",
    }));
  } catch (error) {
    console.error("Failed to fetch items:", error);
    showError("Gagal memuat daftar barang");
  } finally {
    isLoadingItems.value = false;
  }
};

const getItemDetails = (itemId) => {
  return availableItems.value.find((item) => item.id === itemId);
};

const onItemChange = (index) => {
  // Reset quantity when item changes
  formData.items[index].qty = 1;
};

const addItem = () => {
  formData.items.push({
    item_id: "",
    qty: 1,
  });
};

const removeItem = (index) => {
  if (formData.items.length > 1) {
    formData.items.splice(index, 1);
  }
};

const closeModal = () => {
  emit("close");
  resetForm();
};

const resetForm = () => {
  formData._id = "";
  formData.poNumber = "";
  formData.spbNumber = "";
  formData.reservationNumber = "";
  formData.date = "";
  formData.site = "AGM Blok 4";
  formData.plant = "30G3";
  formData.sender = "";
  formData.recipient = "";
  formData.items = [
    {
      item_id: "",
      qty: 1,
    },
  ];
};

const populateFormForEdit = (transaction) => {
  if (!transaction) return;

  console.log("Populating form for edit with transaction:", transaction);

  // Ensure we have the _id for updates
  formData._id = transaction._id || transaction.id;
  console.log("Setting _id to:", formData._id);

  formData.date = formatDateForForm(transaction.date);
  formData.site = transaction.site || "";
  formData.plant = transaction.plant || "";

  if (props.type === "in") {
    formData.poNumber = transaction.po_number || "";
    formData.spbNumber = transaction.spb_number || "";
    formData.sender = transaction.sender || "";
  } else {
    formData.reservationNumber = transaction.reservation_number || "";
    formData.recipient = transaction.recipient || "";
  }

  // Handle items - you might need to adjust this based on your API response structure
  if (
    transaction.transaction_stock_items &&
    Array.isArray(transaction.transaction_stock_items)
  ) {
    formData.items = transaction.transaction_stock_items.map((item) => ({
      item_id: item.item_id || item.id || item.itemId,
      qty: item.qty || item.quantity || item.qty || 1,
    }));
  } else if (
    transaction.transaction_items &&
    Array.isArray(transaction.transaction_items)
  ) {
    // Alternative field name for items
    formData.items = transaction.transaction_items.map((item) => ({
      item_id: item.item_id || item.id || item.itemId,
      qty: item.qty || item.quantity || item.qty || 1,
    }));
  } else {
    // If no items, set default empty item
    formData.items = [
      {
        item_id: "",
        qty: 1,
      },
    ];
  }
};

const formatDateForForm = (dateString) => {
  if (!dateString) return "";
  // Convert backend date format to YYYY-MM-DD for input[type="date"]
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

const handleSubmit = async () => {
  // Validate form
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    // Prepare payload based on transaction type
    const payload = {
      type: props.type,
      date: formatDateForAPI(formData.date),
      site: formData.site,
      plant: formData.plant,
      items: formData.items.map((item) => ({
        item_id: item.item_id,
        qty: item.qty,
      })),
    };

    // Add type-specific fields
    if (props.type === "in") {
      payload.po_number = formData.poNumber;
      payload.spb_number = formData.spbNumber;
      payload.sender = formData.sender;
    } else {
      payload.reservation_number = formData.reservationNumber;
      payload.recipient = formData.recipient;
    }

    let response;
    if (props.isEditing) {
      // For updates, include the _id field
      payload.id = formData._id;
      console.log("Updating transaction with payload:", payload);
      console.log("_id being sent:", payload.id);
      response = await updateStockTransaction(payload);
      showSuccess(
        `${props.type === "in" ? "Transaksi Stok Masuk" : "Transaksi Stok Keluar"} berhasil diperbarui!`
      );
    } else {
      // For creates
      console.log("Creating transaction with payload:", payload);
      response = await createStockTransaction(payload);
      showSuccess(
        `${props.type === "in" ? "Transaksi Stok Masuk" : "Transaksi Stok Keluar"} berhasil dibuat!`
      );
    }

    // Emit success to parent component
    emit("submit", payload);

    // Close modal and reset form
    closeModal();
  } catch (error) {
    console.error("Failed to save transaction:", error);
    showError(
      props.isEditing
        ? "Gagal memperbarui transaksi. Silakan coba lagi."
        : "Gagal membuat transaksi. Silakan coba lagi."
    );
  } finally {
    isSubmitting.value = false;
  }
};

const formatDateForAPI = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Return original if invalid

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const validateForm = () => {
  // Basic validation
  if (!formData.date || !formData.site || !formData.plant) {
    showError(
      "Harap isi semua kolom yang wajib di bagian informasi transaksi."
    );
    return false;
  }

  if (props.type === "in") {
    if (!formData.poNumber || !formData.spbNumber || !formData.sender) {
      showError("Harap isi semua kolom yang wajib untuk transaksi Stok Masuk.");
      return false;
    }
  } else {
    if (!formData.reservationNumber || !formData.recipient) {
      showError(
        "Harap isi semua kolom yang wajib untuk transaksi Stok Keluar."
      );
      return false;
    }
  }

  // Validate items
  for (let i = 0; i < formData.items.length; i++) {
    const item = formData.items[i];
    if (!item.item_id || !item.qty) {
      showError(`Harap lengkapi semua kolom untuk barang ${i + 1}.`);
      return false;
    }
    if (item.qty <= 0) {
      showError(`Jumlah untuk barang ${i + 1} harus lebih dari 0.`);
      return false;
    }
  }

  return true;
};

// Watchers
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      if (props.isEditing && props.transactionData) {
        // Populate form for editing
        populateFormForEdit(props.transactionData);
      } else {
        // Set default date to today for new transactions
        formData.date = new Date().toISOString().split("T")[0];
      }
      // Fetch available items when modal opens
      fetchAvailableItems();
    }
  }
);

// Lifecycle
onMounted(() => {
  fetchAvailableItems();
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
