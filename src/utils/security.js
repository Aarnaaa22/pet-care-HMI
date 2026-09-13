// src/utils/security.js
import CryptoJS from 'crypto-js';

const DEMO_SECRET_KEY = 'petcare_health_sec_key_2026';

/**
 * AES Encrypts sensitive health record payloads (when encryption is enabled)
 */
export function encryptHealthRecord(data, secretKey = DEMO_SECRET_KEY) {
  try {
    const jsonStr = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonStr, secretKey).toString();
    return {
      encrypted: true,
      ciphertext: encrypted
    };
  } catch (err) {
    console.error("Encryption error:", err);
    return data;
  }
}

/**
 * AES Decrypts encrypted health record payloads
 */
export function decryptHealthRecord(record, secretKey = DEMO_SECRET_KEY) {
  if (!record || !record.encrypted || !record.ciphertext) return record;
  try {
    const bytes = CryptoJS.AES.decrypt(record.ciphertext, secretKey);
    const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedStr);
  } catch (err) {
    console.error("Decryption error:", err);
    return record;
  }
}
