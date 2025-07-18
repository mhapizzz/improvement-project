<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
      <h2 class="text-2xl font-bold mb-2">User Profile</h2>
      <p class="text-indigo-100">Manage your personal information and account settings</p>
    </div>

    <!-- Profile Information -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center mb-8">
        <div class="relative">
          <div class="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-3xl">{{ userInitials }}</span>
          </div>
          <button class="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        <div class="ml-6">
          <h3 class="text-2xl font-bold text-gray-900">{{ profileData.firstName }} {{ profileData.lastName }}</h3>
          <p class="text-gray-600">{{ profileData.email }}</p>
          <p class="text-sm text-gray-500 mt-1">{{ profileData.role }}</p>
        </div>
      </div>

      <form @submit.prevent="updateProfile">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- First Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              v-model="profileData.firstName"
              type="text"
              :disabled="!isEditing"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              required
            />
          </div>

          <!-- Last Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              v-model="profileData.lastName"
              type="text"
              :disabled="!isEditing"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              required
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              v-model="profileData.email"
              type="email"
              :disabled="!isEditing"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              required
            />
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              v-model="profileData.phone"
              type="tel"
              :disabled="!isEditing"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <!-- Department -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              v-model="profileData.department"
              :disabled="!isEditing"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="Operations">Operations</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <!-- Role (Read-only) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <input
              v-model="profileData.role"
              type="text"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
        </div>

        <!-- Bio -->
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            v-model="profileData.bio"
            :disabled="!isEditing"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button
            v-if="!isEditing"
            type="button"
            @click="startEditing"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Edit Profile
          </button>
          
          <template v-else>
            <button
              type="button"
              @click="cancelEditing"
              class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              Save Changes
            </button>
          </template>
        </div>
      </form>
    </div>

    <!-- Password Change Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
      
      <form @submit.prevent="changePassword">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Current Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              v-model="passwordData.currentPassword"
              type="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- New Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              v-model="passwordData.newPassword"
              type="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <!-- Confirm New Password -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              v-model="passwordData.confirmPassword"
              type="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button
            type="submit"
            class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      isEditing: false,
      profileData: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        department: 'IT',
        role: 'Administrator',
        bio: 'Experienced IT professional with over 10 years in system administration and inventory management.'
      },
      originalProfileData: {},
      passwordData: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    };
  },
  computed: {
    userInitials() {
      return `${this.profileData.firstName.charAt(0)}${this.profileData.lastName.charAt(0)}`;
    }
  },
  methods: {
    startEditing() {
      this.isEditing = true;
      this.originalProfileData = { ...this.profileData };
    },
    cancelEditing() {
      this.isEditing = false;
      this.profileData = { ...this.originalProfileData };
    },
    updateProfile() {
      // Simulate API call
      setTimeout(() => {
        this.isEditing = false;
        this.showSuccessMessage('Profile updated successfully!');
      }, 500);
    },
    changePassword() {
      // Validate passwords match
      if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
        this.showErrorMessage('New passwords do not match!');
        return;
      }

      // Simulate API call
      setTimeout(() => {
        this.passwordData = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
        this.showSuccessMessage('Password changed successfully!');
      }, 500);
    },
    showSuccessMessage(message) {
      // You can integrate with a toast notification library
      alert(message);
    },
    showErrorMessage(message) {
      // You can integrate with a toast notification library
      alert(message);
    }
  }
};
</script> 
