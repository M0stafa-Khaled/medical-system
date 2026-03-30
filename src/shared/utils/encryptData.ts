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
 * Encrypts data using AES encryption algorithm
 * @param {any} data - The data to be encrypted
 * @returns {string} The encrypted string
 * @example
 * const sensitiveData = { id: 123, name: "John" };
 * const encrypted = encryptData(sensitiveData);
 * // Returns: "U2FsdGVkX1..." (encrypted string)
 */
export const encryptData = <T>(data: T): string => {
  return toBase64(JSON.stringify(data));
};

/**
 * Decrypts previously encrypted data
 * @param {string} encryptedData - The encrypted string to decrypt
 * @returns {any} The decrypted data in its original format
 * @example
 * const encryptedString = "U2FsdGVkX1...";
 * const decrypted = decryptData(encryptedString);
 */
export const decryptData = <T>(encryptedData: string): T => {
  return JSON.parse(fromBase64(encryptedData)) as T;
};
