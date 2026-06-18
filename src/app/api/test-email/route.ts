import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/mail";

export async function GET() {
  try {
    await sendOrderEmail(
      "daniilfryct@gmail.com",
      "TEST-123"
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}