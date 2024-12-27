import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
    isCheckingAuth: true,
    authUser: null,
    isSignUp: false,
    isLoginLoading: false,
    isUpdatingProfile: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            
        } catch (error) {
            console.error("Error in checkAuth:", error?.response?.data?.message || error.message);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSignUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            console.error("Error in signup:", error?.response?.data?.message || error.message);
            toast.error(error?.response?.data?.message || "Something went wrong :(");
        } finally {
            set({ isSignUp: false });
        }
    },

    login: async (data) => {
        set({ isLoginLoading: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        } catch (error) {
            console.error("Error in login:", error?.response?.data?.message || error.message);
            toast.error(error?.response?.data?.message || "Something went wrong :(");
        } finally {
            set({ isLoginLoading: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.get("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            console.error("Error in logout:", error?.response?.data?.message || error.message);
            toast.error(error?.response?.data?.message || "Something went wrong :(");
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/profile", data); // Adjust endpoint if necessary
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Error in updateProfile:", error?.response?.data?.message || error.message);
            toast.error(error?.response?.data?.message || "Something went wrong :(");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    
}));
