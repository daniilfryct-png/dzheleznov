"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { cn } from "@/lib/utils";
import { SearchModal } from "./SearchModal";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/katalog", label: "Каталог" },
  { href: "/kolekcii", label: "Коллекции" },
  { href: "/arkhiv", label: "Архив" },
  { href: "/o-brende", label: "О бренде" },
  { href: "/kontakty", label: "Контакты" },
];

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" /><path d="M20 20l-3-3" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20.5l-1.1-1C5.4 14.9 2 11.6 2 7.5 2 4.4 4.4 2 7.5 2c1.7 0 3.4.8 4.5 2.1C13.1 2.8 14.8 2 16.5 2 19.6 2 22 4.4 22 7.5c0 4.1-3.4 7.4-8.9 11.9L12 20.5z" />
    </svg>
  );
}

function IconBag() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 7h12l-1 14H7L6 7z" /><path d="M9 7V5a3 3 0 016 0v2" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, setIsOpen } = useCart();
  const { count: favCount } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 bg-white transition-shadow duration-300",
          scrolled && "shadow-sm border-b border-border"
        )}
      >
        <div className="container-store">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-14 md:h-16">
            <div className="flex items-center justify-self-start min-w-0">
              <button
                className="md:hidden p-2 -ml-2"
                onClick={() => setMobileOpen(true)}
                aria-label="Меню"
              >
                <IconMenu />
              </button>

              <nav className="hidden md:flex items-center gap-5 lg:gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-xs uppercase tracking-widest transition-colors duration-200 whitespace-nowrap",
                      isActive(link.href) ? "text-text font-medium" : "text-muted hover:text-text"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <Link
              href="/"
              className="justify-self-center font-display text-xl md:text-2xl tracking-[0.25em] uppercase px-2"
            >
              D.ZHELEZNOV
            </Link>

            <div className="flex items-center justify-self-end gap-1 md:gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:text-muted transition-colors"
                aria-label="Поиск"
              >
                <IconSearch />
              </button>
              <Link href="/kontakty" className="hidden sm:block p-2 hover:text-muted transition-colors" aria-label="Аккаунт">
                <IconUser />
              </Link>
              <Link href="/izbrannoe" className="relative p-2 hover:text-muted transition-colors" aria-label="Избранное">
                <IconHeart />
                {favCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-text text-white text-[9px] flex items-center justify-center">
                    {favCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 hover:text-muted transition-colors"
                aria-label="Корзина"
              >
                <IconBag />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-text text-white text-[9px] flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </>
  );
}
