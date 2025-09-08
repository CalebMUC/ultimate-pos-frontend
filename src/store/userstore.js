import { defineStore } from "pinia";
import axios, {apiClient} from "../axios";

export const useUserStore = defineStore("userstore", {
  state: () => ({
    allDetails: null,
    users: [],
    cashiers : [],
    userDetails: null,

    token: "",
    status: "",
    statusMessage: "",
    loading: false,
    error: null,
  }),

  getters: {
    getAllDetails: (state) => state.allDetails,
    getUsers: (state) => state.users,
    getCashiers : (state) => state.cashiers,
    getUserDetails: (state) => state.userDetails,
    getStatus: (state) => state.status,
    getMessage: (state) => state.statusMessage,
    getToken: (state) => state.token,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },

  actions: {
    // 🔹 Login user
    async loginUser(ldata) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.ulogin(ldata);

        this.allDetails = response;
        this.token = response.token || "";

        if (this.token) {
          // ✅ Use your axios instance
          apiClient.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
          localStorage.setItem("token", this.token);
        }

        return response;
      } catch (error) {
        this.error = error.response?.data || error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // 🔹 Extract user details
    extractUserDetails() {
      const details = this.allDetails?.details;
      if (details) {
        const { name, user_id, email, phone } = details;
        this.userDetails = {
          name: name || "",
          userId: user_id || "",
          email: email || "",
          phone: phone || "",
        };
        this.token = this.allDetails.token || "";
      }
    },

    // 🔹 Get all users
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.getUsers();
        this.users = response || [];
        return this.users;
      } catch (error) {
        this.error = error.response?.data || error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

     // 🔹 Get all users
    async fetchCashiers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.getCashiers();
        this.cashiers = response || [];
        return this.cashiers;
      } catch (error) {
        this.error = error.response?.data || error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // 🔹 Get single user
    async getUserDetails(userId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.getUserdetails(userId);
        this.userDetails = {
          ...response,
          permissions: response.permissions || [],
          role: response.roles?.[0] || null,
        };
        return this.userDetails;
      } catch (error) {
        this.error = error.response?.data || error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // 🔹 Add new user
    async addUser(newUser) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.register(newUser);
        this.users.push(response.data);
        return response.data;
      } catch (error) {
        this.error = error.response?.data || error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // 🔹 Generate token
    async generateToken(postData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.generateToken(postData);
        this.token = response.data?.token || "";

        if (this.token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        }

        return response.data;
      } catch (error) {
        this.error = error.response?.data || error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
