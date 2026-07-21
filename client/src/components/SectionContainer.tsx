import { ReactNode } from "react";

interface SectionContainerProps {
  title: string;
  description: string;
  children: ReactNode;
  isDark?: boolean;
}

export default function SectionContainer({
  title,
  description,
  children,
  isDark = false,
}: SectionContainerProps) {
  return (
    <section
      className="w-full transition-colors duration-300"
      style={{
        background: isDark ? "var(--bg-soft)" : "var(--bg-white)",
        paddingTop: "120px",
        paddingBottom: "120px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{
              color: "var(--primary)",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h2>
          <p
            className="text-lg md:text-xl leading-relaxed opacity-75"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {children}
        </div>
      </div>
    </section>
  );
}
