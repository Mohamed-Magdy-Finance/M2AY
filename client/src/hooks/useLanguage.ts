import { useParams, useLocation } from "wouter";

export type Lang = "ar" | "en";

/**
 * Reads the current language from the URL prefix (e.g. /ar/chapters -> "ar").
 * This makes every page have a real, distinct, crawlable URL per language
 * instead of a client-side-only toggle — important for hreflang/SEO.
 */
export function useLanguage() {
  const params = useParams<{ lang?: string }>();
  const [location, navigate] = useLocation();
  const lang: Lang = params.lang === "en" ? "en" : "ar";
  const isAr = lang === "ar";

  const pathWithoutLangPrefix = location.replace(/^\/(ar|en)/, "") || "/";

  const switchLanguage = (target: Lang) => {
    navigate(`/${target}${pathWithoutLangPrefix === "/" ? "" : pathWithoutLangPrefix}`);
  };

  /** Build an internal link that stays within the current language. */
  const lp = (path: string) => `/${lang}${path.startsWith("/") ? path : `/${path}`}`;

  return { lang, isAr, switchLanguage, lp, pathWithoutLangPrefix };
}
