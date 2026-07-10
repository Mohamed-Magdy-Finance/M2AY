import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { resolvePageMeta, injectMetaIntoHtml } from "./seo";

/**
 * `vite` is a devDependency, dynamically imported so it's never required at
 * production startup (a production install skips devDependencies entirely —
 * this matters for Docker-based free hosts like Back4app).
 *
 * Note: this intentionally does NOT import the shared `vite.config.ts` — that
 * file statically imports @vitejs/plugin-react and @tailwindcss/vite, which
 * are also devDependencies. Importing it here would pull those into this
 * server file's bundle graph at build time, defeating the whole point of the
 * dynamic import. The handful of settings actually needed for the dev
 * middleware server are duplicated inline below instead.
 */
export async function setupVite(app: Express, server: Server) {
  const { createServer: createViteServer } = await import("vite");

  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    root: path.resolve(import.meta.dirname, "../..", "client"),
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "../..", "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "../..", "shared"),
      },
    },
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist — inject real per-route SEO meta tags first
  app.use("*", async (req, res) => {
    try {
      const indexPath = path.resolve(distPath, "index.html");
      let html = await fs.promises.readFile(indexPath, "utf-8");
      const origin = `${req.protocol}://${req.get("host")}`;
      const cleanPath = req.originalUrl.split("?")[0];
      const meta = await resolvePageMeta(cleanPath, origin);
      html = injectMetaIntoHtml(html, meta, cleanPath, origin);
      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (error) {
      console.error("[SEO] Failed to inject meta tags, serving default HTML:", error);
      res.sendFile(path.resolve(distPath, "index.html"));
    }
  });
}
