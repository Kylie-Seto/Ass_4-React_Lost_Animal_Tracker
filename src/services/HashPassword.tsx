// hash password using the browser's built-in crypto.subtle.digest("SHA-256", ...) before persisting
export async function hashPassword(plaintext: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// verify password by hashing the plaintext and comparing to stored hash
export async function verifyPassword(
  plaintext: string,
  storedHash: string
): Promise<boolean> {
  const hashed = await hashPassword(plaintext);
  return hashed === storedHash;
}