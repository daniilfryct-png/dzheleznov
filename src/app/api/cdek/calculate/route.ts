import { NextRequest, NextResponse } from "next/server";
import { getCdekToken } from "@/lib/cdek";

export async function GET(request: NextRequest) {
  try {
    const code =
      request.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "PVZ code required" },
        { status: 400 }
      );
    }

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
          tariff_codes: [136],
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
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}