"use client";

import { useState } from "react";
import Link from "next/link";

const shopLinks = [
  { href: "/katalog", label: "Каталог" },
  { href: "/kolekcii", label: "Коллекции" },
  { href: "/arkhiv", label: "Архив" },
];

const infoLinks = [
  { href: "/o-brende", label: "О бренде" },
  { href: "/kontakty", label: "Контакты" },
  { href: "/privacy", label: "Политика конфиденциальности" },
  { href: "/oferta", label: "Публичная оферта" },
  { href: "/vozvrat", label: "Возврат товара" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="bg-surface border-t border-border mt-16">
      <div className="container-store py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="font-display text-2xl tracking-[0.2em] uppercase">
              D.ZHELEZNOV
            </Link>
            <p className="text-sm text-muted mt-4 max-w-xs leading-relaxed">
              Дизайнер.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://t.me/willyouhearme" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest hover:text-text transition-colors">
                Telegram
              </a>
              <a href="https://www.instagram.com/d.zheleznov_?igsh=cDM5amc3dDg5czRj&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest hover:text-text transition-colors">
                Instagram
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest mb-4">Магазин</h3>
            <ul className="space-y-2">
              {shopLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-sm text-muted hover:text-text transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest mb-4">Информация</h3>
            <ul className="space-y-2">
              {infoLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="text-sm text-muted hover:text-text transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-sm text-muted space-y-1">
              <a
                href="/oferta"
                className="hover:text-text transition-colors"
              >
              Публичная оферта
              </a>
              <p>
                <a href="mailto:info@d-zheleznov.ru" className="hover:text-text">info@d-zheleznov.ru</a>
              </p>
              <p>+7 (966) 059-82-68</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest mb-4">Рассылка</h3>
            {submitted ? (
              <p className="text-sm text-text">Спасибо за подписку</p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
                className="flex flex-col gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="input-field"
                />
                <button type="submit" className="btn-primary w-full">Подписаться</button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-2 text-xs text-muted">
          <p>© 2025 D.ZHELEZNOV. Все права защищены.</p>
          <p>Москва, Россия</p>
        </div>
      </div>
    </footer>
  );
}
