import { NextResponse } from "next/server";
import { getCdekToken } from "@/lib/cdek";

export async function GET() {
  try {
    const token = await getCdekToken();

    return NextResponse.json({
      success: true,
      tokenExists: !!token,
      tokenStart: token.slice(0, 20),
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