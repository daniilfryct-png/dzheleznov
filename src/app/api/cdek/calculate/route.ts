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

    // Получаем данные выбранного ПВЗ
    const pvzResponse = await fetch(
      `https://api.cdek.ru/v2/deliverypoints?code=${code}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const pvzData = await pvzResponse.json();

    if (!Array.isArray(pvzData) || !pvzData.length) {
      return NextResponse.json(
        { error: "PVZ not found" },
        { status: 404 }
      );
    }

    const cityCode =
      pvzData[0]?.location?.city_code;

    if (!cityCode) {
      return NextResponse.json(
        { error: "City code not found" },
        { status: 400 }
      );
    }

    // Считаем доставку до города выбранного ПВЗ
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
            code: 168, // Электросталь
          },

          to_location: {
            code: cityCode,
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