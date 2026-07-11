import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import UniversalSearch from "./UniversalSearch";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

interface SiteHeaderProps {
  siteName?: string | null;
}

export default function SiteHeader({ siteName }: SiteHeaderProps) {
  const { lang, isAr, switchLanguage, lp, pathWithoutLangPrefix } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nav = [
    { href: "/", label: isAr ? "الرئيسية" : "Home" },
    { href: "/chapters", label: isAr ? "الدليل" : "Guide" },
    { href: "/templates", label: isAr ? "القوالب" : "Templates" },
    { href: "/question-bank", label: isAr ? "بنك الأسئلة" : "Question Bank" },
    { href: "/about", label: isAr ? "من أنا" : "About" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md border-b border-border"
          : "bg-white/80 backdrop-blur-md border-b border-border/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href={lp("/")} className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white transition-all group-hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)" }}
          >
            M
          </div>
          <span
            className="text-lg font-bold tracking-tight hidden sm:inline transition-colors group-hover:text-accent"
            style={{ color: "var(--primary)" }}
          >
            {siteName || "M2AY"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <Link key={item.href} href={lp(item.href)}>
              <a
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  pathWithoutLangPrefix === item.href
                    ? "text-accent font-semibold"
                    : "text-foreground/70 hover:text-foreground hover:bg-accent/5"
                }`}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:block">
            <UniversalSearch />
          </div>

          {/* Language Switcher */}
          <div className="hidden sm:flex rounded-lg border border-border/50 overflow-hidden text-xs font-semibold bg-background">
            <button
              onClick={() => switchLanguage("ar")}
              className={`px-3 py-1.5 transition-all duration-200 ${
                lang === "ar"
                  ? "bg-accent text-white"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              العربية
            </button>
            <div className="w-px bg-border/30" />
            <button
              onClick={() => switchLanguage("en")}
              className={`px-3 py-1.5 transition-all duration-200 ${
                lang === "en"
                  ? "bg-accent text-white"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              English
            </button>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border/30 bg-white/95 backdrop-blur-sm px-4 py-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {nav.map((item) => (
            <Link key={item.href} href={lp(item.href)}>
              <a
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  pathWithoutLangPrefix === item.href
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-foreground/70 hover:bg-accent/5 hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            </Link>
          ))}

          {/* Mobile Language Switcher */}
          <div className="flex gap-2 mt-2 pt-2 border-t border-border/30">
            <button
              onClick={() => {
                switchLanguage("ar");
                setMobileOpen(false);
              }}
              className={`flex-1 px-3 py-2 text-xs font-semibold rounded-md transition-all ${
                lang === "ar"
                  ? "bg-accent text-white"
                  : "bg-background border border-border/30 text-foreground/60"
              }`}
            >
              العربية
            </button>
            <button
              onClick={() => {
                switchLanguage("en");
                setMobileOpen(false);
              }}
              className={`flex-1 px-3 py-2 text-xs font-semibold rounded-md transition-all ${
                lang === "en"
                  ? "bg-accent text-white"
                  : "bg-background border border-border/30 text-foreground/60"
              }`}
            >
              English
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
