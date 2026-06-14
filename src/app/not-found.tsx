import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-store py-32 text-center">
      <p className="text-xs uppercase tracking-widest text-muted mb-4">404</p>
      <h1 className="font-display text-4xl mb-6">Страница не найдена</h1>
      <Link href="/" className="btn-primary">На главную</Link>
    </div>
  );
}
