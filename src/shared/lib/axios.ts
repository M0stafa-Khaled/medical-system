import axios from "axios";
import { toast } from "react-toastify";
import cookieServices from "@/shared/utils/cookieServices";

const axiosAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    Accept: "application/json",
  },
});

axiosAPI.interceptors.request.use((config) => {
  const token = cookieServices.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let handleLogout: (() => void) | null = null;

export const registerLogoutHandler = (fn: () => void) => {
  handleLogout = fn;
};

axiosAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      cookieServices.clearAllCookies();
      // store.dispatch(logout());
      if (handleLogout) {
        handleLogout();
      }
      toast.warn("يرجي تسجيل الدخول");
    } else if (error?.response?.status === 500 || error?.status === 500) {
      toast.error("حاول مجدداً في وقت لاحق");
    }
    return Promise.reject(error);
  }
);

export default axiosAPI;
