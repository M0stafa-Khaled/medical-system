import Cookies from "universal-cookie";
import { TRole } from "../types";

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
}

export default new CookieService();
