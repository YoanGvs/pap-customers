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
    <nav className="w-full bg-surface p-4 md:w-60 md:shrink-0 md:p-6">
      <p className="font-bold">PAP Customers</p>
      <ul className="mt-4 flex gap-4 md:flex-col md:gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={
                pathname === link.href ? "font-medium text-primary" : ""
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
