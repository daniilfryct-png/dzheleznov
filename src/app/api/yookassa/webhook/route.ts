import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    webhook: "yookassa",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("=================================");
    console.log("YOOKASSA WEBHOOK RECEIVED");
    console.log(JSON.stringify(body, null, 2));
    console.log("=================================");

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error("WEBHOOK ERROR:", error);

    return NextResponse.json(
      { error: "Webhook error" },
      { status: 500 }
    );
  }
}