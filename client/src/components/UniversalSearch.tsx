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
import { BookOpen, FileSpreadsheet, HelpCircle, Search } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { chapters, templates, questionBank } from "@/data";

export default function UniversalSearch() {
  const { isAr, lp } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();

  // البحث في البيانات الثابتة
  const searchResults = useMemo(() => {
    if (query.trim().length < 2) return { chapters: [], templates: [], questions: [] };

    const q = query.toLowerCase();

    return {
      chapters: chapters.filter(c =>
        (isAr ? c.titleAr : c.titleEn).toLowerCase().includes(q) ||
        (isAr ? c.descriptionAr : c.descriptionEn).toLowerCase().includes(q)
      ),
      templates: templates.filter(t =>
        (isAr ? t.titleAr : t.titleEn).toLowerCase().includes(q) ||
        (isAr ? t.descriptionAr : t.descriptionEn).toLowerCase().includes(q)
      ),
      questions: questionBank.categories.filter(cat =>
        (isAr ? cat.titleAr : cat.titleEn).toLowerCase().includes(q)
      ),
    };
  }, [query, isAr]);

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
        <span className="text-xs opacity-50 hidden sm:inline">⌘K</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={isAr ? "ابحث في الفصول والقوالب والأسئلة..." : "Search chapters, templates, questions..."}
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>{isAr ? "لا توجد نتائج" : "No results found"}</CommandEmpty>

          {searchResults.chapters.length > 0 && (
            <CommandGroup heading={isAr ? "الفصول" : "Chapters"}>
              {searchResults.chapters.map(ch => (
                <CommandItem
                  key={ch.id}
                  value={ch.id}
                  onSelect={() => goTo(`/chapters/${ch.id}`)}
                  className="cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 me-2" />
                  <div className="flex-1">
                    <p className="font-medium">{isAr ? ch.titleAr : ch.titleEn}</p>
                    <p className="text-xs opacity-60">{isAr ? ch.descriptionAr : ch.descriptionEn}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {searchResults.templates.length > 0 && (
            <CommandGroup heading={isAr ? "القوالب" : "Templates"}>
              {searchResults.templates.map(t => (
                <CommandItem
                  key={t.id}
                  value={t.id}
                  onSelect={() => goTo(`/templates/${t.id}`)}
                  className="cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 me-2" />
                  <div className="flex-1">
                    <p className="font-medium">{isAr ? t.titleAr : t.titleEn}</p>
                    <p className="text-xs opacity-60">{isAr ? t.descriptionAr : t.descriptionEn}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {searchResults.questions.length > 0 && (
            <CommandGroup heading={isAr ? "فئات الأسئلة" : "Question Categories"}>
              {searchResults.questions.map(cat => (
                <CommandItem
                  key={cat.id}
                  value={cat.id}
                  onSelect={() => goTo(`/question-bank/${cat.id}`)}
                  className="cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 me-2" />
                  <div className="flex-1">
                    <p className="font-medium">{isAr ? cat.titleAr : cat.titleEn}</p>
                    <p className="text-xs opacity-60">{isAr ? cat.descriptionAr : cat.descriptionEn}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
