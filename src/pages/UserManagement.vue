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
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, email, or department..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <!-- Role Filter -->
        <div class="md:w-48">
          <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Role</label>
          <select
            v-model="roleFilter"
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
        class="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 font-medium shadow-sm"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add New User
      </button>

      <button
        @click="exportUsers"
        class="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium shadow-sm"
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
                    <div class="text-sm font-medium text-gray-900">{{ user.firstName }} {{ user.lastName }}</div>
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
                    class="text-indigo-600 hover:text-indigo-900 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    @click="toggleUserStatus(user)"
                    class="text-yellow-600 hover:text-yellow-900 transition-colors"
                  >
                    {{ user.status === 'active' ? 'Deactivate' : 'Activate' }}
                  </button>
                  <button
                    @click="deleteUser(user)"
                    class="text-red-600 hover:text-red-900 transition-colors"
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
  </div>
</template>

<script>
import UserModal from '../components/UserModal.vue';

export default {
  name: 'UserManagement',
  components: {
    UserModal
  },
  data() {
    return {
      searchQuery: '',
      roleFilter: '',
      statusFilter: '',
      isUserModalOpen: false,
      selectedUser: null,
      users: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          department: 'IT',
          role: 'Administrator',
          status: 'active',
          lastLogin: '2023-12-01T10:30:00Z',
          createdAt: '2023-01-15T08:00:00Z'
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phone: '+1 (555) 234-5678',
          department: 'Finance',
          role: 'Manager',
          status: 'active',
          lastLogin: '2023-12-01T09:15:00Z',
          createdAt: '2023-02-20T09:00:00Z'
        },
        {
          id: 3,
          firstName: 'Bob',
          lastName: 'Johnson',
          email: 'bob.johnson@example.com',
          phone: '+1 (555) 345-6789',
          department: 'Operations',
          role: 'Employee',
          status: 'inactive',
          lastLogin: '2023-11-28T14:20:00Z',
          createdAt: '2023-03-10T10:00:00Z'
        },
        {
          id: 4,
          firstName: 'Alice',
          lastName: 'Williams',
          email: 'alice.williams@example.com',
          phone: '+1 (555) 456-7890',
          department: 'HR',
          role: 'Manager',
          status: 'active',
          lastLogin: '2023-12-01T11:45:00Z',
          createdAt: '2023-04-05T11:00:00Z'
        },
        {
          id: 5,
          firstName: 'Charlie',
          lastName: 'Brown',
          email: 'charlie.brown@example.com',
          phone: '+1 (555) 567-8901',
          department: 'Sales',
          role: 'Employee',
          status: 'active',
          lastLogin: '2023-11-30T16:30:00Z',
          createdAt: '2023-05-12T12:00:00Z'
        }
      ]
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        const matchesSearch = !this.searchQuery || 
          user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.department.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        const matchesRole = !this.roleFilter || user.role === this.roleFilter;
        const matchesStatus = !this.statusFilter || user.status === this.statusFilter;
        
        return matchesSearch && matchesRole && matchesStatus;
      });
    },
    activeUsers() {
      return this.users.filter(user => user.status === 'active').length;
    },
    inactiveUsers() {
      return this.users.filter(user => user.status === 'inactive').length;
    },
    adminUsers() {
      return this.users.filter(user => user.role === 'Administrator').length;
    }
  },
  methods: {
    getUserInitials(user) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    },
    getRoleClass(role) {
      const roleClasses = {
        'Administrator': 'bg-red-100 text-red-800',
        'Manager': 'bg-blue-100 text-blue-800',
        'Employee': 'bg-green-100 text-green-800'
      };
      return roleClasses[role] || 'bg-gray-100 text-gray-800';
    },
    getStatusClass(status) {
      const statusClasses = {
        'active': 'bg-green-100 text-green-800',
        'inactive': 'bg-red-100 text-red-800'
      };
      return statusClasses[status] || 'bg-gray-100 text-gray-800';
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    openAddUserModal() {
      this.selectedUser = null;
      this.isUserModalOpen = true;
    },
    editUser(user) {
      this.selectedUser = { ...user };
      this.isUserModalOpen = true;
    },
    closeUserModal() {
      this.isUserModalOpen = false;
      this.selectedUser = null;
    },
    handleUserSubmit(userData) {
      if (this.selectedUser) {
        // Update existing user
        const index = this.users.findIndex(u => u.id === this.selectedUser.id);
        if (index !== -1) {
          this.users[index] = { ...userData, id: this.selectedUser.id };
        }
      } else {
        // Add new user
        const newUser = {
          ...userData,
          id: Math.max(...this.users.map(u => u.id)) + 1,
          status: 'active',
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString()
        };
        this.users.push(newUser);
      }
      this.closeUserModal();
    },
    toggleUserStatus(user) {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.users[index].status = this.users[index].status === 'active' ? 'inactive' : 'active';
      }
    },
    deleteUser(user) {
      if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
      }
    },
    exportUsers() {
      // Simulate export functionality
      const csvData = this.users.map(user => ({
        Name: `${user.firstName} ${user.lastName}`,
        Email: user.email,
        Phone: user.phone,
        Department: user.department,
        Role: user.role,
        Status: user.status,
        LastLogin: this.formatDate(user.lastLogin)
      }));
      
      console.log('Exporting users:', csvData);
      alert('Users exported successfully!');
    }
  }
};
</script> 
