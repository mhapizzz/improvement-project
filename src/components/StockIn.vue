<template>
  <div class="stock-in">
    <h2>Stock IN</h2>
    
    <div class="info">
      <p><strong>PO Number</strong> : 1100086756</p>
      <p><strong>SPB Number</strong> : 025/DO/HRS-AGM/VI/2025</p>
      <p><strong>Tanggal</strong> : 10 Mei 2025</p>
      <p><strong>Site</strong> : AGM Blok 4</p>
      <p><strong>Plant</strong> : HRS Site AGM Blok 4</p>
    </div>

    <button @click="scanBarcode" class="scan-button">Scan Barcode</button>

    <table class="stock-table">
      <thead>
        <tr>
          <th>Stock Code</th>
          <th>Part Number</th>
          <th>Description</th>
          <th>Qty</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in stockItems" :key="index">
          <td>{{ item.stockCode }}</td>
          <td>{{ item.partNumber }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.qty }}</td>
        </tr>
      </tbody>
    </table>

    <button @click="addMaterial" class="add-button">ADD MATERIAL +</button>
  </div>
</template>

<script>
export default {
  name: "StockIn",
  data() {
    return {
      stockItems: [
        {
          stockCode: "SP00606599",
          partNumber: "23236859",
          description: "FRONT SPRING FMX400 NO.1",
          qty: 3
        }
      ]
    };
  },
  methods: {
    scanBarcode() {
      alert("Scanning barcode...");
    },
    addMaterial() {
      this.stockItems.push({
        stockCode: "",
        partNumber: "",
        description: "",
        qty: 0
      });
    }
  }
};
</script>

<style scoped>
.stock-in {
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
}
.info p {
  margin: 4px 0;
}
.scan-button, .add-button {
  margin: 16px 0;
  padding: 10px 20px;
  background-color: #f2f2f2;
  border: 1px solid #333;
  cursor: pointer;
}
.stock-table {
  width: 100%;
  border-collapse: collapse;
}
.stock-table th, .stock-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>
