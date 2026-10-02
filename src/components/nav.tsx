"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Vue d’ensemble" },
  { href: "/clients", label: "Clients" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full flex-col bg-surface p-4 md:w-60 md:shrink-0 md:p-6">
      <p className="flex items-center gap-2 font-bold">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-sm text-white">
          P
        </span>
        PAP Customers
      </p>

      <p className="mt-6 hidden text-xs uppercase tracking-wide md:block">
        Espace commercial
      </p>

      <ul className="mt-4 flex gap-2 md:mt-3 md:flex-col md:gap-1">
        {links.map((link) => (
          <li key={link.href} className="flex-1 md:flex-none">
            <Link
              href={link.href}
              className={`block rounded-lg px-3 py-2 text-center text-sm md:text-left ${
                pathname === link.href ? "bg-primary font-medium text-white" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-auto hidden items-center gap-2 pt-6 text-sm md:flex">
        <span className="flex size-7 items-center justify-center rounded-full bg-background text-xs font-bold text-primary">
          YG
        </span>
        Mon espace
      </p>
    </nav>
  );
}
