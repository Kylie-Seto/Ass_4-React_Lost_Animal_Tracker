/**
 * Hashes a plaintext password using the browser's built-in Web Crypto API.
 * Returns a hex-encoded SHA-256 digest.
 * The password is NEVER stored in plaintext — only this hash is persisted.
 */
export async function hashPassword(plaintext: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Compares a plaintext password against a stored SHA-256 hex hash.
 * Returns true if they match.
 */
export async function verifyPassword(
  plaintext: string,
  storedHash: string
): Promise<boolean> {
  const hashed = await hashPassword(plaintext);
  return hashed === storedHash;
}