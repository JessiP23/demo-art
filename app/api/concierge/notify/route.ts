import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email: string;
    artworkTitle: string;
    status: "pending" | "approved" | "declined";
  };

  if (!body.email || !body.artworkTitle || !body.status) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!resend || !process.env.RESEND_FROM_EMAIL) {
    return NextResponse.json({
      mode: "mock",
      queued: true,
      message: `Notification queued for ${body.email}`,
    });
  }

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: body.email,
    subject: `ArtMatch concierge update: ${body.status}`,
    html: `<p>Your concierge request for <strong>${body.artworkTitle}</strong> is now <strong>${body.status}</strong>.</p>`,
  });

  return NextResponse.json({ mode: "resend", sent: true });
}
