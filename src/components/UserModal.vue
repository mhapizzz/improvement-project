<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 w-full h-full"
  >
    <div
      class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
    >
      <!-- Modal Header -->
      <div
        class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-lg"
      >
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold">
            {{ isEditing ? "Edit User" : "Add New User" }}
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
        <!-- Personal Information -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- First Name -->
            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >First Name</label
              >
              <input
                v-model="formData.firstName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter First Name"
                required
              />
            </div> -->

            <!-- Last Name -->
            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Last Name</label
              >
              <input
                v-model="formData.lastName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter Last Name"
                required
              />
            </div> -->

            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Name</label
              >
              <input
                v-model="formData.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter Name"
                required
                @input="console.log('Name input changed:', formData.name)"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Email</label
              >
              <input
                v-model="formData.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter Email Address"
                required
              />
            </div>

            <!-- Phone -->
            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Phone</label
              >
              <input
                v-model="formData.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter Phone Number"
              />
            </div> -->
          </div>
        </div>

        <!-- Work Information -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Work Information
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Department -->
            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Department</label
              >
              <select
                v-model="formData.department"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select Department</option>
                <option value="IT">Information Technology</option>
                <option value="Finance">Finance</option>
                <option value="HR">Human Resources</option>
                <option value="Operations">Operations</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Research & Development">
                  Research & Development
                </option>
              </select>
            </div> -->

            <!-- Role -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Role</label
              >
              <select
                v-model="formData.role"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select Role</option>
                <option value="Administrator">Administrator</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            <!-- Employee ID -->
            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Employee ID</label
              >
              <input
                v-model="formData.employeeId"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter Employee ID"
              />
            </div> -->

            <!-- Manager -->
            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Manager</label
              >
              <select
                v-model="formData.managerId"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select Manager</option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
                <option value="3">Alice Williams</option>
              </select>
            </div> -->

            <!-- Start Date -->
            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Start Date</label
              >
              <input
                v-model="formData.startDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div> -->

            <!-- Salary -->
            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Salary</label
              >
              <input
                v-model="formData.salary"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter Salary"
                min="0"
                step="1000"
              />
            </div> -->
          </div>
        </div>

        <!-- Account Settings -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Account Settings
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Password</label
              >
              <input
                v-model="formData.password"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter Password"
                :required="!isEditing"
              />
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Confirm Password</label
              >
              <input
                v-model="formData.confirmPassword"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Confirm Password"
                :required="!isEditing"
              />
            </div>
          </div>
        </div>

        <!-- Permissions -->
        <!-- <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Permissions</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center">
              <input
                v-model="formData.permissions.canViewReports"
                type="checkbox"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-900"
                >Can View Reports</label
              >
            </div>

            <div class="flex items-center">
              <input
                v-model="formData.permissions.canEditInventory"
                type="checkbox"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-900"
                >Can Edit Inventory</label
              >
            </div>

            <div class="flex items-center">
              <input
                v-model="formData.permissions.canManageUsers"
                type="checkbox"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-900"
                >Can Manage Users</label
              >
            </div>

            <div class="flex items-center">
              <input
                v-model="formData.permissions.canExportData"
                type="checkbox"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-900"
                >Can Export Data</label
              >
            </div>
          </div>
        </div> -->

        <!-- Notes -->
        <!-- <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Additional Notes
          </h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Notes</label
            >
            <textarea
              v-model="formData.notes"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Add any additional notes about the user..."
            ></textarea>
          </div>
        </div> -->

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
            :disabled="submitting"
            class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="submitting"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {{
              submitting
                ? "Saving..."
                : isEditing
                ? "Update User"
                : "Create User"
            }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { showError } from "../composables/useSnackbar";

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object,
    default: null,
  },
});

// Emits
const emit = defineEmits(["close", "submit"]);

// Reactive data
const formData = ref({
  // firstName: "",
  // lastName: "",
  name: "",
  email: "",
  // phone: "",
  // department: "",
  role: "",
  // employeeId: "",
  // managerId: "",
  // startDate: "",
  // salary: "",
  password: "",
  confirmPassword: "",
  // permissions: {
  //   canViewReports: false,
  //   canEditInventory: false,
  //   canManageUsers: false,
  //   canExportData: false,
  // },
  // notes: "",
});

const submitting = ref(false);

// Computed properties
const isEditing = computed(() => {
  return props.user !== null;
});

const resetForm = () => {
  formData.value = {
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  };
};

// Methods
const closeModal = () => {
  emit("close");
  resetForm();
};

// Debug: Log form data when modal opens
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    console.log('Modal opened, current formData:', formData.value);
  }
});

const handleSubmit = () => {
  // Validate form
  if (!validateForm()) {
    return;
  }

  // Set submitting state
  submitting.value = true;

  // Debug: Log the form data
  console.log('Form data before submission:', formData.value);

  // Prepare data for emission
  const userData = {
    name: formData.value.name,
    email: formData.value.email,
    role: formData.value.role,
    password: formData.value.password,
  };

  // Debug: Log the user data being emitted
  console.log('User data being emitted:', userData);

  // Emit the data to parent component
  emit("submit", userData);

  // Reset submitting state after a short delay to show the loading state
  setTimeout(() => {
    submitting.value = false;
  }, 1000);
};

const validateForm = () => {
  // Basic validation
  if (
    // !formData.value.firstName ||
    // !formData.value.lastName ||
    !formData.value.name ||
    !formData.value.email ||
    // !formData.value.department ||
    !formData.value.role
  ) {
    showError("Please fill in all required fields.");
    return false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.email)) {
    showError("Please enter a valid email address.");
    return false;
  }

  // Password validation
  if (!formData.value.password || !formData.value.confirmPassword) {
    showError("Please enter and confirm the password.");
    return false;
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    showError("Passwords do not match.");
    return false;
  }

  if (formData.value.password.length < 6) {
    showError("Password must be at least 6 characters long.");
    return false;
  }

  // Salary validation
  if (formData.value.salary && formData.value.salary < 0) {
    showError("Salary cannot be negative.");
    return false;
  }

  return true;
};

// Watch for user changes
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      formData.value = {
        // firstName: newUser.firstName || "",
        // lastName: newUser.lastName || "",
        name: newUser.name || "",
        email: newUser.email || "",
        // phone: newUser.phone || "",
        // department: newUser.department || "",
        role: newUser.role || "",
        // employeeId: newUser.employeeId || "",
        // managerId: newUser.managerId || "",
        // startDate: newUser.startDate || "",
        // salary: newUser.salary || "",
        password: "",
        confirmPassword: "",
        // permissions: {
        //   canViewReports: newUser.permissions?.canViewReports || false,
        //   canEditInventory: newUser.permissions?.canEditInventory || false,
        //   canManageUsers: newUser.permissions?.canManageUsers || false,
        //   canExportData: newUser.permissions?.canExportData || false,
        // },
        // notes: newUser.notes || "",
      };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* Additional styles if needed */
</style>
