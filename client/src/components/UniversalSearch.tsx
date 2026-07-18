import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { BookOpen, FileSpreadsheet, HelpCircle, Search, Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Chapter } from "@/data/chapters";
import type { Template } from "@/data/templates";
import type { QuestionCategory } from "@/data/question-categories";

interface SearchableData {
  chapters: Chapter[];
  templates: Template[];
  categories: QuestionCategory[];
}

export default function UniversalSearch() {
  const { isAr, lp } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();
  const [data, setData] = useState<SearchableData | null>(null);
  const [loading, setLoading] = useState(false);

  // Lazy-load the searchable data only once the dialog is actually opened — this
  // component sits in the header on every page, so eagerly importing it here would
  // pull chapter/template data into pages (like the homepage) that don't need it.
  useEffect(() => {
    if (!open || data || loading) return;
    setLoading(true);
    Promise.all([
      import("@/data/chapters"),
      import("@/data/templates"),
      import("@/data/question-categories"),
    ]).then(([chaptersMod, templatesMod, categoriesMod]) => {
      setData({
        chapters: chaptersMod.chapters,
        templates: templatesMod.templates,
        categories: categoriesMod.questionCategories,
      });
      setLoading(false);
    });
  }, [open, data, loading]);

  const searchResults = useMemo(() => {
    if (!data || query.trim().length < 2) return { chapters: [], templates: [], categories: [] };
    const q = query.toLowerCase();

    return {
      chapters: data.chapters.filter(
        c =>
          c.arabicTitle.toLowerCase().includes(q) ||
          c.englishTitle.toLowerCase().includes(q) ||
          (c.summary ?? "").toLowerCase().includes(q)
      ).slice(0, 6),
      templates: data.templates.filter(
        t =>
          t.arabicName.toLowerCase().includes(q) ||
          t.englishName.toLowerCase().includes(q) ||
          (t.shortDescription ?? "").toLowerCase().includes(q)
      ).slice(0, 6),
      categories: data.categories.filter(
        cat => cat.arabicName.toLowerCase().includes(q) || cat.englishName.toLowerCase().includes(q)
      ).slice(0, 6),
    };
  }, [query, data]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const goTo = (path: string) => {
    setOpen(false);
    setQuery("");
    navigate(lp(path));
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-full px-3 py-1.5 hover:bg-muted/50 transition-colors"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{isAr ? "بحث..." : "Search..."}</span>
        <kbd className="hidden sm:inline text-[10px] opacity-60 border rounded px-1">⌘K</kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={isAr ? "دور في الفصول والقوالب والأسئلة..." : "Search chapters, templates, questions..."}
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {loading ? (
            <div className="flex items-center justify-center py-6 gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              {isAr ? "جاري التحميل..." : "Loading..."}
            </div>
          ) : query.trim().length < 2 ? (
            <CommandEmpty>{isAr ? "اكتب حرفين على الأقل" : "Type at least 2 characters"}</CommandEmpty>
          ) : searchResults.chapters.length === 0 && searchResults.templates.length === 0 && searchResults.categories.length === 0 ? (
            <CommandEmpty>{isAr ? "مفيش نتائج" : "No results found"}</CommandEmpty>
          ) : (
            <>
              {searchResults.chapters.length > 0 && (
                <CommandGroup heading={isAr ? "📚 الفصول" : "📚 Chapters"}>
                  {searchResults.chapters.map(ch => (
                    <CommandItem key={`ch-${ch.id}`} value={`chapter-${ch.id}`} onSelect={() => goTo(`/chapters/${ch.id}`)} className="gap-2">
                      <BookOpen className="w-4 h-4 shrink-0 opacity-60" />
                      {isAr ? ch.arabicTitle : ch.englishTitle}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {searchResults.templates.length > 0 && (
                <CommandGroup heading={isAr ? "📄 القوالب" : "📄 Templates"}>
                  {searchResults.templates.map(t => (
                    <CommandItem key={`t-${t.id}`} value={`template-${t.id}`} onSelect={() => goTo(`/templates/${t.id}`)} className="gap-2">
                      <FileSpreadsheet className="w-4 h-4 shrink-0 opacity-60" />
                      {isAr ? t.arabicName : t.englishName}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {searchResults.categories.length > 0 && (
                <CommandGroup heading={isAr ? "❓ فئات الأسئلة" : "❓ Question Categories"}>
                  {searchResults.categories.map(cat => (
                    <CommandItem key={`c-${cat.id}`} value={`category-${cat.id}`} onSelect={() => goTo(`/question-bank/${cat.id}`)} className="gap-2">
                      <HelpCircle className="w-4 h-4 shrink-0 opacity-60" />
                      {isAr ? cat.arabicName : cat.englishName}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
