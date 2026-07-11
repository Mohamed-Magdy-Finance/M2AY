import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bold, Italic, Heading2, List, Link as LinkIcon, Eye, Pencil } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}

export default function MarkdownEditor({ value, onChange, rows = 10, placeholder }: MarkdownEditorProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wrapSelection = (before: string, after: string = before) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);
    const newValue = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(newValue);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  };

  const insertLinePrefix = (prefix: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const newValue = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    onChange(newValue);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between border-b bg-muted/40 px-2 py-1">
        <div className="flex items-center gap-1">
          <Button type="button" size="icon" variant="ghost" className="h-7 w-7" onClick={() => wrapSelection("**")} title="Bold">
            <Bold className="w-3.5 h-3.5" />
          </Button>
          <Button type="button" size="icon" variant="ghost" className="h-7 w-7" onClick={() => wrapSelection("*")} title="Italic">
            <Italic className="w-3.5 h-3.5" />
          </Button>
          <Button type="button" size="icon" variant="ghost" className="h-7 w-7" onClick={() => insertLinePrefix("## ")} title="Heading">
            <Heading2 className="w-3.5 h-3.5" />
          </Button>
          <Button type="button" size="icon" variant="ghost" className="h-7 w-7" onClick={() => insertLinePrefix("- ")} title="List">
            <List className="w-3.5 h-3.5" />
          </Button>
          <Button type="button" size="icon" variant="ghost" className="h-7 w-7" onClick={() => wrapSelection("[", "](url)")} title="Link">
            <LinkIcon className="w-3.5 h-3.5" />
          </Button>
        </div>
        <div className="flex gap-1">
          <Button type="button" size="sm" variant={mode === "write" ? "secondary" : "ghost"} className="h-7 gap-1 text-xs" onClick={() => setMode("write")}>
            <Pencil className="w-3 h-3" /> Write
          </Button>
          <Button type="button" size="sm" variant={mode === "preview" ? "secondary" : "ghost"} className="h-7 gap-1 text-xs" onClick={() => setMode("preview")}>
            <Eye className="w-3 h-3" /> Preview
          </Button>
        </div>
      </div>

      {mode === "write" ? (
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="border-0 rounded-none focus-visible:ring-0"
        />
      ) : (
        <div className="prose dark:prose-invert max-w-none p-4 text-sm" style={{ minHeight: `${rows * 1.5}rem` }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value || "*Nothing to preview yet*"}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
