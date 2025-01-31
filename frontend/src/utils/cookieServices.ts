import Cookies from "universal-cookie";

class CookieService {
  private cookies: Cookies;

  constructor() {
    this.cookies = new Cookies();
  }

  setToken(token: string, expiresInDays: number = 7) {
    const expires = new Date();
    expires.setDate(expires.getDate() + expiresInDays);
    this.cookies.set("token", token, { expires });
  }

  getToken(): string | undefined {
    return this.cookies.get("token");
  }

  setRole(role: string, expiresInDays: number = 7) {
    const expires = new Date();
    expires.setDate(expires.getDate() + expiresInDays);
    this.cookies.set("role", role, { expires });
  }

  getRole(): string | undefined {
    return this.cookies.get("role");
  }

  clearAllCookies() {
    this.cookies.remove("token");
    this.cookies.remove("role");
  }
}

export default new CookieService();
