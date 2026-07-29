import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect, useParams } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Route-level code splitting: each page becomes its own chunk, only downloaded
// when the visitor actually navigates there, instead of all pages loading upfront.
const Home = lazy(() => import("./pages/Home"));
const Chapters = lazy(() => import("./pages/Chapters"));
const ChapterDetail = lazy(() => import("./pages/ChapterDetail"));
const Templates = lazy(() => import("./pages/Templates"));
const TemplateDetail = lazy(() => import("./pages/TemplateDetail"));
const QuestionBank = lazy(() => import("./pages/QuestionBank"));
const QuestionBankCategory = lazy(() => import("./pages/QuestionBankCategory"));
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const WorkDetail = lazy(() => import("./pages/WorkDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));

/** Guards :lang to only ever be "ar" or "en" — anything else falls through to 404. */
function LangGuard({ children }: { children: React.ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  if (lang !== "ar" && lang !== "en") return <NotFound />;
  return <>{children}</>;
}

/** Minimal, theme-aware loading state shown briefly while a page chunk downloads. */
function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
      <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        {/* Bare root and legacy unprefixed paths redirect to the Arabic (default) version */}
        <Route path="/" component={() => <Redirect to="/ar" />} />

        <Route path="/:lang/">
          {() => <LangGuard><Home /></LangGuard>}
        </Route>
        <Route path="/:lang/chapters">
          {() => <LangGuard><Chapters /></LangGuard>}
        </Route>
        <Route path="/:lang/chapters/:id">
          {() => <LangGuard><ChapterDetail /></LangGuard>}
        </Route>
        <Route path="/:lang/templates">
          {() => <LangGuard><Templates /></LangGuard>}
        </Route>
        <Route path="/:lang/templates/:id">
          {() => <LangGuard><TemplateDetail /></LangGuard>}
        </Route>
        <Route path="/:lang/question-bank">
          {() => <LangGuard><QuestionBank /></LangGuard>}
        </Route>
        <Route path="/:lang/question-bank/:categoryId">
          {() => <LangGuard><QuestionBankCategory /></LangGuard>}
        </Route>
        <Route path="/:lang/about">
          {() => <LangGuard><About /></LangGuard>}
        </Route>
        <Route path="/:lang/work">
          {() => <LangGuard><Work /></LangGuard>}
        </Route>
        <Route path="/:lang/work/:slug">
          {() => <LangGuard><WorkDetail /></LangGuard>}
        </Route>
        <Route path="/:lang/privacy-policy">
          {() => <LangGuard><PrivacyPolicy /></LangGuard>}
        </Route>
        <Route path="/:lang/terms-of-use">
          {() => <LangGuard><TermsOfUse /></LangGuard>}
        </Route>

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
