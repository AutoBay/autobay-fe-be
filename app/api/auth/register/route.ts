import { NextResponse } from "next/server";
import { adminRole } from "@/lib/server/server-config";
import { ResponseStatus } from "@/types/api/request";

export async function POST(request: Request, _res: NextResponse) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, phoneNumber } = body;

    // Basic guard (prevents Admin call with empty values)
    if (!(email && password)) {
      return NextResponse.json({ message: "Missing required fields" }, { status: ResponseStatus.BAD_REQUEST });
    }

    const user = await adminRole.createUser({
      email,
      password,
      // displayName: `${firstName} ${lastName}`,
      disabled: false,
      emailVerified: false,
      // phoneNumber,
    });

    if (user.email) {
      return NextResponse.json({ data: user }, { status: ResponseStatus.SUCCESS });
    }
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: ResponseStatus.INTERNAL_ERROR });
  }
}
