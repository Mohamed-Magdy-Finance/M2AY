import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

const FONT = "Tajawal, ui-sans-serif, system-ui, sans-serif";

const LIGHT_VARS = {
  primaryColor: "#1B2A4A",
  primaryTextColor: "#ffffff",
  primaryBorderColor: "#1B2A4A",
  lineColor: "#3B7EB0",
  secondaryColor: "#3B7EB0",
  secondaryTextColor: "#ffffff",
  secondaryBorderColor: "#3B7EB0",
  tertiaryColor: "#eef2f7",
  tertiaryTextColor: "#1B2A4A",
  tertiaryBorderColor: "#cbd5e1",
  fontSize: "16px",
};

const DARK_VARS = {
  darkMode: true,
  background: "#0b1220",
  primaryColor: "#16223a",
  primaryTextColor: "#e2e8f0",
  primaryBorderColor: "#3B7EB0",
  lineColor: "#7cb4e0",
  secondaryColor: "#1e293b",
  secondaryTextColor: "#e2e8f0",
  secondaryBorderColor: "#3B7EB0",
  tertiaryColor: "#223049",
  tertiaryTextColor: "#e2e8f0",
  tertiaryBorderColor: "#334155",
  fontSize: "16px",
};

function useIsDark(): boolean {
  const [dark, setDark] = useState<boolean>(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() => {
      setDark(el.classList.contains("dark"));
    });
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

interface MermaidDiagramProps {
  code: string;
  /**
   * Optional marker class (e.g. "language-mermaid") so a wrapping <pre> can
   * recognize this render output and unwrap the fence. Not used for styling.
   */
  className?: string;
}

export default function MermaidDiagram({ code, className }: MermaidDiagramProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const dark = useIsDark();
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const themeKey = dark ? "dark" : "light";

  useEffect(() => {
    let cancelled = false;
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      themeVariables: dark ? DARK_VARS : LIGHT_VARS,
      fontFamily: FONT,
    });
    (async () => {
      try {
        await mermaid.parse(code);
        const { svg: rendered } = await mermaid.render(`mmd-${id}`, code);
        if (!cancelled) {
          setSvg(rendered);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
          setSvg(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, id, themeKey]);

  if (error) {
    return (
      <div dir="ltr" className="mermaid-diagram mermaid-error" role="alert">
        <p className="mermaid-error-title">Mermaid diagram could not be rendered.</p>
        <details>
          <summary>View source</summary>
          <pre>{code}</pre>
        </details>
      </div>
    );
  }

  if (!svg) {
    return (
      <div dir="ltr" className="mermaid-diagram mermaid-loading" aria-busy="true">
        Rendering diagram…
      </div>
    );
  }

  return <div dir="ltr" className={"mermaid-diagram" + (className ? " " + className : "")} dangerouslySetInnerHTML={{ __html: svg }} />;
}
