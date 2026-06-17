import { NextResponse } from "next/server";
import { createCdekOrder } from "@/lib/cdek";

export async function GET() {
  try {
    const result = await createCdekOrder();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}