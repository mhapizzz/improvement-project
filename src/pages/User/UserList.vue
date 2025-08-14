<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
      <h2 class="text-2xl font-bold mb-2">User Management</h2>
      <p class="text-purple-100">Manage user accounts and permissions</p>
    </div>

    <!-- Search and Filter Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
          <div class="relative">
            <input
              v-model="searchQuery"
              @input="debounceSearch"
              type="text"
              placeholder="Search by name, email, or department..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <div v-if="loading" class="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
            </div>
          </div>
        </div>

        <!-- Role Filter -->
        <div class="md:w-48">
          <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Role</label>
          <select
            v-model="roleFilter"
            @change="fetchUsers"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">All Roles</option>
            <option value="Administrator">Administrator</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        <!-- Status Filter -->
        <div class="md:w-48">
          <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
          <select
            v-model="statusFilter"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-full">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Users</p>
            <p class="text-2xl font-bold text-purple-600">{{ users.length }}</p>
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
            <p class="text-sm font-medium text-gray-600">Active Users</p>
            <p class="text-2xl font-bold text-green-600">{{ activeUsers }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-full">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Administrators</p>
            <p class="text-2xl font-bold text-blue-600">{{ adminUsers }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-3 bg-orange-100 rounded-full">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 12v-8m0 0V7a4 4 0 118 0v4m-4 8a4 4 0 01-8 0V7a4 4 0 018 0v8z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Inactive Users</p>
            <p class="text-2xl font-bold text-orange-600">{{ inactiveUsers }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-4">
      <button
        @click="openAddUserModal"
        :disabled="loading"
        class="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {{ loading ? 'Loading...' : 'Add New User' }}
      </button>

      <button
        @click="fetchUsers"
        :disabled="loading"
        class="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {{ loading ? 'Refreshing...' : 'Refresh' }}
      </button>

      <button
        @click="exportUsers"
        :disabled="loading || users.length === 0"
        class="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export Users
      </button>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Users</h3>
        <p class="text-sm text-gray-600 mt-1">{{ filteredUsers.length }} users found</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading && users.length === 0" class="p-12 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p class="text-gray-500">Loading users...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading && users.length === 0" class="p-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No users found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new user.</p>
        <div class="mt-6">
          <button
            @click="openAddUserModal"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add User
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                      <span class="text-white font-medium text-sm">{{ getUserInitials(user) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getRoleClass(user.role)">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ user.department }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusClass(user.status)">
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.lastLogin) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="editUser(user)"
                    :disabled="loading"
                    class="text-indigo-600 hover:text-indigo-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Edit
                  </button>
                  <button
                    @click="toggleUserStatus(user)"
                    :disabled="loading"
                    class="text-yellow-600 hover:text-yellow-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ user.status === 'active' ? 'Deactivate' : 'Activate' }}
                  </button>
                  <button
                    @click="deleteUser(user)"
                    :disabled="loading"
                    class="text-red-600 hover:text-red-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between bg-white px-4 py-3 border border-gray-200 sm:px-6 rounded-lg">
      <div class="flex flex-1 justify-between sm:hidden">
        <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous
        </button>
        <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next
        </button>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">{{ filteredUsers.length }}</span> results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </button>
            <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- User Modal -->
    <UserModal
      :isOpen="isUserModalOpen"
      :user="selectedUser"
      @close="closeUserModal"
      @submit="handleUserSubmit"
    />

    <!-- Confirm Delete Modal -->
    <ConfirmModal
      :isOpen="isConfirmOpen"
      title="Delete User"
              :message="`Are you sure you want to delete ${pendingUser?.name}?`"
      confirmText="Delete"
      cancelText="Cancel"
      type="danger"
      @close="isConfirmOpen = false; pendingUser = null"
      @confirm="confirmDeleteUser"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import UserModal from '../../components/UserModal.vue'
import ConfirmModal from '../../components/ConfirmModal.vue'
import { showSuccess, showError } from '../../composables/useSnackbar'
import { userService } from '../../services/userService'

// Reactive data
const searchQuery = ref('')
const roleFilter = ref('')
const statusFilter = ref('')
const isUserModalOpen = ref(false)
const selectedUser = ref(null)
const isConfirmOpen = ref(false)
const pendingUser = ref(null)
const loading = ref(false)
const users = ref([])
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10
})

// Computed properties
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = !searchQuery.value || 
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesRole = !roleFilter.value || user.role === roleFilter.value;
    const matchesStatus = !statusFilter.value || user.status === statusFilter.value;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
});

const activeUsers = computed(() => {
  return users.value.filter(user => user.status === 'active').length;
});

const inactiveUsers = computed(() => {
  return users.value.filter(user => user.status === 'inactive').length;
});

const adminUsers = computed(() => {
  return users.value.filter(user => user.role === 'Administrator').length;
});

// Methods
const getUserInitials = (user) => {
  return `${user.name.charAt(0)}`;
};

const getRoleClass = (role) => {
  const roleClasses = {
    'Administrator': 'bg-red-100 text-red-800',
    'Manager': 'bg-blue-100 text-blue-800',
    'Employee': 'bg-green-100 text-green-800'
  };
  return roleClasses[role] || 'bg-gray-100 text-gray-800';
};

const getStatusClass = (status) => {
  const statusClasses = {
    'active': 'bg-green-100 text-green-800',
    'inactive': 'bg-red-100 text-red-800'
  };
  return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const openAddUserModal = () => {
  selectedUser.value = null;
  isUserModalOpen.value = true;
};

const editUser = (user) => {
  selectedUser.value = { ...user };
  isUserModalOpen.value = true;
};

const closeUserModal = () => {
  isUserModalOpen.value = false;
  selectedUser.value = null;
};

const handleUserSubmit = async (userData) => {
  try {
    // Debug: Log the received user data
    console.log('Received user data in UserList:', userData);
    
    loading.value = true;
    
    if (selectedUser.value) {
      // Update existing user
      await userService.updateUser({ ...userData, id: selectedUser.value.id });
      showSuccess('User updated successfully!');
    } else {
      // Create new user
      await userService.createUser(userData);
      showSuccess('User created successfully!');
    }
    
    // Refresh user list
    await fetchUsers();
    closeUserModal();
  } catch (error) {
    showError(error.message || 'Failed to save user');
  } finally {
    loading.value = false;
  }
};

const toggleUserStatus = (user) => {
  const index = users.value.findIndex(u => u.id === user.id);
  if (index !== -1) {
    users.value[index].status = users.value[index].status === 'active' ? 'inactive' : 'active';
  }
};

const deleteUser = (user) => {
  pendingUser.value = user;
  isConfirmOpen.value = true;
};

const confirmDeleteUser = async () => {
  if (!pendingUser.value) return;
  
  try {
    loading.value = true;
    await userService.deleteUser(pendingUser.value.id);
    showSuccess('User deleted successfully!');
    await fetchUsers();
  } catch (error) {
    showError(error.message || 'Failed to delete user');
  } finally {
    loading.value = false;
    pendingUser.value = null;
    isConfirmOpen.value = false;
  }
};

const exportUsers = () => {
  // Simulate export functionality
  const csvData = users.value.map(user => ({
    Name: user.name,
    Email: user.email,
    Phone: user.phone,
    Department: user.department,
    Role: user.role,
    Status: user.status,
    LastLogin: formatDate(user.lastLogin)
  }));
  
  console.log('Exporting users:', csvData);
  showSuccess('Users exported successfully!');
};

// Debounce function for search
let searchTimeout = null;
const debounceSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    pagination.value.currentPage = 1; // Reset to first page
    fetchUsers();
  }, 500);
};

// API functions
const fetchUsers = async () => {
  try {
    loading.value = true;
    const params = {
      page: pagination.value.currentPage,
      search: searchQuery.value,
      sort_by: '',
      sort_order: ''
    };
    
    const response = await userService.getUsers(params);
    
    // Transform backend response to match frontend structure
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      // Handle paginated response structure
      users.value = response.data.data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department || 'N/A',
        role: user.role || 'User',
        status: user.status || 'active',
        lastLogin: user.last_login || new Date().toISOString(),
        createdAt: user.created_at || new Date().toISOString()
      }));
      
      // Update pagination from backend response
      if (response.data.current_page) {
        pagination.value = {
          ...pagination.value,
          currentPage: response.data.current_page,
          totalItems: response.data.total,
          totalPages: response.data.last_page,
          itemsPerPage: response.data.per_page
        };
      }
    } else if (response.data && Array.isArray(response.data)) {
      // Handle case where response.data is directly an array
      users.value = response.data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department || 'N/A',
        role: user.role || 'User',
        status: user.status || 'active',
        lastLogin: user.last_login || new Date().toISOString(),
        createdAt: user.created_at || new Date().toISOString()
      }));
    } else if (Array.isArray(response)) {
      // Handle case where response is directly an array
      users.value = response.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department || 'N/A',
        role: user.role || 'User',
        status: user.status || 'active',
        lastLogin: user.last_login || new Date().toISOString(),
        createdAt: user.created_at || new Date().toISOString()
      }));
    }
    

  } catch (error) {
    console.error('Error fetching users:', error);
    showError(error.message || 'Failed to fetch users');
    // Set empty array on error to show empty state
    users.value = [];
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchUsers();
});
</script> 
