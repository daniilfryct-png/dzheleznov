import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description: "Оформление заказа D.ZHELEZNOV.",
};

export default function CheckoutPage() {
  return (
    <div className="container-store py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-display mb-8">Оформление заказа</h1>
      <CheckoutForm />
    </div>
  );
}
