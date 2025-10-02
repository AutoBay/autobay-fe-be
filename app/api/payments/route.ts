import { type NextRequest, NextResponse } from "next/server";

export default function GET(_req: NextRequest, _res: NextResponse) {
  return NextResponse.json("payments route");
}
