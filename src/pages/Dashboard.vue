<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div
      class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white"
    >
      <h2 class="text-2xl font-bold mb-2">Selamat datang kembali!</h2>
      <p class="text-indigo-100">
        Berikut adalah yang terjadi dengan inventaris Anda hari ini.
      </p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-indigo-600"
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
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Stok</p>
            <p class="text-2xl font-bold text-gray-900">1,234</p>
          </div>
        </div>
        <div class="mt-4">
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
          >
            +12%
          </span>
          <span class="text-gray-500 text-sm ml-2">dari bulan lalu</span>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
            >
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
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Stok Masuk</p>
            <p class="text-2xl font-bold text-gray-900">89</p>
          </div>
        </div>
        <div class="mt-4">
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
          >
            +8%
          </span>
          <span class="text-gray-500 text-sm ml-2">dari minggu lalu</span>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center"
            >
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
                  d="M17 13l-5 5m0 0l-5-5m5 5V6"
                />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Stok Keluar</p>
            <p class="text-2xl font-bold text-gray-900">67</p>
          </div>
        </div>
        <div class="mt-4">
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
          >
            -3%
          </span>
          <span class="text-gray-500 text-sm ml-2">dari minggu lalu</span>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Tertunda</p>
            <p class="text-2xl font-bold text-gray-900">23</p>
          </div>
        </div>
        <div class="mt-4">
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
          >
            +5%
          </span>
          <span class="text-gray-500 text-sm ml-2">dari kemarin</span>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Quick Actions -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">
            Aksi Cepat
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <router-link
              to="/stock/in"
              class="group flex items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-all duration-200"
            >
              <div
                class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors"
              >
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div>
                <h4
                  class="font-semibold text-gray-900 group-hover:text-green-700"
                >
                  Stok Masuk
                </h4>
                <p class="text-sm text-gray-600">Tambah inventaris baru</p>
              </div>
            </router-link>

            <router-link
              to="/stock/out"
              class="group flex items-center p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-all duration-200"
            >
              <div
                class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors"
              >
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
                    d="M20 12H4"
                  />
                </svg>
              </div>
              <div>
                <h4
                  class="font-semibold text-gray-900 group-hover:text-red-700"
                >
                  Stok Keluar
                </h4>
                <p class="text-sm text-gray-600">Kurangi inventaris</p>
              </div>
            </router-link>

            <router-link
              to="/soh"
              class="group flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
            >
              <div
                class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors"
              >
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
              <div>
                <h4
                  class="font-semibold text-gray-900 group-hover:text-blue-700"
                >
                  Stok Tersedia
                </h4>
                <p class="text-sm text-gray-600">Lihat inventaris saat ini</p>
              </div>
            </router-link>

            <!-- <button class="group flex items-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-200">
              <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-indigo-200 transition-colors">
                <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 group-hover:text-indigo-700">Laporan</h4>
                <p class="text-sm text-gray-600">Lihat analitik</p>
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
                <h4 class="font-semibold text-gray-900 group-hover:text-purple-700">Pengaturan</h4>
                <p class="text-sm text-gray-600">Konfigurasi sistem</p>
              </div>
            </button> -->
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <!-- <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">
          Aktivitas Terbaru
        </h3>
        <div class="space-y-4">
          <div class="flex items-start space-x-3">
            <div
              class="w-3 h-3 bg-green-500 rounded-full mt-1.5 flex-shrink-0"
            ></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">Stok Masuk: Laptop</p>
              <p class="text-xs text-gray-500 mt-1">
                Ditambahkan 5 unit • 2 jam yang lalu
              </p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div
              class="w-3 h-3 bg-red-500 rounded-full mt-1.5 flex-shrink-0"
            ></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">Stok Keluar: Mouse</p>
              <p class="text-xs text-gray-500 mt-1">
                Dihapus 3 unit • 4 jam yang lalu
              </p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div
              class="w-3 h-3 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"
            ></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">
                Produk Baru: Keyboard
              </p>
              <p class="text-xs text-gray-500 mt-1">
                Ditambahkan ke inventaris • 6 jam yang lalu
              </p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div
              class="w-3 h-3 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"
            ></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">Peringatan Stok Menipis</p>
              <p class="text-xs text-gray-500 mt-1">
                Pantau tingkat stok • 8 jam yang lalu
              </p>
            </div>
          </div>
        </div>
        <button
          class="w-full mt-6 text-sm text-indigo-600 hover:text-indigo-800 font-medium py-2 px-4 border border-transparent rounded-md hover:bg-indigo-50 transition-colors"
        >
          Lihat semua aktivitas
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      // Add reactive data here if needed
    };
  },
  mounted() {
    // Add any initialization logic here
  },
  methods: {
    // Add methods here if needed
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
