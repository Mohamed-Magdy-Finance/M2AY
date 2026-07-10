import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
  path: string; // path WITHOUT the /ar or /en prefix, e.g. "/chapters/5"
  image?: string;
  type?: "website" | "article";
}

const SITE_NAME = "M2AY";
const DEFAULT_IMAGE = "/images/mohamed-magdy.jpg";

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkTag(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  let el = document.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets per-page SEO metadata: title, description, canonical URL, hreflang alternates,
 * Open Graph, and Twitter Card tags. `path` should be the language-neutral path
 * (e.g. "/chapters/5") — this hook builds the /ar and /en URLs itself.
 */
export function useSEO({ title, description, path, image, type = "website" }: SEOOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    setMetaTag("name", "description", description);

    const origin = window.location.origin;
    const arUrl = `${origin}/ar${path === "/" ? "" : path}`;
    const enUrl = `${origin}/en${path === "/" ? "" : path}`;
    const currentLang = window.location.pathname.startsWith("/en") ? "en" : "ar";
    const canonicalUrl = currentLang === "en" ? enUrl : arUrl;

    setLinkTag("canonical", canonicalUrl);
    setLinkTag("alternate", arUrl, "ar");
    setLinkTag("alternate", enUrl, "en");
    setLinkTag("alternate", arUrl, "x-default");

    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", `${origin}${image ?? DEFAULT_IMAGE}`);
    setMetaTag("property", "og:site_name", SITE_NAME);
    setMetaTag("property", "og:locale", currentLang === "en" ? "en_US" : "ar_EG");

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", `${origin}${image ?? DEFAULT_IMAGE}`);
  }, [title, description, path, image, type]);
}

/**
 * Injects a JSON-LD structured data script into <head>. Useful for Article/Course schema on chapter pages.
 */
export function useJsonLd(data: Record<string, unknown> | null) {
  useEffect(() => {
    if (!data) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [data]);
}
