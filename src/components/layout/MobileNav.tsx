"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] md:hidden"
        >
          <div className="absolute inset-0 bg-black/30" onClick={onClose} />
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute left-0 top-0 bottom-0 w-[80%] max-w-sm bg-white p-6 flex flex-col"
          >
            <button onClick={onClose} className="self-end text-xs uppercase tracking-widest mb-8">
              Закрыть
            </button>
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "text-2xl font-display tracking-wide",
                    pathname.startsWith(link.href) ? "text-text font-medium" : "text-text"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
