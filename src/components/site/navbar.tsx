"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const DesktopLinks = () => (
    <>
      {site.nav.map((n) => (
        <Link
          key={n.href}
          href={n.href}
          className={`transition-colors text-base font-medium
            ${
              pathname === n.href
                ? "text-brand-500 border-brand-500"
                : "text-neutral-800 hover:text-brand-500"
            }`}
        >
          {n.label}
        </Link>
      ))}
    </>
  );

  const MobileLinks = () => (
    <nav className="mt-6 space-y-2">
      {site.nav.map((n) => (
        <SheetClose asChild key={n.href}>
          <Link
            href={n.href}
            className={`block py-2 text-lg font-medium
              ${
                pathname === n.href
                  ? "text-brand-500"
                  : "text-neutral-800 hover:text-brand-500"
              }`}
          >
            {n.label}
          </Link>
        </SheetClose>
      ))}
      <SheetClose asChild>
        <Button
          asChild
          className="mt-6 w-full rounded-xl bg-brand-500 text-ink hover:opacity-90"
        >
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSecQNqkvEsXhKS50PiNAqNSkibYckHafXp8qjHsFc5BQiGdhg/viewform"
            target="_blank"
          >
            Apply
          </Link>
        </Button>
      </SheetClose>
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-black/5">
      <div className="max-w-6xl mx-auto flex items-center justify-between container-px py-4">
        <Link href="/" className="font-black text-xl text-ink">
          My<span className="font-extrabold">Future</span>
          <span className="text-brand-500">Links</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <DesktopLinks />
        </nav>
        <div className="hidden md:block">
          <Button
            asChild
            className="rounded-xl bg-brand-500 text-ink hover:opacity-90"
          >
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSecQNqkvEsXhKS50PiNAqNSkibYckHafXp8qjHsFc5BQiGdhg/viewform"
              target="_blank"
            >
              Apply
            </Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="rounded-xl">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            {/* ✅ full width on phones; narrow on >=sm; no border line */}
            <SheetContent
              side="right"
              className="w-full max-w-[100vw] sm:max-w-80 p-6 rounded-none sm:rounded-none"
            >
              <SheetHeader>
                <SheetTitle className="text-left">
                  My<span className="font-extrabold">Future</span>
                  <span className="text-brand-500">Links</span>
                </SheetTitle>
              </SheetHeader>
              <MobileLinks />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
