import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect, useParams } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Chapters from "./pages/Chapters";
import ChapterDetail from "./pages/ChapterDetail";
import Templates from "./pages/Templates";
import TemplateDetail from "./pages/TemplateDetail";
import QuestionBank from "./pages/QuestionBank";
import QuestionBankCategory from "./pages/QuestionBankCategory";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

/** Guards :lang to only ever be "ar" or "en" — anything else falls through to 404. */
function LangGuard({ children }: { children: React.ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  if (lang !== "ar" && lang !== "en") return <NotFound />;
  return <>{children}</>;
}

function Router() {
  return (
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
      <Route path="/:lang/privacy-policy">
        {() => <LangGuard><PrivacyPolicy /></LangGuard>}
      </Route>
      <Route path="/:lang/terms-of-use">
        {() => <LangGuard><TermsOfUse /></LangGuard>}
      </Route>

      {/* Admin is a single-language (Arabic) internal tool — no /:lang prefix needed */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />

      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
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
