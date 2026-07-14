import { Link } from "wouter";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface SectionCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  isAr?: boolean;
}

export default function SectionCard({
  href,
  icon,
  title,
  description,
  isAr = false,
}: SectionCardProps) {
  return (
    <Link href={href} className="block group h-full">
      <div
        className="h-full rounded-3xl p-6 md:p-8 transition-all duration-250 cursor-pointer border"
        style={{
          background: "var(--bg-white)",
          boxShadow: "var(--shadow-sm)",
          borderColor: "var(--border)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-4px)";
          el.style.boxShadow = "var(--shadow-hover)";
          el.style.borderColor = "var(--accent)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "var(--shadow-sm)";
          el.style.borderColor = "var(--border)";
        }}
      >
        {/* Icon Container */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
          style={{
            background: "var(--accent-light)",
            color: "var(--accent)",
          }}
        >
          <div className="w-7 h-7 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 flex-1 mb-6">
          <h3
            className="text-xl md:text-2xl font-bold transition-colors duration-300 group-hover:text-accent"
            style={{ color: "var(--primary)" }}
          >
            {title}
          </h3>
          <p
            className="text-base md:text-lg leading-relaxed opacity-75 transition-opacity duration-300 group-hover:opacity-90"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>
        </div>

        {/* CTA Arrow */}
        <div
          className="flex items-center gap-2 font-semibold text-base transition-all duration-300"
          style={{ color: "var(--accent)" }}
        >
          <span>{isAr ? "اكتشف المزيد" : "Learn More"}</span>
          {isAr ? (
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
          ) : (
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </div>
      </div>
    </Link>
  );
}
