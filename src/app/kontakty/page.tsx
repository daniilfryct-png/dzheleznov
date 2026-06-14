"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

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
                  <a href="mailto:studio@dzheleznov.com" className="hover:text-text transition-colors">
                    studio@dzheleznov.com
                  </a>
                </p>
                <p>
                  <a href="https://t.me/dzheleznov" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
                    Telegram — @dzheleznov
                  </a>
                </p>
                <p>
                  <a href="https://instagram.com/dzheleznov" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
                    Instagram — @dzheleznov
                  </a>
                </p>
                <p className="text-muted">+7 (495) 123-45-67</p>
              </div>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-widest mb-4">Шоурум</h2>
              <p className="text-sm text-muted leading-relaxed">
                ул. Пятницкая, 2/38, стр. 3<br />
                Москва, Россия<br />
                Пн–Сб: 12:00–20:00
              </p>
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
                <button type="submit" className="btn-primary w-full">Отправить</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
