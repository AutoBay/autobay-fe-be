import { type NextRequest, NextResponse } from "next/server";
import { serverConfig } from "@/lib/server/server-config";
import { crc32Decimal, downloadAndCache, verifyWithCert } from "@/lib/server/utils";


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
  if (!(transmissionId && transmissionTime && certUrl && transmissionSig && serverConfig.paypal.webhooks.invoice)) {
    // Always 2xx to avoid retries, but log for investigation.
    console.error("Missing required verification pieces");
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 3) Form the signed message
  const crc = crc32Decimal(raw); // decimal form
  const message = `${transmissionId}|${transmissionTime}|${serverConfig.paypal.webhooks.invoice}|${crc}`;

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
