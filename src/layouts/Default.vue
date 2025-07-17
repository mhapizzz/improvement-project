<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile sidebar overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <div
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <div
        class="flex items-center justify-between h-16 px-4 border-b border-gray-200"
      >
        <h2 class="text-xl font-semibold text-gray-800">Menu</h2>
        <button
          @click="sidebarOpen = false"
          class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span class="sr-only">Close sidebar</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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

      <nav class="mt-8">
        <div class="px-2 space-y-1">
          <router-link
            to="/"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            :class="{ 'bg-gray-100 text-gray-900': $route.path === '/' }"
            @click="closeSidebarOnMobile"
          >
            <svg
              class="mr-3 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
              />
            </svg>
            Dashboard
          </router-link>

          <router-link
            to="/stock/in"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            :class="{
              'bg-gray-100 text-gray-900': $route.path === '/stock/in',
            }"
            @click="closeSidebarOnMobile"
          >
            <svg
              class="mr-3 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
            Stock In
          </router-link>

          <router-link
            to="/stock/out"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            :class="{
              'bg-gray-100 text-gray-900': $route.path === '/stock/out',
            }"
            @click="closeSidebarOnMobile"
          >
            <svg
              class="mr-3 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Stock Out
          </router-link>
        </div>
      </nav>
    </div>

    <!-- Main content -->
    <div class="lg:pl-64">
      <!-- Top navbar -->
      <div
        class="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200"
      >
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <button
                @click="sidebarOpen = true"
                class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 class="ml-4 text-2xl font-semibold text-gray-900 lg:ml-0">
                {{ pageTitle }}
              </h1>
            </div>

            <div class="flex items-center space-x-4">
              <!-- You can add user profile, notifications, etc. here -->
              <div class="relative">
                <button
                  class="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span class="sr-only">View notifications</span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="py-6">
        <div class="px-4 sm:px-6 lg:px-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "DefaultLayout",
  setup() {
    const route = useRoute();
    const sidebarOpen = ref(false);

    const pageTitle = computed(() => {
      const titles = {
        "/": "Dashboard",
        "/stock/in": "Stock In",
        "/stock/out": "Stock Out",
      };
      return titles[route.path] || "Dashboard";
    });

    const closeSidebarOnMobile = () => {
      if (window.innerWidth < 1024) {
        sidebarOpen.value = false;
      }
    };

    return {
      sidebarOpen,
      pageTitle,
      closeSidebarOnMobile,
    };
  },
};
</script>

<style scoped>
/* Additional mobile-specific styles if needed */
@media (max-width: 640px) {
  /* Ensure touch targets are at least 44px */
  .group {
    min-height: 44px;
  }
}
</style>
