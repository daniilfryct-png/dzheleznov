"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductCardImage } from "@/components/store/ProductCardImage";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, cn } from "@/lib/utils";
import { deliveryOptions } from "@/lib/delivery";
import { paymentOptions } from "@/lib/payment";
import type { DeliveryMethod, PaymentMethod } from "@/types";

export function CheckoutForm() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cdekPoints, setCdekPoints] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    deliveryMethod: "sdek" as DeliveryMethod,
    paymentMethod: "yukassa" as PaymentMethod,
    pickupPoint: "",
    address: "",
  });
useEffect(() => {
  async function loadPvz() {
    if (!form.city || form.city.length < 2) {
      setCdekPoints([]);
      return;
    }

    try {
      const res = await fetch(
        `/api/cdek/pvz?city=${encodeURIComponent(form.city)}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setCdekPoints(data);
      }
    } catch (e) {
      console.error("Ошибка загрузки ПВЗ", e);
    }
  }

  const timeout = setTimeout(loadPvz, 500);

  return () => clearTimeout(timeout);
}, [form.city]);

  const delivery = deliveryOptions.find((d) => d.id === form.deliveryMethod);
  const orderTotal = total + (delivery?.price ?? 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, form, total: orderTotal }),
      });
      const data = await res.json();
      if (data.success) {
        clearCart();

        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
          return;
        }
        
        router.push(`/oplata/uspeh?order=${data.orderId}`);
      } else {
        setError(data.error ?? "Не удалось оформить заказ");
      }
    } catch {
      setError("Ошибка сети. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <div className="text-center py-20">
        <p className="text-muted mb-6">Корзина пуста</p>
        <a href="/katalog" className="btn-primary">Перейти в каталог</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-8">
        <section>
          <h2 className="text-xs uppercase tracking-widest mb-4">Контактные данные</h2>
          <div className="space-y-3">
            <input type="text" placeholder="Имя" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
            <input type="tel" placeholder="Телефон" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
            <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest mb-4">Доставка</h2>
          <div className="space-y-2">
            {deliveryOptions.map((opt) => (
              <label key={opt.id} className={cn("flex gap-3 p-4 border cursor-pointer transition-colors", form.deliveryMethod === opt.id ? "border-text bg-surface" : "border-border hover:border-muted")}>
                <input type="radio" name="delivery" checked={form.deliveryMethod === opt.id} onChange={() => setForm({ ...form, deliveryMethod: opt.id })} className="accent-text mt-1" />
                <div>
                  <p className="text-sm font-medium">{opt.name}</p>
                  <p className="text-xs text-muted mt-1">{opt.description} · {opt.estimatedDays}</p>
                  <p className="text-xs mt-1">{opt.price === 0 ? "Бесплатно" : formatPrice(opt.price)}</p>
                </div>
              </label>
            ))}
          </div>
          {form.deliveryMethod === "sdek" && (
            <>
            <input type="text" placeholder="Введите город" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input-field mt-3" />

            <select value={form.pickupPoint} onChange={(e) => setForm({ ...form, pickupPoint: e.target.value })} required className="input-field mt-3">
              <option value="">Выберите пункт</option>
              {cdekPoints.map((p) => 
                <option 
                  key={p.code}
                  value={p.code}
                >
                  {p.location?.address_full || p.address}
                </option>)}
            </select>
            </>
          )}
          {form.deliveryMethod === "pochta" && (
            <input
              type="text"
              placeholder="Адрес доставки"
              required
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
              className="input-field mt-3"
            />
          )}
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest mb-4">Оплата</h2>
          <div className="space-y-2">
            {paymentOptions.map((opt) => (
              <label key={opt.id} className={cn("flex gap-3 p-4 border cursor-pointer transition-colors", form.paymentMethod === opt.id ? "border-text bg-surface" : "border-border hover:border-muted")}>
                <input type="radio" name="payment" checked={form.paymentMethod === opt.id} onChange={() => setForm({ ...form, paymentMethod: opt.id })} className="accent-text mt-1" />
                <div>
                  <p className="text-sm font-medium">{opt.name}</p>
                  <p className="text-xs text-muted mt-1">{opt.description}</p>
                </div>
              </label>
            ))}
          </div>
        </section>
      </div>

      <div>
        <div className="border border-border p-6 sticky top-24">
          <h2 className="text-xs uppercase tracking-widest mb-4">Ваш заказ</h2>
          <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                <div className="w-14 flex-shrink-0 border border-border/60">
                  <ProductCardImage
                    src={item.product.images[0]}
                    alt={item.product.name}
                    sizes="56px"
                    quality={80}
                    imageClassName="p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs truncate">{item.product.name}</p>
                  <p className="text-[10px] text-muted">{item.size} × {item.quantity}</p>
                  <p className="text-xs mt-1 tabular-nums">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted">
              <span>Доставка</span>
              <span>{delivery?.price === 0 ? "Бесплатно" : formatPrice(delivery?.price ?? 0)}</span>
            </div>
            <div className="flex justify-between font-medium text-base pt-2">
              <span>Итого</span>
              <span className="tabular-nums">{formatPrice(orderTotal)}</span>
            </div>
          </div>
          {error && <p className="text-xs text-red-600 mt-4">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full mt-6 disabled:opacity-50">
            {loading ? "Обработка..." : "Оформить заказ"}
          </button>
        </div>
      </div>
    </form>
  );
}
