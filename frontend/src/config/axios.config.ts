import { logout } from "@/app/features/auth/authSlice";
import axios from "axios";
import { store } from "../app/store";
import { toast } from "react-toastify";

const axiosInstanceAPI = axios.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
  },
});

axiosInstanceAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(logout());
      toast.warn("تم تسجيل الخروج يرجي تسجيل الدخول مرة اخرى");
    } else if (error.status === 500) toast.error("حاول مجدداً في وقت لاحق");
    return Promise.reject(error);
  }
);

export default axiosInstanceAPI;
