import { NextResponse } from "next/server";
import { getCdekToken } from "@/lib/cdek";

export async function GET() {
  try {
    const token = await getCdekToken();

    const response = await fetch(
      "https://api.cdek.ru/v2/calculator/tarifflist",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from_location: {
            code: 168,
          },
          to_location: {
            code: 44,
          },
          packages: [
            {
              weight: 1000,
              length: 40,
              width: 30,
              height: 10,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
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