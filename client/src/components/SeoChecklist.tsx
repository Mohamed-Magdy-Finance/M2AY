import { Check, X } from "lucide-react";

interface SeoChecklistProps {
  items: { label: string; filled: boolean }[];
}

export default function SeoChecklist({ items }: SeoChecklistProps) {
  const doneCount = items.filter(i => i.filled).length;

  return (
    <div className="rounded-lg border p-3 bg-muted/30">
      <p className="text-xs font-semibold mb-2">SEO Checklist ({doneCount}/{items.length})</p>
      <div className="grid grid-cols-2 gap-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs">
            {item.filled ? (
              <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
            )}
            <span className={item.filled ? "" : "opacity-50"}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
