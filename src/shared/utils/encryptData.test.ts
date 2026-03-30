import { describe, expect, it } from "vitest";
import { decryptData, encryptData } from "./encryptData";

describe("encryptData/decryptData", () => {
  it("round-trips plain JSON values", () => {
    const payload = { token: "abc123", role: "admin" };
    const encoded = encryptData(payload);

    expect(encoded).not.toBe(JSON.stringify(payload));
    expect(decryptData<typeof payload>(encoded)).toEqual(payload);
  });
});
