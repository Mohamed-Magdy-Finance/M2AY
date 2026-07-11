import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useJsonLd } from "@/hooks/useSEO";
import { useLanguage } from "@/hooks/useLanguage";

interface Crumb {
  label: string;
  href?: string; // language-neutral path, e.g. "/chapters" — omit for the current (last) item
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { isAr, lp } = useLanguage();
  const Chevron = isAr ? ChevronLeft : ChevronRight;

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${window.location.origin}${lp(item.href)}` : undefined,
    })),
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-xs text-muted-foreground mb-6">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <Chevron className="w-3 h-3 opacity-50" />}
          {item.href ? (
            <Link href={lp(item.href)} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
