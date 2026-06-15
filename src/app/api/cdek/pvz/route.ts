import { NextRequest, NextResponse } from "next/server";
import { getCdekToken } from "@/lib/cdek";

export async function GET(request: NextRequest) {
  try {
    const city = request.nextUrl.searchParams.get("city");

    if (!city || city.length < 2) {
      return NextResponse.json([]);
    }

    const token = await getCdekToken();

    const response = await fetch(
      "https://api.cdek.ru/v2/deliverypoints",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log("CDEK RESPONSE:", data);

    const filtered = Array.isArray(data)
      ? data.filter((p: any) =>
          (p.location?.city || "")
            .toLowerCase()
            .includes(city.toLowerCase())
        )
      : [];

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("CDEK ERROR:", error);

    return NextResponse.json(
      {
        error: String(error),
      },
      { status: 500 }
    );
  }
}