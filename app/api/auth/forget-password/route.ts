import { NextResponse } from "next/server";
import { emailSchema } from "@/lib/client/schemas/email-schema";
import { adminRole, serverConfig } from "@/lib/server/server-config";
import { ResponseStatus } from "@/types/api/request";

export async function POST(request: Request, _res: NextResponse) {
  const body = await request.json();
  const { email } = emailSchema.parse(body);

  try {
    await adminRole.generatePasswordResetLink(email, { url: serverConfig.platform.baseUrl });
    return NextResponse.json({ message: "Password reset link sent to your email address" }, { status: ResponseStatus.SUCCESS });
  } catch (error) {
    return NextResponse.json(null, { status: ResponseStatus.INTERNAL_ERROR, statusText: (error as Error).message });
  }
}
