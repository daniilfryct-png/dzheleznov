import { NextRequest, NextResponse } from "next/server";
import { getCdekToken } from "@/lib/cdek";

const CDEK_API = "https://api.cdek.ru/v2";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  try {
    const { uuid } = await params;

    const token = await getCdekToken();

    const response = await fetch(
      `${CDEK_API}/orders/${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
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