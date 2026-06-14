"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="py-10 md:py-14 border-y border-border">
      <div className="container-store max-w-xl mx-auto text-center">
        <h2 className="section-title mb-2">Будьте в курсе</h2>
        <p className="text-sm text-muted mb-6">Новые коллекции, показы и закрытые презентации</p>
        {done ? (
          <p className="text-text text-sm">Спасибо. Вы подписаны.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }} className="flex flex-col sm:flex-row gap-2 w-full">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="input-field w-full sm:flex-1 min-w-0" />
            <button type="submit" className="btn-primary w-full sm:w-auto sm:flex-shrink-0">Подписаться</button>
          </form>
        )}
      </div>
    </section>
  );
}
