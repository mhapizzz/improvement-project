import { createRouter, createWebHistory } from "vue-router";
import StockInDetail from "../pages/Stock/StockInDetail.vue";
import StockOutDetail from "../pages/Stock/StockOutDetail.vue";
import Dashboard from "../pages/Dashboard.vue";
import StockList from "../pages/Stock/StockList.vue";
import ItemList from "../pages/Item/ItemList.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import UserProfile from "../pages/UserProfile.vue";
import UserList from "../pages/User/UserList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Dashboard },
    { path: "/stock", component: StockList },
    { path: "/stock/in", component: StockInDetail },
    { path: "/stock/out", component: StockOutDetail },
    { path: "/items", component: ItemList },
    { path: "/profile", component: UserProfile },
    { path: "/users", component: UserList },
    
    { path: "/login", component: Login },
    { path: "/register", component: Register },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
