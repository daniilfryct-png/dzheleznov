import { NextResponse } from "next/server";
import { getCdekToken } from "@/lib/cdek";

export async function GET() {
  const token = await getCdekToken();

  const response = await fetch(
    "https://api.cdek.ru/v2/location/cities?city=Москва",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}