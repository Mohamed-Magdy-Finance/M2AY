import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const SYMBOLS = [
  { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
  { proName: "FOREXCOM:NSXUSD", title: "Nasdaq 100" },
  { proName: "NASDAQ:AAPL", title: "Apple" },
  { proName: "NASDAQ:MSFT", title: "Microsoft" },
  { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
  { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
];

/**
 * TradingView's free embeddable Ticker Tape widget. No API key, no backend —
 * it's a third-party script that renders itself inside the container div.
 * Re-mounts on theme change since the widget only reads its color theme once at init.
 */
export default function MarketTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      symbols: SYMBOLS,
      showSymbolLogo: true,
      colorTheme: theme, // matches the site's own light/dark mode
      isTransparent: true,
      displayMode: "compact",
      locale: "en",
    });
    container.appendChild(script);
  }, [theme]);

  return (
    <div ref={containerRef} className="tradingview-widget-container w-full" style={{ background: "var(--sidebar)" }} />
  );
}
