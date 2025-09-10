import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode"; // ✅ use named import

export const UseAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || "",
    permissions: JSON.parse(localStorage.getItem("permissions") || "[]")
  }),

  actions: {
    login(token) {
      this.token = token;

      const decoded = jwtDecode(token); // ✅ works now

      // Extract claims
      this.role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";

      this.permissions = decoded["permissions"] || [];

      // Persist
      localStorage.setItem("token", token);
      localStorage.setItem("role", this.role);
      localStorage.setItem("permissions", JSON.stringify(this.permissions));
    },

    logout() {
      this.token = null;
      this.role = "";
      this.permissions = [];
      localStorage.clear();
    },

    hasPermission(permission) {
      return this.permissions.includes(permission);
    },

    hasRole(role) {
      return this.role === role;
    }
  }
});
