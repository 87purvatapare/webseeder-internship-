import { create } from "zustand";
import axios from "../lib/axios"; // make sure axios instance has baseURL = http://localhost:5000
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: false,

  // // ---------------- SIGNUP ----------------
  // signup: async ({ name, email, password }) => {
  //   set({ loading: true });
  //   try {
  //     const { data } = await axios.post("/api/auth/signup", { name, email, password });
  //     localStorage.setItem("token", data.token);
  //     set({ user: data.user, loading: false });
  //     console.log("📩 Received signup body:", req.body);
  //     toast.success("Signup successful!");
  //   } catch (error) {
  //     console.error("Signup error:", error.response?.data?.message || error.message);
  //     toast.error(error.response?.data?.message || "Signup failed");
  //     set({ loading: false });
  //   }
  // },

signup: async (formData) => {
  const { name, email, password } = formData;
  set({ loading: true });
  try {
    console.log("📩 Sending signup data:", formData); // ✅ frontend log
    const { data } = await axios.post("/api/auth/signup", formData);
    localStorage.setItem("token", data.token);
    set({ user: data.user, loading: false });
    toast.success("Signup successful!");
  } catch (error) {
    console.error("Signup error:", error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || "Signup failed");
    set({ loading: false });
  }
},


  // ---------------- LOGIN ----------------
  // login: async ({ email, password }) => {
  //   set({ loading: true });
  //   try {
  //     const { data } = await axios.post("/api/auth/login", { email, password });
  //     localStorage.setItem("token", data.token);
  //     set({ user: data.user, loading: false });
  //     toast.success("Login successful!");
  //   } catch (error) {
  //     console.error("Login error:", error.response?.data?.message || error.message);
  //     toast.error(error.response?.data?.message || "Login failed");
  //     set({ loading: false });
  //   }
  // },

  login: async ({ email, password }) => {
  set({ loading: true });
  try {
    console.log("📩 Logging in with:", { email, password }); // debug
    const { data } = await axios.post("/api/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    set({ user: data.user, loading: false });
    toast.success("Login successful!");
  } catch (error) {
    console.error("Login error:", error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || "Login failed");
    set({ loading: false });
  }
},
  // ---------------- LOGOUT ----------------
  logout: async () => {
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("token");
      set({ user: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error.response?.data?.message || error.message);
      toast.error("Logout failed");
    }
  },

  // ---------------- GET PROFILE ----------------
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const { data } = await axios.get("/api/auth/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      set({ user: data, checkingAuth: false });
    } catch (error) {
      console.error("Auth check error:", error.response?.data?.message || error.message);
      set({ user: null, checkingAuth: false });
    }
  },

  // ---------------- REFRESH TOKEN ----------------
  refreshToken: async () => {
    set({ checkingAuth: true });
    try {
      const { data } = await axios.post("/api/auth/refresh-token");
      localStorage.setItem("token", data.token);
      set({ checkingAuth: false });
      return data.token;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

// ---------------- AXIOS INTERCEPTOR ----------------
let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = get().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        get().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
