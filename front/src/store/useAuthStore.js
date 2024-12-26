import {create} from "zustand"
import {axiosInstanace} from "../lib/axios"
export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isUpdatingProfile: false,
    isLoginLoading: false,
    isSignUpLoading: false,
    checkAuth: async () => {
        try {
            const res = await axiosInstanace.get("/auth/check")
            set({authUser: res.data})
        } catch (err) {
            console.log(err)
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },
}))