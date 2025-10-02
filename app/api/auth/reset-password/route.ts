import { type NextRequest, NextResponse } from "next/server";
import { adminRole } from "@/lib/server/server-config";
import { ResponseStatus } from "@/types/api/request";

export async function POST(req: NextRequest, _res: NextResponse) {
  const body = await req.json();
  const { email, password } = body;
  try {
    await adminRole.updateUser(email, { password });
    return NextResponse.json({ message: "Password updated successfully" }, { status: ResponseStatus.SUCCESS });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: ResponseStatus.INTERNAL_ERROR });
  }
}
