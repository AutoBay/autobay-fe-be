import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { serverConfig } from "@/lib/server/server-config";
import { ResponseStatus } from "@/types/api/request";

type Body = {
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const { firstname, lastname, email, subject, message } = body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: serverConfig.platform.email,
        pass: serverConfig.platform.appEmailPw,
      },
    });

    const html = htmlTemplateDesign({
      subject,
      user: `${firstname} ${lastname}`,
      email,
      title: "New message received",
      subtitle: "A user submitted the contact form.",
      message,
      brandName: "Autobay",
    });

    await transporter.sendMail({
      from: `${firstname} ${lastname} <${email}>`,
      to: "yosefisabag@gmail.com",
      subject,
      text: plainTextFallback({ subject, user: `${firstname} ${lastname}`, email, message }),
      html,
    });

    return NextResponse.json({ message: "Message has been successfully sent to email" }, { status: ResponseStatus?.SUCCESS ?? 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: ResponseStatus?.INTERNAL_ERROR ?? 500 });
  }
}

function escapeHtml(input: string) {
  return String(input).replace(/[&<>"']/g, (ch) => (ch === "&" ? "&amp;" : ch === "<" ? "&lt;" : ch === ">" ? "&gt;" : ch === '"' ? "&quot;" : "&#39;"));
}

function plainTextFallback({ subject, user, email, message }: { subject: string; user: string; email: string; message: string }) {
  return `Subject: ${subject}
From: ${user} <${email}>

${message}`;
}

function htmlTemplateDesign({
  subject,
  user,
  email,
  title,
  subtitle,
  message,
  brandName = "Brand",
}: {
  subject: string;
  user: string;
  email: string;
  title: string;
  subtitle: string;
  message: string;
  brandName?: string;
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${subject}</title>
    <style>
      body { margin:0; padding:0; background: linear-gradient(180deg, #f1f5f9 0%, #ffffff 100%); }
      @media (prefers-color-scheme: dark) {
        body { background: linear-gradient(180deg, #0b0f19 0%, #111827 100%) !important; }
        .card { background-color:#111827 !important; border-color:#334155 !important; }
        .text-body { color:#e5e7eb !important; }
        .muted { color:#94a3b8 !important; }
        .btn-primary { background:#e5e7eb !important; color:#0b0f19 !important; border-color:#e5e7eb !important; }
        .divider { background:#1f2937 !important; }
        .code { background:#0b1220 !important; color:#e5e7eb !important; border-color:#1f2937 !important; }
        .link { color:#93c5fd !important; }
      }
      @media only screen and (max-width:600px) {
        .container { width:100% !important; }
        .px { padding-left:16px !important; padding-right:16px !important; }
      }
      .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; }
    </style>
  </head>
  <body style="margin:0; padding:0; font-family:ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
    <div class="preheader">New contact message from ${user}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="600" class="container" cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto;">
            
            <tr>
              <td class="px" style="padding:24px;">
                <table role="presentation" width="100%">
                  <tr>
                    <td style="font-size:14px; font-weight:700; color:#0f172a;">
                      ${brandName}
                    </td>
                    <td align="right">
                      <span style="display:inline-block; padding:4px 10px; font-size:12px; border:1px solid #e5e7eb; border-radius:999px; background:#ffffff; color:#475569;">
                        Notification
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="px" style="padding:0 24px 32px 24px;">
                <table role="presentation" width="100%" class="card" cellpadding="0" cellspacing="0" style="background:#ffffff; border:1px solid #e5e7eb; border-radius:16px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
                  <tr>
                    <td style="padding:24px;">
                      <h1 class="text-body" style="margin:0 0 8px; font-size:22px; font-weight:700; color:#0f172a;">
                        ${title}
                      </h1>
                      <p class="muted" style="margin:0 0 16px; font-size:14px; line-height:1.6; color:#475569;">
                        ${subtitle}
                      </p>

                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px 0;">
                        <tr>
                          <td style="padding:12px 14px; border:1px solid #e5e7eb; border-radius:12px; background:linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);">
                            <div style="font-size:14px; font-weight:600; color:#0f172a; margin:0 0 4px 0;">From</div>
                            <div style="font-size:13px; color:#475569;">${user} &lt;${email}&gt;</div>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px 0;">
                        <tr>
                          <td style="padding:12px 14px; border:1px solid #e5e7eb; border-radius:12px; background:linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);">
                            <div style="font-size:14px; font-weight:600; color:#0f172a; margin:0 0 4px 0;">Subject</div>
                            <div style="font-size:13px; color:#475569;">${subject}</div>
                          </td>
                        </tr>
                      </table>

                      <div class="divider" style="height:1px; background:#e5e7eb; margin:16px 0;"></div>

                      <div class="code" style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size:13px; line-height:1.7; padding:12px 14px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:12px; white-space:pre-wrap;">
                        ${escapeHtml(message)}
                      </div>

                      <div style="margin-top:20px;">
                        <a class="btn-primary" href="mailto:${email}" style="display:inline-block; text-decoration:none; background:#111827; color:#ffffff; padding:12px 18px; border:1px solid #111827; border-radius:12px; font-weight:600; font-size:14px;">
                          Reply to ${user.split(" ")[0] || "sender"}
                        </a>
                      </div>

                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="px" style="padding:0 24px 32px 24px;">
                <p class="muted" style="margin:0; font-size:12px; line-height:1.6; color:#64748b;">
                  This notification was sent to autobay@gmail.com from the website contact form.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
