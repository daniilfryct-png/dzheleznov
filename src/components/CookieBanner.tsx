"use client";

import { useEffect, useState } from "react";

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
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:w-[420px] bg-black text-white p-5 rounded-xl shadow-2xl z-50">
      <p className="text-sm leading-6">
        Мы используем файлы cookie и локальное хранилище браузера для
        корректной работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь
        с их использованием.
      </p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={accept}
          className="bg-white text-black px-4 py-2 rounded-md text-sm"
        >
          Понятно
        </button>

        <a
          href="/privacy"
          className="text-sm underline self-center"
        >
          Подробнее
        </a>
      </div>
    </div>
  );
}