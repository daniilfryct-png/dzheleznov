import { NextResponse } from "next/server";
import { getCdekOrder } from "@/lib/cdek";

export async function GET() {
  try {
    const result = await getCdekOrder(
      "87dd3757-ce7e-44d5-9f2a-a3cc0bcea66b"
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}