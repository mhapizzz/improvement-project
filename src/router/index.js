import { createRouter, createWebHistory } from "vue-router";
import StockIn from "../pages/Stock/StockIn.vue";
import StockOut from "../pages/Stock/StockOut.vue";
import Dashboard from "../pages/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Dashboard },
    { path: "/stock/in", component: StockIn },
    { path: "/stock/out", component: StockOut },
  ],
});

export default router;
