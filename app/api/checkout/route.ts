import { NextResponse } from "next/server";
import { calculateCommission } from "@/lib/engines";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    artworkId: string;
    title: string;
    amount: number;
    userId: string;
  };

  if (!body.amount || !body.title || !body.userId || !body.artworkId) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  const commission = calculateCommission(body.amount);

  if (!stripe) {
    return NextResponse.json({
      mode: "mock",
      sessionId: `mock_${body.artworkId}_${Date.now()}`,
      amount: body.amount,
      commission,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/${body.artworkId}?purchase=cancelled`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: `ArtMatch Acquisition: ${body.title}`,
          },
          unit_amount: Math.round(body.amount * 100),
        },
      },
    ],
    metadata: {
      artworkId: body.artworkId,
      userId: body.userId,
      commission: String(commission),
    },
  });

  return NextResponse.json({
    mode: "stripe",
    sessionId: session.id,
    url: session.url,
    amount: body.amount,
    commission,
  });
}
