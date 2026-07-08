import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { getAllChapters, getAllTemplates } from "../db";

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));
  app.use(cookieParser());

  // SEO: robots.txt
  app.get("/robots.txt", (req, res) => {
    const origin = `${req.protocol}://${req.get("host")}`;
    res.type("text/plain").send(
      `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${origin}/sitemap.xml\n`
    );
  });

  // SEO: dynamic sitemap.xml (reflects real published chapters + active templates, both languages)
  app.get("/sitemap.xml", async (req, res) => {
    const origin = `${req.protocol}://${req.get("host")}`;
    const staticPaths = ["/", "/chapters", "/templates", "/question-bank", "/about", "/privacy-policy", "/terms-of-use"];
    const chapters = await getAllChapters(true);
    const templates = await getAllTemplates(true);

    const neutralPaths = [
      ...staticPaths,
      ...chapters.map(c => `/chapters/${c.id}`),
      ...templates.map(t => `/templates/${t.id}`),
    ];

    const urlEntries = neutralPaths.map(p => {
      const arHref = `${origin}/ar${p === "/" ? "" : p}`;
      const enHref = `${origin}/en${p === "/" ? "" : p}`;
      return `  <url>
    <loc>${arHref}</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${arHref}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enHref}" />
  </url>
  <url>
    <loc>${enHref}</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${arHref}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enHref}" />
  </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlEntries.join("\n")}\n</urlset>`;

    res.type("application/xml").send(xml);
  });

  // tRPC API — powers the public site data and the admin dashboard
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // development mode uses Vite, production mode serves the built static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "3000");
  server.listen(port, () => {
    console.log(`M2AY server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
