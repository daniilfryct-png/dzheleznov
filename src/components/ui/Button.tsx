"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "outline" | "ghost" | "buy";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "btn-ghost",
    buy: "btn-buy",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: "primary" | "outline" | "ghost" | "buy";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  onClick,
}: ButtonLinkProps) {
  const variants = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "btn-ghost",
    buy: "btn-buy",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="inline-block"
    >
      <Link href={href} onClick={onClick} className={cn(variants[variant], className)}>
        {children}
      </Link>
    </motion.div>
  );
}
