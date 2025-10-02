import { crc32 } from "node:zlib";
import { type NextRequest, NextResponse } from "next/server";
import { ResponseStatus } from "@/types/api/request";

export default function POST(req: NextRequest, _res: NextResponse) {
  const body = req.json();
  const data = JSON.parse(body);
  const transmissionId = req.headers.get("paypal-transmission-id	");
  const timeStamp = req.headers.get("paypal-transmission-time");
  const payPalCertUrl = req.headers.get("paypal-cert-url");
  const crc = Number.parseInt("0x" + crc32(body).toString("hex")); // hex crc32 of raw event data, parsed to decimal form

  const message = `${transmissionId}|${timeStamp}|${WEBHOOK_ID}|${crc}`
  console.log(`Original signed message ${message}`);

  return NextResponse.json({}, { status: ResponseStatus.SUCCESS });
}
