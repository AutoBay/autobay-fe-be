import { type NextRequest, NextResponse } from "next/server";
import { ResponseStatus } from "@/types/api/request";

export default function POST(_req: NextRequest, _res: NextResponse) {
  return NextResponse.json({}, { status: ResponseStatus.SUCCESS });
}
