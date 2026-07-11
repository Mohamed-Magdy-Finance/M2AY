import { FileSpreadsheet, TrendingUp, PiggyBank, Calculator, Rocket, BarChart3, Building2 } from "lucide-react";

const CATEGORY_ICONS: Record<string, typeof FileSpreadsheet> = {
  Valuation: TrendingUp,
  Modeling: BarChart3,
  Budgeting: Calculator,
  "Personal Finance": PiggyBank,
  "Accounting Systems": Building2,
  Startup: Rocket,
  "Performance Analysis": BarChart3,
};

const CATEGORY_COLORS: Record<string, string> = {
  Valuation: "#C8A24A",
  Modeling: "#1E4D4F",
  Budgeting: "#2F8F6B",
  "Personal Finance": "#C8A24A",
  "Accounting Systems": "#081826",
  Startup: "#1E4D4F",
  "Performance Analysis": "#081826",
};

interface AutoBannerProps {
  title: string;
  category: string;
  difficultyLevel?: string | null;
  updatedAt?: string | Date | null;
  className?: string;
}

/**
 * Deterministic, zero-cost preview banner. Used instead of an uploaded image when a
 * template has no previewImageUrl set — no AI image generation, no API cost.
 */
export default function AutoBanner({ title, category, difficultyLevel, updatedAt, className }: AutoBannerProps) {
  const Icon = CATEGORY_ICONS[category] ?? FileSpreadsheet;
  const color = CATEGORY_COLORS[category] ?? "#C8A24A";
  const dateLabel = updatedAt ? new Date(updatedAt).toLocaleDateString("ar-EG", { year: "numeric", month: "short" }) : null;

  return (
    <div
      className={`relative w-full aspect-[16/9] rounded-lg overflow-hidden flex flex-col justify-between p-4 ${className ?? ""}`}
      style={{ background: `linear-gradient(135deg, ${color}22, #08182611)` }}
    >
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 85% 15%, ${color} 0%, transparent 45%)`,
      }} />

      <div className="relative flex items-start justify-between">
        <div className="rounded-full p-2" style={{ background: color, color: "#fff" }}>
          <Icon className="w-5 h-5" />
        </div>
        {difficultyLevel && (
          <span
            className="text-[10px] font-bold px-2 py-1 rounded-full"
            style={{ background: "var(--card)", color }}
          >
            {difficultyLevel === "advanced" ? "متقدم" : difficultyLevel === "beginner" ? "مبتدئ" : "متوسط"}
          </span>
        )}
      </div>

      <div className="relative">
        <p className="font-bold text-sm leading-snug line-clamp-2" style={{ color: "var(--foreground)" }}>{title}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] opacity-60">{category}</span>
          {dateLabel && <span className="text-[10px] opacity-50">{dateLabel}</span>}
        </div>
      </div>
    </div>
  );
}
