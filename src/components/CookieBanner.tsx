"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");

    if (!accepted) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 w-[300px] z-50
    bg-black/80 backdrop-blur-xl
    border border-white/10
    rounded-2xl
    p-4
    shadow-[0_20px_60px_rgba(0,0,0,0.45)]
    animate-[fadeIn_.35s_ease]">
      <p className="text-[12px] leading-5 text-white/80">
        Мы используем файлы cookie и локальное хранилище браузера для
        корректной работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь
        с их использованием.
      </p>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={accept}
          className="
          px-4 py-2
          rounded-full
          bg-white
          text-black
          text-[11px]
          tracking-widest
          uppercase
          transition-all
          duration-300
          hover:bg-neutral-200
          "
        >
          Понятно
        </button>

        <Link
          href="/privacy"
          className="
          text-[11px]
          uppercase
          tracking-widest
          text-white/60
          hover:text-white
          transition-colors
          "
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}