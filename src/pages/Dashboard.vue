<template>
  <div class="space-y-6">
    <!-- Test Element -->
    <div class="p-4 bg-red-500 text-white rounded-lg">
      TAILWIND TEST: If this has red background, padding, and white text, Tailwind is working!
    </div>
    
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
      <h2 class="text-2xl font-bold mb-2">Welcome back!</h2>
      <p class="text-indigo-100">Here's what's happening with your inventory today.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Stock</p>
            <p class="text-2xl font-bold text-gray-900">1,234</p>
          </div>
        </div>
        <div class="mt-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            +12%
          </span>
          <span class="text-gray-500 text-sm ml-2">from last month</span>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Stock In</p>
            <p class="text-2xl font-bold text-gray-900">89</p>
          </div>
        </div>
        <div class="mt-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            +8%
          </span>
          <span class="text-gray-500 text-sm ml-2">from last week</span>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Stock Out</p>
            <p class="text-2xl font-bold text-gray-900">67</p>
          </div>
        </div>
        <div class="mt-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            -3%
          </span>
          <span class="text-gray-500 text-sm ml-2">from last week</span>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending</p>
            <p class="text-2xl font-bold text-gray-900">23</p>
          </div>
        </div>
        <div class="mt-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            +5%
          </span>
          <span class="text-gray-500 text-sm ml-2">from yesterday</span>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Quick Actions -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <router-link
              to="/stock/in"
              class="group flex items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-all duration-200"
            >
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 group-hover:text-green-700">Stock In</h4>
                <p class="text-sm text-gray-600">Add new inventory</p>
              </div>
            </router-link>

            <router-link
              to="/stock/out"
              class="group flex items-center p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-all duration-200"
            >
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 group-hover:text-red-700">Stock Out</h4>
                <p class="text-sm text-gray-600">Remove inventory</p>
              </div>
            </router-link>

            <button class="group flex items-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-200">
              <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-indigo-200 transition-colors">
                <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 group-hover:text-indigo-700">Reports</h4>
                <p class="text-sm text-gray-600">View analytics</p>
              </div>
            </button>

            <button class="group flex items-center p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-all duration-200">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 group-hover:text-purple-700">Settings</h4>
                <p class="text-sm text-gray-600">Configure system</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div class="space-y-4">
          <div class="flex items-start space-x-3">
            <div class="w-3 h-3 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">Stock In: Laptop</p>
              <p class="text-xs text-gray-500 mt-1">Added 5 units • 2 hours ago</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-3 h-3 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">Stock Out: Mouse</p>
              <p class="text-xs text-gray-500 mt-1">Removed 3 units • 4 hours ago</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-3 h-3 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">New Product: Keyboard</p>
              <p class="text-xs text-gray-500 mt-1">Added to inventory • 6 hours ago</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-3 h-3 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">Low Stock Alert</p>
              <p class="text-xs text-gray-500 mt-1">Monitor stock level • 8 hours ago</p>
            </div>
          </div>
        </div>
        <button class="w-full mt-6 text-sm text-indigo-600 hover:text-indigo-800 font-medium py-2 px-4 border border-transparent rounded-md hover:bg-indigo-50 transition-colors">
          View all activity
        </button>
      </div>
    </div>

    <!-- Charts and Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Stock Movement Chart -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Stock Movement</h3>
          <div class="flex items-center space-x-2">
            <span class="w-3 h-3 bg-green-500 rounded-full"></span>
            <span class="text-sm text-gray-600">In</span>
            <span class="w-3 h-3 bg-red-500 rounded-full ml-4"></span>
            <span class="text-sm text-gray-600">Out</span>
          </div>
        </div>
        <div class="h-64 flex items-end justify-between space-x-2">
          <div class="flex-1 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-md" style="height: 60%"></div>
          <div class="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-md" style="height: 80%"></div>
          <div class="flex-1 bg-gradient-to-t from-red-500 to-red-400 rounded-t-md" style="height: 45%"></div>
          <div class="flex-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-md" style="height: 70%"></div>
          <div class="flex-1 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-md" style="height: 55%"></div>
          <div class="flex-1 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-md" style="height: 90%"></div>
          <div class="flex-1 bg-gradient-to-t from-gray-500 to-gray-400 rounded-t-md" style="height: 40%"></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 mt-3">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      <!-- Top Products -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Top Products</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">Laptops</p>
                <p class="text-sm text-gray-500">Electronics</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">156 units</p>
              <p class="text-sm text-green-600">+12%</p>
            </div>
          </div>

          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">Monitors</p>
                <p class="text-sm text-gray-500">Electronics</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">89 units</p>
              <p class="text-sm text-green-600">+8%</p>
            </div>
          </div>

          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">Keyboards</p>
                <p class="text-sm text-gray-500">Accessories</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">234 units</p>
              <p class="text-sm text-red-600">-3%</p>
            </div>
          </div>

          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 7l3-3m0 0h-3m3 0v3" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">Mice</p>
                <p class="text-sm text-gray-500">Accessories</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">167 units</p>
              <p class="text-sm text-green-600">+15%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      // Add reactive data here if needed
    }
  },
  mounted() {
    // Add any initialization logic here
  },
  methods: {
    // Add methods here if needed
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
