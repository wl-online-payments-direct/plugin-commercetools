import crypto, { CipherGCMTypes } from 'crypto';

const ALGORITHM: CipherGCMTypes = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const ENCODING: BufferEncoding = 'hex';

function getEncryptionKey(): Uint8Array {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error('ENCRYPTION_KEY environment variable is not set');
  }

  if (key.length === 64 && /^[0-9a-fA-F]+$/.test(key)) {
    return new Uint8Array(Buffer.from(key, 'hex'));
  }

  return new Uint8Array(crypto.createHash('sha256').update(key).digest());
}

export function encrypt(text: string): string {
  if (!text) {
    return text;
  }

  const key = getEncryptionKey();
  const iv = new Uint8Array(crypto.randomBytes(IV_LENGTH));
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, 'utf8', ENCODING);
  encrypted += cipher.final(ENCODING);

  const authTag = cipher.getAuthTag();

  return `${Buffer.from(iv).toString(ENCODING)}:${authTag.toString(ENCODING)}:${encrypted}`;
}

export function decrypt(encryptedText: string): string {
  if (!encryptedText) {
    return encryptedText;
  }

  if (!encryptedText.includes(':')) {
    return encryptedText;
  }

  const parts = encryptedText.split(':');
  if (parts.length !== 3) {
    return encryptedText;
  }

  try {
    const key = getEncryptionKey();
    const iv = new Uint8Array(Buffer.from(parts[0], ENCODING));
    const authTag = new Uint8Array(Buffer.from(parts[1], ENCODING));
    const encrypted = parts[2];
    

    if (iv.length !== IV_LENGTH || authTag.length !== AUTH_TAG_LENGTH) {
      console.error('[Crypto] Invalid IV or AuthTag length', {
        ivLength: iv.length,
        authTagLength: authTag.length,
      });
      return encryptedText;
    }

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, ENCODING, 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('[Crypto] Decryption failed:', error);
    return encryptedText;
  }
}

export function isEncrypted(text: string): boolean {
  if (!text || !text.includes(':')) {
    return false;
  }
  const parts = text.split(':');
  if (parts.length !== 3) {
    return false;
  }

  const hexRegex = /^[0-9a-fA-F]+$/;
  
  return (
    parts[0].length === IV_LENGTH * 2 &&
    parts[1].length === AUTH_TAG_LENGTH * 2 &&
    hexRegex.test(parts[0]) &&
    hexRegex.test(parts[1]) &&
    hexRegex.test(parts[2])
  );
}

export function encryptSensitiveFields<T extends object>(
  config: T,
  fields: readonly string[],
): T {
  const result = { ...config } as Record<string, unknown>;
  for (const field of fields) {
    if (field in result && typeof result[field] === 'string') {
      result[field] = encrypt(result[field] as string);
    }
  }
  return result as T;
}

export function decryptSensitiveFields<T extends object>(
  config: T,
  fields: readonly string[],
): T {
  const result = { ...config } as Record<string, unknown>;
  for (const field of fields) {
    if (field in result && typeof result[field] === 'string') {
      result[field] = decrypt(result[field] as string);
    }
  }
  return result as T;
}

export const SENSITIVE_CONFIG_FIELDS = [
  'apiKey',
  'apiSecret',
  'webhookKey',
  'webhookSecret',
] as const;
