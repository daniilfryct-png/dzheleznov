import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    nextPublicSiteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    telegramExists: !!process.env.TELEGRAM_BOT_TOKEN,
    cdekId: process.env.CDEK_CLIENT_ID,
    cdekSecretExists: !!process.env.CDEK_CLIENT_SECRET,
  });
}