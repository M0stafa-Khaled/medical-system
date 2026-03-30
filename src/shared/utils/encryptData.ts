const toBase64 = (value: string) =>
  btoa(
    encodeURIComponent(value).replace(
      /%([0-9A-F]{2})/g,
      (_, p1) => String.fromCharCode(Number.parseInt(p1, 16))
    )
  );

const fromBase64 = (value: string) =>
  decodeURIComponent(
    atob(value)
      .split("")
      .map((char) =>
        `%${char.charCodeAt(0).toString(16).padStart(2, "0").toUpperCase()}`
      )
      .join("")
  );

/**
 * Encodes data using Base64 encoding
 * @param {any} data - The data to be encrypted
 * @returns {string} The encoded string
 * @example
 * const sensitiveData = { id: 123, name: "John" };
 * const encrypted = encryptData(sensitiveData);
 * // Returns: "eyJpZCI6MTIzLCJuYW1lIjoiSm9obiJ9..." (base64 string)
 */
export const encryptData = <T>(data: T): string => {
  return toBase64(JSON.stringify(data));
};

/**
 * Decodes previously encoded data
 * @param {string} encryptedData - The encoded string to decode
 * @returns {any} The decrypted data in its original format
 * @example
 * const encryptedString = "U2FsdGVkX1...";
 * const decrypted = decryptData(encryptedString);
 */
export const decryptData = <T>(encryptedData: string): T => {
  return JSON.parse(fromBase64(encryptedData)) as T;
};
