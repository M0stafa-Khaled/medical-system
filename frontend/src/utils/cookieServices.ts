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

    const expires = new Date();
    expires.setDate(expires.getDate() + expiresInDays);
    this.cookies.set("_tn", token, {
      expires,
      path: "/",
      secure: import.meta.env.VITE_ENV === "production",
    });
  }

  getToken(): string | undefined {
    const token = this.cookies.get("_tn");
    return token && token.trim() !== "" ? token : undefined;
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
    });
  }

  getUser(): IUser | undefined {
    const user = this.cookies.get("_ur");
    if (!user) return undefined;
    const decryptedUser = decryptData(user) as IUser;

    if (!decryptedUser) return undefined;
    return decryptedUser;
  }

  setCanResetPass() {
    const encryptReset = encryptData("true");
    this.cookies.set("_cr_p", encryptReset, {
      path: "/",
      secure: import.meta.env.VITE_ENV === "production",
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
  }

  getCanResetPass(): boolean {
    const canResetPass = this.cookies.get("_cr_p");
    if (!canResetPass) return false;
    const decryptCanReset = decryptData(canResetPass);
    if (decryptCanReset === "true") return true;
    return false;
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
