import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import crc32 from "buffer-crc32";
import { type NextRequest, NextResponse } from "next/server";

// Put your Webhook ID from PayPal (the one assigned when you subscribed the listener URL).
const WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID as string;
const CACHE_DIR = process.env.CACHE_DIR || "/tmp/paypal-certs";

async function downloadAndCache(url: string, cacheKey?: string) {
  await fs.mkdir(CACHE_DIR, { recursive: true }).catch(() => { });
  const key = cacheKey || url.replace(/\W+/g, "-");
  const filePath = path.join(CACHE_DIR, key);

  const cached = await fs.readFile(filePath, "utf-8").catch(() => null);
  if (cached) return cached;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch cert: ${res.status}`);
  const pem = await res.text();
  await fs.writeFile(filePath, pem, "utf-8");
  return pem;
}

function crc32Decimal(raw: string): number {
  // hex buffer → hex string → parse as decimal
  const hex = crc32(raw).toString("hex");
  return Number.parseInt("0x" + hex, 10);
}

function verifyWithCert(pem: string, message: string, b64sig: string): boolean {
  const verifier = crypto.createVerify("SHA256");
  verifier.update(message);
  verifier.end();
  const sig = Buffer.from(b64sig, "base64");
  return verifier.verify(pem, sig);
}

export async function POST(req: NextRequest) {
  // 1) Raw body for CRC32. Do not parse yet.
  const raw = await req.text();

  // 2) Required headers (names are exact, lowercase by spec)
  const h = req.headers;
  const transmissionId = h.get("paypal-transmission-id");
  const transmissionTime = h.get("paypal-transmission-time");
  const certUrl = h.get("paypal-cert-url");
  const transmissionSig = h.get("paypal-transmission-sig");

  // Basic guardrails
  if (!(transmissionId && transmissionTime && certUrl && transmissionSig && WEBHOOK_ID)) {
    // Always 2xx to avoid retries, but log for investigation.
    console.error("Missing required verification pieces");
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 3) Form the signed message
  const crc = crc32Decimal(raw); // decimal form
  const message = `${transmissionId}|${transmissionTime}|${WEBHOOK_ID}|${crc}`;

  // 4) Get PayPal’s cert and verify signature
  let valid = false;
  try {
    const certPem = await downloadAndCache(certUrl);
    valid = verifyWithCert(certPem, message, transmissionSig);
  } catch (e) {
    console.error("Verification error:", e);
  }

  if (!valid) {
    console.warn("Invalid PayPal webhook signature", {
      transmissionId,
      transmissionTime,
    });
    // Still return 200 to stop retries; just don’t process.
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 5) Now safe to parse and process the event
  let event: unknown = null;
  try {
    event = JSON.parse(raw);
  } catch {
    console.error("Failed to parse verified JSON");
  }

  // TODO: handle event (e.g., write to DB) – only after verification succeeds
  console.log("Verified PayPal event:", event);

  return NextResponse.json({ ok: true }, { status: 200 });
}
