import crypto from "node:crypto";
import fs from "node:fs";
import { crc32 } from "node:zlib";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { serverConfig } from "@/lib/server/server-config";
import { ResponseStatus } from "@/types/api/request";

async function downloadAndCache(url: string, cacheKey: string) {
  if (!cacheKey) {
    cacheKey = url.replace(/\W+/g, "-");
  }
  const filePath = `${CACHE_DIR}/${cacheKey}`;

  // Check if cached file exists
  const cachedData = await fs.readFile(filePath, "utf-8").catch(() => null);
  if (cachedData) {
    return cachedData;
  }

  // Download the file if not cached
  const response = await fetch(url);
  const data = await response.text();
  await fs.writeFile(filePath, data);

  return data;
}

export default async function POST(req: NextRequest, _res: NextResponse) {
  const body = req.json();
  const data = JSON.parse(body);
  const transmissionId = req.headers.get("paypal-transmission-id	");
  const timeStamp = req.headers.get("paypal-transmission-time");
  const _payPalCertUrl = req.headers.get("paypal-cert-url");
  const crc = Number.parseInt(`0x${crc32(body).toString("hex")}`, 10);

  const message = `${transmissionId}|${timeStamp}|${serverConfig.paypal.webhooks.invoice}|${crc}`;

  console.log(`Original signed message ${message}`);

  const certPem = await downloadAndCache(headers["paypal-cert-url"]);

  // Create buffer from base64-encoded signature
  const signatureBuffer = Buffer.from(headers["paypal-transmission-sig"], "base64");

  // Create a verification object
  const verifier = crypto.createVerify("SHA256");

  // Add the original message to the verifier
  verifier.update(message);

  const isSignatureValid = verifier.verify(certPem, signatureBuffer);

  if (isSignatureValid) {
    console.log("Signature is valid.");

    // Successful receipt of webhook, do something with the webhook data here to process it, e.g. write to database
    console.log("Received event", JSON.stringify(data, null, 2));
  } else {
    console.log(`Signature is not valid for ${data?.id} ${headers?.["correlation-id"]}`);
    // Reject processing the webhook event. May wish to log all headers+data for debug purposes.
  }

  return NextResponse.json({}, { status: ResponseStatus.SUCCESS });
}
