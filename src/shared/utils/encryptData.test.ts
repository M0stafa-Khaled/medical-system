import { describe, expect, it } from "vitest";
import { decryptData, encryptData } from "./encryptData";

describe("encryptData/decryptData", () => {
  it("round-trips plain JSON values", () => {
    const payload = { token: "abc123", role: "admin" };
    const encoded = encryptData(payload);

    expect(encoded).not.toBe(JSON.stringify(payload));
    expect(decryptData<typeof payload>(encoded)).toEqual(payload);
  });

  it("handles unicode and special characters", () => {
    const payload = {
      value: "مرحبا ✅ @#$%^&*() / 日本語",
    };
    const encoded = encryptData(payload);

    expect(/^[A-Za-z0-9+/=]+$/.test(encoded)).toBe(true);
    expect(decryptData<typeof payload>(encoded)).toEqual(payload);
  });

  it("handles empty objects", () => {
    const payload = {};
    const encoded = encryptData(payload);

    expect(decryptData<typeof payload>(encoded)).toEqual(payload);
  });
});
