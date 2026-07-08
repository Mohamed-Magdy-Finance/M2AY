import { Link } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

interface SiteHeaderProps {
  siteName?: string | null;
}

export default function SiteHeader({ siteName }: SiteHeaderProps) {
  const { lang, isAr, switchLanguage, lp, pathWithoutLangPrefix } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    { href: "/", label: isAr ? "الرئيسية" : "Home" },
    { href: "/chapters", label: isAr ? "الدليل" : "Guide" },
    { href: "/templates", label: isAr ? "القوالب" : "Templates" },
    { href: "/question-bank", label: isAr ? "بنك الأسئلة" : "Question Bank" },
    { href: "/about", label: isAr ? "من أنا" : "About" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href={lp("/")} className="text-xl font-extrabold tracking-tight" style={{ color: "var(--accent)" }}>
          {siteName || "M2AY"}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {nav.map(item => (
            <Link
              key={item.href}
              href={lp(item.href)}
              className={`text-sm font-medium transition-colors hover:text-[var(--accent)] ${
                pathWithoutLangPrefix === item.href ? "text-[var(--accent)]" : "text-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex rounded-full border border-border overflow-hidden text-xs font-semibold">
            <button
              onClick={() => switchLanguage("ar")}
              className={`px-3 py-1.5 transition-colors ${lang === "ar" ? "bg-[var(--accent)] text-[var(--accent-foreground)]" : ""}`}
            >
              AR
            </button>
            <button
              onClick={() => switchLanguage("en")}
              className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-[var(--accent)] text-[var(--accent-foreground)]" : ""}`}
            >
              EN
            </button>
          </div>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border px-4 py-3 flex flex-col gap-3">
          {nav.map(item => (
            <Link
              key={item.href}
              href={lp(item.href)}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
