import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { crc32 } from "node:zlib";

const CACHE_DIR = "/tmp/paypal-certs";

export async function downloadAndCache(url: string, cacheKey?: string) {
  await fs.mkdir(CACHE_DIR, { recursive: true }).catch(() => null);
  const key = cacheKey || url.replace(/\W+/g, "-");
  const filePath = path.join(CACHE_DIR, key);

  const cached = await fs.readFile(filePath, "utf-8").catch(() => null);
  if (cached) {
    return cached;
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch cert: ${res.status}`);
  }
  const pem = await res.text();
  await fs.writeFile(filePath, pem, "utf-8");
  return pem;
}

export function crc32Decimal(raw: string): number {
  // hex buffer → hex string → parse as decimal
  const hex = crc32(raw).toString("hex");
  return Number.parseInt("0x" + hex, 10);
}

export function verifyWithCert(pem: string, message: string, b64sig: string): boolean {
  const verifier = crypto.createVerify("SHA256");
  verifier.update(message);
  verifier.end();
  const sig = Buffer.from(b64sig, "base64");
  return verifier.verify(pem, sig);
}
