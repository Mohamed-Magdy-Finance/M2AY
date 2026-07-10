import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
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

export default function UniversalSearch() {
  const { isAr, lp } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();

  const { data, isFetching } = trpc.public.search.useQuery(
    { query },
    { enabled: query.trim().length > 1 }
  );

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
          placeholder={isAr ? "دور في الفصول، القوالب، والأسئلة..." : "Search chapters, templates, questions..."}
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.trim().length <= 1 ? (
            <CommandEmpty>{isAr ? "اكتب حرفين على الأقل عشان تبدأ البحث" : "Type at least 2 characters to search"}</CommandEmpty>
          ) : isFetching ? (
            <CommandEmpty>{isAr ? "جاري البحث..." : "Searching..."}</CommandEmpty>
          ) : !data || (data.chapters.length === 0 && data.templates.length === 0 && data.questions.length === 0) ? (
            <CommandEmpty>{isAr ? "مفيش نتائج" : "No results found"}</CommandEmpty>
          ) : (
            <>
              {data.chapters.length > 0 && (
                <CommandGroup heading={isAr ? "📚 الفصول" : "📚 Chapters"}>
                  {data.chapters.map(c => (
                    <CommandItem key={`ch-${c.id}`} onSelect={() => goTo(`/chapters/${c.id}`)} className="gap-2">
                      <BookOpen className="w-4 h-4 shrink-0 opacity-60" />
                      {isAr ? c.arabicTitle : c.englishTitle}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {data.templates.length > 0 && (
                <CommandGroup heading={isAr ? "📄 القوالب" : "📄 Templates"}>
                  {data.templates.map(t => (
                    <CommandItem key={`t-${t.id}`} onSelect={() => goTo(`/templates/${t.id}`)} className="gap-2">
                      <FileSpreadsheet className="w-4 h-4 shrink-0 opacity-60" />
                      {isAr ? t.arabicName : t.englishName}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {data.questions.length > 0 && (
                <CommandGroup heading={isAr ? "❓ أسئلة المقابلات" : "❓ Interview Questions"}>
                  {data.questions.map(q => (
                    <CommandItem key={`q-${q.id}`} onSelect={() => goTo(`/question-bank/${q.categoryId}`)} className="gap-2">
                      <HelpCircle className="w-4 h-4 shrink-0 opacity-60" />
                      <span className="truncate">{isAr ? q.question : (q.englishQuestion || q.question)}</span>
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
