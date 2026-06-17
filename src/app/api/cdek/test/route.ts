import { NextResponse } from "next/server";
import { getCdekToken } from "@/lib/cdek";

export async function GET() {
  try {
    const token = await getCdekToken();

    const response = await fetch(
      "https://api.cdek.ru/v2/deliverypoints?code=MSK103",
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