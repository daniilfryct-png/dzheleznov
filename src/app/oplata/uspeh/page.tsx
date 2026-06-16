"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  return (
    <div className="container-store py-20 text-center max-w-md mx-auto">
      <h1 className="font-display text-3xl mb-4">Заявка принята</h1>
      {orderId && <p className="text-sm text-muted mb-2">Номер: <span className="text-text">{orderId}</span></p>}
      <p className="text-sm text-muted mb-8">Проверьте статус оплаты. После подтвержденияплатежа заказ будет передан в обработку.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/katalog" className="btn-primary">Продолжить покупки</Link>
        <Link href="/" className="btn-outline">На главную</Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
