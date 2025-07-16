<template>
  <div class="container">
    <div class="button-group">
      <button @click="page = 'in'">Stock IN</button>
      <button @click="page = 'out'">Stock OUT</button>
    </div>

    <StockIn v-if="page === 'in'" />
    <StockOut v-else-if="page === 'out'" />
  </div>
</template>


<script>
import StockIn from './components/StockIn.vue'
import StockOut from './components/StockOut.vue'

export default {
  components: {
    StockIn,
    StockOut
  },
  data() {
    return {
      page: 'in'
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh; 
}

.button-group {
  display: flex;
  gap: 10px; 
  margin-bottom: 20px;
}

button {
  padding: -10px 10px;
  font-size: 12px;
}
</style>
