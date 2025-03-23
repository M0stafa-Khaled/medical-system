import Cookies from "universal-cookie";
import { TRole } from "../types";
import { decryptData, encryptData } from "./encryptData";

class CookieService {
  private cookies: Cookies;

  constructor() {
    this.cookies = new Cookies();
  }

  setToken(token: string, expiresInDays: number = 7) {
    if (!token) {
      throw new Error("Invalid token: Cannot set empty token");
    }

    const expires = new Date();
    expires.setDate(expires.getDate() + expiresInDays);
    this.cookies.set("token", token, {
      expires,
      path: "/",
      secure: import.meta.env.VITE_ENV === "production",
    });
  }

  getToken(): string | undefined {
    const token = this.cookies.get("token");
    return token && token.trim() !== "" ? token : undefined;
  }

  setRole(role: TRole, expiresInDays: number = 7) {
    if (!role) {
      throw new Error("Invalid role: Cannot set empty role");
    }

    const expires = new Date();
    expires.setDate(expires.getDate() + expiresInDays);
    this.cookies.set("role", role, {
      expires,
      path: "/",
      secure: import.meta.env.VITE_ENV === "production",
    });
  }

  getRole(): TRole | undefined {
    const role = this.cookies.get("role");
    return role && role.trim() !== "" ? role : undefined;
  }

  clearAllCookies() {
    this.cookies.remove("token", { path: "/" });
    this.cookies.remove("role", { path: "/" });
    this.cookies.remove("permissions", { path: "/" });
  }

  setCanResetPass() {
    const encryptReset = encryptData("true");
    this.cookies.set("c_r_p", encryptReset, {
      path: "/",
      secure: import.meta.env.VITE_ENV === "production",
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
  }

  getCanResetPass(): boolean {
    const canResetPass = this.cookies.get("c_r_p");
    if (!canResetPass) return false;
    const decryptCanReset = decryptData(canResetPass);
    if (decryptCanReset === "true") return true;
    return false;
  }

  clearCanResetPass() {
    this.cookies.remove("c_r_p", { path: "/" });
  }
}

export default new CookieService();
