import { logout } from "@/store/features/auth/authSlice";
import axios from "axios";
import { store } from "../store/store";
import { toast } from "react-toastify";

const axiosAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    Accept: "application/json",
  },
});

axiosAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      store.dispatch(logout());
      toast.warn("يرجي تسجيل الدخول");
    } else if (error?.status === 500) toast.error("حاول مجدداً في وقت لاحق");
    return Promise.reject(error);
  }
);

export default axiosAPI;
