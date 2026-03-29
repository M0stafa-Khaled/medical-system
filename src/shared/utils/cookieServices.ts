import Cookies from "universal-cookie";
import { TRole } from "../types";
import { decryptData, encryptData } from "./encryptData";

interface IUser {
  id: number;
  name: string;
  role: TRole;
}

class CookieService {
  private cookies: Cookies;

  constructor() {
    this.cookies = new Cookies();
  }

  setToken(token: string, expiresInDays: number = 7) {
    if (!token) {
      throw new Error("Invalid token: Cannot set empty token");
    }

    const encryptedToken = encryptData(token);

    const expires = new Date();
    expires.setDate(expires.getDate() + expiresInDays);
    this.cookies.set("_tn", encryptedToken, {
      expires,
      path: "/",
      secure: import.meta.env.VITE_ENV === "production",
      sameSite: "strict",
    });
  }

  getToken(): string | undefined {
    const token = this.cookies.get("_tn");
    if (!token) return undefined;
    try {
      const decryptedToken: string = decryptData(token);
      return token && token.trim() !== "" ? decryptedToken : undefined;
    } catch {
      this.cookies.remove("_tn", { path: "/" });
      return undefined;
    }
  }

  setUser({ id, name, role }: IUser, expiresInDays: number = 7) {
    if (!id || !name || !role)
      throw new Error("Invalid user: Cannot set empty user");

    const expires = new Date();
    expires.setDate(expires.getDate() + expiresInDays);

    const encryptedUser = encryptData({ id, name, role });
    this.cookies.set("_ur", encryptedUser, {
      expires,
      path: "/",
      secure: import.meta.env.VITE_ENV === "production",
      sameSite: "strict",
    });
  }

  getUser(): IUser | undefined {
    const user = this.cookies.get("_ur");
    if (!user) return undefined;
    try {
      const decryptedUser = decryptData(user) as IUser;
      if (!decryptedUser) return undefined;
      return decryptedUser;
    } catch {
      this.cookies.remove("_ur", { path: "/" });
      return undefined;
    }
  }

  setCanResetPass() {
    const encryptReset = encryptData("true");
    this.cookies.set("_cr_p", encryptReset, {
      path: "/",
      secure: import.meta.env.VITE_ENV === "production",
      expires: new Date(Date.now() + 60 * 60 * 1000),
      sameSite: "strict",
    });
  }

  getCanResetPass(): boolean {
    const canResetPass = this.cookies.get("_cr_p");
    if (!canResetPass) return false;
    try {
      const decryptCanReset = decryptData(canResetPass);
      if (decryptCanReset === "true") return true;
      return false;
    } catch {
      this.cookies.remove("_cr_p", { path: "/" });
      return false;
    }
  }

  clearCanResetPass() {
    this.cookies.remove("_cr_p", { path: "/" });
  }

  clearAllCookies() {
    this.cookies.remove("_tn", { path: "/" });
    this.cookies.remove("_rl", { path: "/" });
    this.cookies.remove("_ur", { path: "/" });
    this.cookies.remove("_cr_p", { path: "/" });
  }
}

export default new CookieService();
