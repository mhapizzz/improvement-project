<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Login/Register pages without layout -->
    <div v-if="isAuthPage">
      <router-view />
    </div>

    <!-- Main app with layout -->
    <div v-else>
      <!-- Mobile sidebar overlay -->
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 lg:hidden"
        @click="sidebarOpen = false"
        style="transition: none !important"
      >
        <div
          class="fixed inset-0 bg-black bg-opacity-50"
          style="transition: none !important"
        ></div>
      </div>

      <div class="flex">
        <!-- Sidebar -->
        <div
          class="sidebar min-h-screen bg-white shadow-xl w-80 lg:w-64 fixed inset-y-0 left-0 z-50 lg:z-auto lg:shadow-lg"
          :style="{
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
          }"
        >
          <!-- Sidebar header -->
          <div
            class="flex items-center justify-center h-32 px-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 relative"
          >
            <h2 class="text-xl font-bold text-white">Inventory</h2>
            <button
              @click="sidebarOpen = false"
              class="absolute top-2 right-2 lg:hidden p-2 rounded-md text-white hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors"
            >
              <span class="sr-only">Tutup sidebar</span>
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

          <!-- Navigation -->
          <div
            class="w-full h-full"
            style="
              padding-left: 0.5rem;
              padding-right: 0.5rem;
              padding-top: 0.5rem;
            "
          >
            <router-link
              to="/"
              class="flex items-center gap-4 h-12 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-700"
              :class="{
                'bg-indigo-100 text-indigo-700 shadow-sm': $route.path === '/',
              }"
              style="padding: 0 1rem"
              @click="closeSidebarOnMobile"
            >
              <svg
                class="h-5 w-5 text-indigo-500"
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
              to="/items"
              class="flex items-center gap-4 h-12 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-700"
              :class="{
                'bg-indigo-100 text-indigo-700 shadow-sm':
                  $route.path === '/items',
              }"
              style="padding: 0 1rem"
              @click="closeSidebarOnMobile"
            >
              <svg
                class="h-5 w-5 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Item
            </router-link>

            <router-link
              to="/stock"
              class="flex items-center gap-4 h-12 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-700"
              :class="{
                'bg-indigo-100 text-indigo-700 shadow-sm':
                  $route.path === '/stock',
              }"
              style="padding: 0 1rem"
              @click="closeSidebarOnMobile"
            >
              <svg
                class="h-5 w-5 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              List Transaksi
            </router-link>

            <router-link
              to="/soh"
              class="flex items-center gap-4 h-12 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-green-50 hover:text-green-700"
              :class="{
                'bg-green-100 text-green-700 shadow-sm': $route.path === '/soh',
              }"
              style="padding: 0 1rem"
              @click="closeSidebarOnMobile"
            >
              <svg
                class="h-5 w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Stock On Hand
            </router-link>

            <!-- <router-link
            to="/stock/in"
            class="flex items-center gap-4 h-12 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-green-50 hover:text-green-700"
            :class="{
              'bg-green-100 text-green-700 shadow-sm':
                $route.path === '/stock/in',
            }"
            style="padding: 0 1rem"
            @click="closeSidebarOnMobile"
          >
            <svg
              class="mr-3 h-5 w-5 text-green-500"
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
            class="flex items-center gap-4 h-12 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-red-50 hover:text-red-700"
            :class="{
              'bg-red-100 text-red-700 shadow-sm': $route.path === '/stock/out',
            }"
            style="padding: 0 1rem"
            @click="closeSidebarOnMobile"
          >
            <svg
              class="mr-3 h-5 w-5 text-red-500"
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
          </router-link> -->

            <router-link
              to="/users"
              class="flex items-center gap-4 h-12 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-purple-50 hover:text-purple-700"
              :class="{
                'bg-purple-100 text-purple-700 shadow-sm':
                  $route.path === '/users',
              }"
              style="padding: 0 1rem"
              @click="closeSidebarOnMobile"
            >
              <svg
                class="h-5 w-5 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              User Management
            </router-link>
          </div>

          <!-- Sidebar footer -->
          <!-- <div class="p-4 border-t border-gray-200">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center"
              >
                <span class="text-white font-medium text-sm">U</span>
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-700">User</p>
              <p class="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div> -->
        </div>

        <!-- Main content -->
        <div class="flex-1 flex flex-col min-w-0 lg:ml-64">
          <!-- Top header -->
          <header
            class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"
            style="padding: 0 1rem"
          >
            <div class="px-4 sm:px-6 lg:px-8">
              <div class="flex items-center justify-between h-16">
                <div class="flex items-center gap-4">
                  <button
                    @click="sidebarOpen = true"
                    class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
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
                  <h1 class="ml-4 text-2xl font-bold text-gray-900 lg:ml-0">
                    {{ pageTitle }}
                  </h1>
                </div>

                <div class="flex items-center space-x-4">
                  <!-- Profile menu -->
                  <div class="relative">
                    <router-link
                      to="/profile"
                      class="flex items-center p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                      <span class="sr-only">User profile</span>
                      <div
                        class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center"
                      >
                        <span class="text-white font-medium text-sm">U</span>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <!-- Main content area -->
          <main class="flex-1 overflow-y-auto">
            <div class="p-4 sm:p-6 lg:p-8">
              <router-view />
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
  <!-- Global snackbar -->
  <AppSnackbar />
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import AppSnackbar from "./components/AppSnackbar.vue";

export default {
  name: "App",
  components: { AppSnackbar },
  setup() {
    const route = useRoute();
    const sidebarOpen = ref(false);

    const pageTitle = computed(() => {
      const routeToTitle = {
        "/": "Dashboard",
        "/stock": "List Transaksi",
        "/stock/in": "Stock In",
        "/stock/out": "Stock Out",
        "/soh": "Stock On Hand",
        "/items": "Item",
        "/profile": "User Profile",
        "/users": "User Management",
      };
      return routeToTitle[route.path] || "Dashboard";
    });

    const isAuthPage = computed(() => {
      return route.path === "/login" || route.path === "/register";
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
      isAuthPage,
    };
  },
};
</script>

<style>
@import "./assets/css/main.css";

/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  background-color: #f9fafb;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Mobile-specific styles */
@media (max-width: 1023px) {
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.05);
    z-index: 99;
  }
}

/* Desktop sidebar - disable transform */
@media (min-width: 1024px) {
  .sidebar {
    transform: none !important;
    transition: none !important;
  }
}

/* Smooth transitions */
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Focus states for accessibility */
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
    calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000);
}
</style>
