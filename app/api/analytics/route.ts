import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    mode: "client-powered",
    note: "Analytics are calculated from local mock transactions and concierge requests.",
  });
}
