"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [agree, setAgree] = useState(false);

  return (
    <div className="py-8 md:py-12">
      <div className="container-store">
        <h1 className="text-2xl md:text-3xl font-display mb-8">Контакты</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-xs uppercase tracking-widest mb-4">Связь</h2>
              <div className="space-y-3 text-sm">
                <p>
                  <a href="mailto:info@d-zheleznov.ru" className="hover:text-text transition-colors">
                    info@d-zheleznov.ru
                  </a>
                </p>
                <p>
                  <a href="https://t.me/willyouhearme" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
                    Telegram — @WILLYOUHEARME
                  </a>
                </p>
                <p>
                  <a href="https://t.me/willyouhearme" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
                    ИНН — 505397473308
                  </a>
                </p>
                <p>
                  <a href="https://www.instagram.com/d.zheleznov_?igsh=cDM5amc3dDg5czRj&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
                    Instagram — @d.zheleznov_
                  </a>
                </p>
                <p className="text-muted">+7 (966) 059-82-68</p>
              </div>
            </div>

          
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-widest mb-4">Написать нам</h2>
            {sent ? (
              <p className="text-text text-sm">Сообщение отправлено. Мы свяжемся с вами.</p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Имя"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field"
                />
                <textarea
                  placeholder="Сообщение"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-field resize-none"
                />
                <label className="flex items-start gap-3 text-xs text-muted">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    required
                    className="mt-1 accent-text"
                  />

                  <span>
                    Я даю согласие на обработку персональных данных и принимаю{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      className="underline hover:text-text"
                    >
                      Политику конфиденциальности
                    </a>.
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={!agree}
                  className="btn-primary w-full disabled:opacity-50"
                >Отправить</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
