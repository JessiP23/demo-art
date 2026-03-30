import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = (await request.json()) as { email: string; userId: string };

  if (!body.email || !body.userId) {
    return NextResponse.json({ error: "Missing email or userId" }, { status: 400 });
  }

  if (!stripe) {
    return NextResponse.json({
      mode: "mock",
      sessionId: `mock_sub_${body.userId}_${Date.now()}`,
      plan: "pro",
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile?subscription=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile?subscription=cancelled`,
    customer_email: body.email,
    line_items: [
      {
        quantity: 1,
        price: process.env.STRIPE_PRO_PRICE_ID,
      },
    ],
    metadata: {
      userId: body.userId,
    },
  });

  return NextResponse.json({
    mode: "stripe",
    sessionId: session.id,
    url: session.url,
    plan: "pro",
  });
}
