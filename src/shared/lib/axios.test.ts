import { describe, expect, it } from "vitest";
import axiosAPI from "./axios";

describe("axios client", () => {
  it("uses a request timeout", () => {
    expect(axiosAPI.defaults.timeout).toBe(30000);
  });
});
