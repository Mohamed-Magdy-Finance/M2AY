import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, LogOut } from "lucide-react";

const CATEGORIES = ["Valuation", "Modeling", "Budgeting", "Personal Finance", "Accounting Systems", "Startup", "Performance Analysis"];

export default function AdminDashboard() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("templates");

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8" /></div>;
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">محتاج تسجيل دخول</h1>
          <p className="text-muted-foreground mb-6">لازم تسجل دخول عشان تدخل لوحة التحكم.</p>
          <Button onClick={() => navigate("/admin/login")}>تسجيل الدخول</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">لوحة التحكم</h1>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
          <Button variant="outline" onClick={() => logout()} className="gap-2">
            <LogOut className="w-4 h-4" /> تسجيل خروج
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="templates">القوالب</TabsTrigger>
            <TabsTrigger value="chapters">الفصول</TabsTrigger>
            <TabsTrigger value="questions">بنك الأسئلة</TabsTrigger>
            <TabsTrigger value="consultations">الاستشارات</TabsTrigger>
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="templates"><TemplatesTab /></TabsContent>
          <TabsContent value="chapters"><ChaptersTab /></TabsContent>
          <TabsContent value="questions"><QuestionsTab /></TabsContent>
          <TabsContent value="consultations"><ConsultationsTab /></TabsContent>
          <TabsContent value="profile"><ProfileTab /></TabsContent>
          <TabsContent value="settings"><SettingsTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ------------------- TEMPLATES -------------------
function TemplatesTab() {
  const utils = trpc.useUtils();
  const { data: templates, isLoading } = trpc.admin.templates.list.useQuery();
  const { data: chapters } = trpc.admin.chapters.list.useQuery();
  const [editingId, setEditingId] = useState<number | "new" | null>(null);

  const createMutation = trpc.admin.templates.create.useMutation({
    onSuccess: () => { toast.success("تمت إضافة القالب"); utils.admin.templates.list.invalidate(); setEditingId(null); },
  });
  const updateMutation = trpc.admin.templates.update.useMutation({
    onSuccess: () => { toast.success("تم التحديث"); utils.admin.templates.list.invalidate(); setEditingId(null); },
  });
  const deleteMutation = trpc.admin.templates.delete.useMutation({
    onSuccess: () => { toast.success("تم الحذف"); utils.admin.templates.list.invalidate(); },
  });
  const linkMutation = trpc.admin.chapterTemplateLinks.link.useMutation({
    onSuccess: () => toast.success("تم الربط بالفصل"),
  });

  const [form, setForm] = useState<any>({});

  const startNew = () => { setForm({ category: CATEGORIES[0], difficultyLevel: "intermediate", isActive: true }); setEditingId("new"); };
  const startEdit = (t: any) => { setForm(t); setEditingId(t.id); };

  const save = () => {
    if (editingId === "new") createMutation.mutate(form);
    else updateMutation.mutate({ ...form, id: editingId });
  };

  if (isLoading) return <Loader2 className="animate-spin w-6 h-6 mt-8" />;

  return (
    <Card className="p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">القوالب ({templates?.length ?? 0})</h2>
        <Button onClick={startNew} className="gap-2"><Plus className="w-4 h-4" /> إضافة قالب جديد</Button>
      </div>

      {editingId !== null && (
        <Card className="p-4 mb-6 border-2" style={{ borderColor: "var(--accent)" }}>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <Input placeholder="الاسم بالعربي" value={form.arabicName ?? ""} onChange={e => setForm({ ...form, arabicName: e.target.value })} />
            <Input placeholder="Name in English" value={form.englishName ?? ""} onChange={e => setForm({ ...form, englishName: e.target.value })} />
          </div>
          <Textarea className="mb-3" placeholder="وصف مختصر" value={form.shortDescription ?? ""} onChange={e => setForm({ ...form, shortDescription: e.target.value })} />
          <Textarea className="mb-3" placeholder="شرح تفصيلي" value={form.detailedExplanation ?? ""} onChange={e => setForm({ ...form, detailedExplanation: e.target.value })} />
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue placeholder="التصنيف" /></SelectTrigger>
              <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={form.difficultyLevel} onValueChange={v => setForm({ ...form, difficultyLevel: v })}>
              <SelectTrigger><SelectValue placeholder="المستوى" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">مبتدئ</SelectItem>
                <SelectItem value="intermediate">متوسط</SelectItem>
                <SelectItem value="advanced">متقدم</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <Input placeholder="رابط GitHub Repo" value={form.githubRepoUrl ?? ""} onChange={e => setForm({ ...form, githubRepoUrl: e.target.value })} />
            <Input placeholder="مسار الفولدر في GitHub" value={form.githubFolderPath ?? ""} onChange={e => setForm({ ...form, githubFolderPath: e.target.value })} />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Switch checked={form.isActive ?? true} onCheckedChange={v => setForm({ ...form, isActive: v })} />
            <span className="text-sm">مفعّل (ظاهر في الموقع)</span>
          </div>

          {editingId !== "new" && chapters && (
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">اربط بفصل:</p>
              <Select onValueChange={v => linkMutation.mutate({ chapterId: Number(v), templateId: editingId as number })}>
                <SelectTrigger><SelectValue placeholder="اختار فصل" /></SelectTrigger>
                <SelectContent>
                  {chapters.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.chapterNumber}. {c.arabicTitle}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={save}>حفظ</Button>
            <Button variant="outline" onClick={() => setEditingId(null)}>إلغاء</Button>
          </div>
        </Card>
      )}

      <div className="space-y-2">
        {templates?.map(t => (
          <div key={t.id} className="flex items-center justify-between border rounded-lg p-3">
            <div>
              <p className="font-semibold text-sm flex items-center gap-2">
                {t.arabicName}
                {!t.isActive && <Badge variant="outline">متوقف</Badge>}
              </p>
              <p className="text-xs text-muted-foreground">{t.category} — {t.downloadCount ?? 0} تحميل</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => startEdit(t)}>تعديل</Button>
              <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate({ id: t.id })}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ------------------- CHAPTERS -------------------
function ChaptersTab() {
  const utils = trpc.useUtils();
  const { data: chapters, isLoading } = trpc.admin.chapters.list.useQuery();
  const { data: allTemplates } = trpc.admin.templates.list.useQuery();
  const { data: allCategories } = trpc.admin.questionBank.categories.useQuery();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<any>({});

  const { data: relations } = trpc.admin.chapters.relations.useQuery(
    { id: editingId ?? 0 },
    { enabled: editingId !== null }
  );

  const updateMutation = trpc.admin.chapters.update.useMutation({
    onSuccess: () => { toast.success("تم التحديث"); utils.admin.chapters.list.invalidate(); },
  });
  const toggleStatus = trpc.admin.chapters.update.useMutation({
    onSuccess: () => { toast.success("تم تغيير الحالة"); utils.admin.chapters.list.invalidate(); },
  });
  const linkTemplate = trpc.admin.chapterTemplateLinks.link.useMutation({
    onSuccess: () => { toast.success("تم الربط"); utils.admin.chapters.relations.invalidate(); },
  });
  const unlinkTemplate = trpc.admin.chapterTemplateLinks.unlink.useMutation({
    onSuccess: () => utils.admin.chapters.relations.invalidate(),
  });
  const linkCategory = trpc.admin.chapterQuestionCategoryLinks.link.useMutation({
    onSuccess: () => { toast.success("تم الربط"); utils.admin.chapters.relations.invalidate(); },
  });
  const unlinkCategory = trpc.admin.chapterQuestionCategoryLinks.unlink.useMutation({
    onSuccess: () => utils.admin.chapters.relations.invalidate(),
  });

  const startEdit = (c: any) => { setForm(c); setEditingId(c.id); };
  const save = () => updateMutation.mutate({ ...form, id: editingId });

  if (isLoading) return <Loader2 className="animate-spin w-6 h-6 mt-8" />;

  return (
    <Card className="p-6 mt-6">
      <h2 className="text-xl font-bold mb-6">الفصول ({chapters?.length ?? 0})</h2>
      <div className="space-y-2">
        {chapters?.map(c => (
          <div key={c.id}>
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <p className="font-semibold text-sm">{c.chapterNumber}. {c.arabicTitle}</p>
                <p className="text-xs text-muted-foreground">{c.section}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={c.status === "published"}
                    onCheckedChange={checked => toggleStatus.mutate({ id: c.id, status: checked ? "published" : "draft" })}
                  />
                  <span className="text-xs">{c.status === "published" ? "منشور" : "مسودة"}</span>
                </div>
                <Button size="sm" variant="outline" onClick={() => startEdit(c)}>
                  {editingId === c.id ? "إغلاق" : "تعديل"}
                </Button>
              </div>
            </div>

            {editingId === c.id && (
              <Card className="p-4 mt-2 border-2" style={{ borderColor: "var(--accent)" }}>
                <Tabs defaultValue="general">
                  <TabsList className="grid grid-cols-5 mb-4">
                    <TabsTrigger value="general">عام</TabsTrigger>
                    <TabsTrigger value="content">المحتوى</TabsTrigger>
                    <TabsTrigger value="portfolio">الخاتمة</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                    <TabsTrigger value="relations">الربط</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-2">
                    <div className="grid sm:grid-cols-2 gap-2">
                      <Input value={form.arabicTitle ?? ""} onChange={e => setForm({ ...form, arabicTitle: e.target.value })} placeholder="العنوان بالعربي" />
                      <Input value={form.englishTitle ?? ""} onChange={e => setForm({ ...form, englishTitle: e.target.value })} placeholder="Title in English" />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <Input type="number" value={form.chapterNumber ?? ""} onChange={e => setForm({ ...form, chapterNumber: Number(e.target.value) })} placeholder="رقم الفصل" />
                      <Input value={form.section ?? ""} onChange={e => setForm({ ...form, section: e.target.value })} placeholder="القسم" />
                      <Input type="number" value={form.displayOrder ?? ""} onChange={e => setForm({ ...form, displayOrder: Number(e.target.value) })} placeholder="ترتيب العرض" />
                    </div>
                    <Textarea value={form.description ?? ""} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="وصف مختصر" />
                  </TabsContent>

                  <TabsContent value="content" className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">المحتوى بالعربي (المرجع الأساسي)</p>
                    <Textarea rows={8} value={form.arabicContent ?? ""} onChange={e => setForm({ ...form, arabicContent: e.target.value })} placeholder="المحتوى بالعربي" />
                    <p className="text-xs font-semibold text-muted-foreground mt-3">المحتوى بالإنجليزي (اختياري — لو فاضي، هيظهر تنويه للزوار وهيتعرض العربي بدلاً منه)</p>
                    <Textarea rows={8} value={form.englishContent ?? ""} onChange={e => setForm({ ...form, englishContent: e.target.value })} placeholder="English content (optional)" />
                  </TabsContent>

                  <TabsContent value="portfolio" className="space-y-2">
                    <Textarea value={form.summary ?? ""} onChange={e => setForm({ ...form, summary: e.target.value })} placeholder="الخلاصة والأهداف" />
                    <Textarea value={form.practicalOutput ?? ""} onChange={e => setForm({ ...form, practicalOutput: e.target.value })} placeholder="المخرج العملي" />
                    <Textarea value={form.portfolioTask ?? ""} onChange={e => setForm({ ...form, portfolioTask: e.target.value })} placeholder="مهمة المحفظة" />
                    <Textarea value={form.selfAssessment ?? ""} onChange={e => setForm({ ...form, selfAssessment: e.target.value })} placeholder="التقييم الذاتي" />
                    <Textarea value={form.reflectionQuestion ?? ""} onChange={e => setForm({ ...form, reflectionQuestion: e.target.value })} placeholder="سؤال تفكير" />
                    <Textarea value={form.nextStep ?? ""} onChange={e => setForm({ ...form, nextStep: e.target.value })} placeholder="الخطوة التالية" />
                  </TabsContent>

                  <TabsContent value="seo" className="space-y-2">
                    <p className="text-xs text-muted-foreground mb-2">اتركها فاضية والنظام هيولّد قيم افتراضية تلقائيًا من العنوان والخلاصة.</p>
                    <Input value={form.slug ?? ""} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="Slug (اختياري)" />
                    <Input value={form.seoTitle ?? ""} onChange={e => setForm({ ...form, seoTitle: e.target.value })} placeholder="SEO Title (اختياري)" />
                    <Textarea value={form.seoDescription ?? ""} onChange={e => setForm({ ...form, seoDescription: e.target.value })} placeholder="SEO Description (اختياري)" />
                    <Input value={form.seoKeywords ?? ""} onChange={e => setForm({ ...form, seoKeywords: e.target.value })} placeholder="Keywords, comma, separated (اختياري)" />
                    <Input value={form.ogImage ?? ""} onChange={e => setForm({ ...form, ogImage: e.target.value })} placeholder="Open Graph Image URL (اختياري)" />
                  </TabsContent>

                  <TabsContent value="relations" className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">القوالب المرتبطة</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {relations?.linkedTemplates.map(t => (
                          <Badge key={t.id} variant="secondary" className="gap-1">
                            {t.arabicName}
                            <button onClick={() => unlinkTemplate.mutate({ chapterId: c.id, templateId: t.id })}>×</button>
                          </Badge>
                        ))}
                      </div>
                      <Select onValueChange={v => linkTemplate.mutate({ chapterId: c.id, templateId: Number(v) })}>
                        <SelectTrigger><SelectValue placeholder="اربط قالب جديد" /></SelectTrigger>
                        <SelectContent>
                          {allTemplates?.filter(t => !relations?.linkedTemplates.some(rt => rt.id === t.id)).map(t => (
                            <SelectItem key={t.id} value={String(t.id)}>{t.arabicName}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">فئات أسئلة مرتبطة</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {relations?.linkedCategories.map(cat => (
                          <Badge key={cat.id} variant="secondary" className="gap-1">
                            {cat.arabicName}
                            <button onClick={() => unlinkCategory.mutate({ chapterId: c.id, categoryId: cat.id })}>×</button>
                          </Badge>
                        ))}
                      </div>
                      <Select onValueChange={v => linkCategory.mutate({ chapterId: c.id, categoryId: Number(v) })}>
                        <SelectTrigger><SelectValue placeholder="اربط فئة أسئلة جديدة" /></SelectTrigger>
                        <SelectContent>
                          {allCategories?.filter(cat => !relations?.linkedCategories.some(rc => rc.id === cat.id)).map(cat => (
                            <SelectItem key={cat.id} value={String(cat.id)}>{cat.arabicName}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-2 mt-4">
                  <Button onClick={save}>حفظ</Button>
                  <Button variant="outline" onClick={() => setEditingId(null)}>إغلاق</Button>
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

// ------------------- CONSULTATIONS -------------------
const STATUS_LABELS: Record<string, string> = {
  new: "جديد", in_review: "قيد المراجعة", contacted: "تم التواصل", booked: "تم الحجز", completed: "مكتمل", cancelled: "ملغي",
};

function ConsultationsTab() {
  const utils = trpc.useUtils();
  const { data: requests, isLoading } = trpc.admin.consultationRequests.list.useQuery();
  const updateStatus = trpc.admin.consultationRequests.updateStatus.useMutation({
    onSuccess: () => { toast.success("تم التحديث"); utils.admin.consultationRequests.list.invalidate(); },
  });

  if (isLoading) return <Loader2 className="animate-spin w-6 h-6 mt-8" />;

  return (
    <Card className="p-6 mt-6">
      <h2 className="text-xl font-bold mb-6">طلبات الاستشارة ({requests?.length ?? 0})</h2>
      <div className="space-y-3">
        {requests?.map(r => (
          <div key={r.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold">{r.name}</p>
              <Select value={r.status} onValueChange={v => updateStatus.mutate({ id: r.id, status: v as any })}>
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">{r.email} {r.whatsapp ? `— ${r.whatsapp}` : ""}</p>
            {r.message && <p className="text-sm mt-2">{r.message}</p>}
          </div>
        ))}
        {requests?.length === 0 && <p className="text-muted-foreground text-sm">مفيش طلبات لسه</p>}
      </div>
    </Card>
  );
}

// ------------------- QUESTION BANK -------------------
function QuestionsTab() {
  const utils = trpc.useUtils();
  const { data: categories } = trpc.admin.questionBank.categories.useQuery();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { data: questions } = trpc.admin.questionBank.questionsByCategory.useQuery(
    { categoryId: activeCategory ?? 0 },
    { enabled: !!activeCategory }
  );
  const [form, setForm] = useState<any>({});
  const [adding, setAdding] = useState(false);

  const createMutation = trpc.admin.questionBank.createQuestion.useMutation({
    onSuccess: () => { toast.success("تمت إضافة السؤال"); utils.admin.questionBank.questionsByCategory.invalidate(); setAdding(false); setForm({}); },
  });
  const deleteMutation = trpc.admin.questionBank.deleteQuestion.useMutation({
    onSuccess: () => { toast.success("تم الحذف"); utils.admin.questionBank.questionsByCategory.invalidate(); },
  });

  return (
    <Card className="p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">بنك أسئلة المقابلات</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map(c => (
          <Button key={c.id} size="sm" variant={activeCategory === c.id ? "default" : "outline"} onClick={() => setActiveCategory(c.id)}>
            {c.arabicName}
          </Button>
        ))}
      </div>

      {activeCategory && (
        <>
          <Button size="sm" className="mb-4 gap-2" onClick={() => setAdding(true)}><Plus className="w-4 h-4" /> إضافة سؤال</Button>

          {adding && (
            <Card className="p-4 mb-4 border-2" style={{ borderColor: "var(--accent)" }}>
              <Textarea className="mb-2" placeholder="السؤال" value={form.question ?? ""} onChange={e => setForm({ ...form, question: e.target.value })} />
              <Textarea className="mb-2" placeholder="ليه بيتسأل؟" value={form.whyAsked ?? ""} onChange={e => setForm({ ...form, whyAsked: e.target.value })} />
              <Textarea className="mb-2" placeholder="عقلية الـ Interviewer" value={form.interviewerMindset ?? ""} onChange={e => setForm({ ...form, interviewerMindset: e.target.value })} />
              <Textarea className="mb-2" placeholder="الإجابة النموذجية" value={form.modelAnswer ?? ""} onChange={e => setForm({ ...form, modelAnswer: e.target.value })} />
              <Textarea className="mb-2" placeholder="الأخطاء الشائعة" value={form.commonMistakes ?? ""} onChange={e => setForm({ ...form, commonMistakes: e.target.value })} />
              <Textarea className="mb-2" placeholder="سؤال متابعة" value={form.followUpQuestion ?? ""} onChange={e => setForm({ ...form, followUpQuestion: e.target.value })} />
              <Textarea className="mb-3" placeholder="إجابة سؤال المتابعة" value={form.followUpAnswer ?? ""} onChange={e => setForm({ ...form, followUpAnswer: e.target.value })} />
              <div className="flex gap-2">
                <Button onClick={() => createMutation.mutate({ ...form, categoryId: activeCategory, displayOrder: (questions?.length ?? 0) + 1 })}>حفظ</Button>
                <Button variant="outline" onClick={() => setAdding(false)}>إلغاء</Button>
              </div>
            </Card>
          )}

          <div className="space-y-2">
            {questions?.map(q => (
              <div key={q.id} className="flex items-center justify-between border rounded-lg p-3">
                <p className="text-sm">{q.question}</p>
                <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate({ id: q.id })}><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}

// ------------------- PROFILE -------------------
function ProfileTab() {
  const { data: profile, isLoading } = trpc.admin.profile.get.useQuery();
  const updateMutation = trpc.admin.profile.update.useMutation({
    onSuccess: () => toast.success("تم تحديث الملف الشخصي"),
  });
  const [form, setForm] = useState<any>(null);

  if (isLoading) return <Loader2 className="animate-spin w-6 h-6 mt-8" />;
  const data = form ?? profile ?? {};

  return (
    <Card className="p-6 mt-6 space-y-3">
      <h2 className="text-xl font-bold mb-4">الملف الشخصي</h2>
      <Input placeholder="الاسم الكامل" value={data.fullName ?? ""} onChange={e => setForm({ ...data, fullName: e.target.value })} />
      <Input placeholder="اللقب المهني" value={data.title ?? ""} onChange={e => setForm({ ...data, title: e.target.value })} />
      <Textarea placeholder="نبذة" value={data.summary ?? ""} onChange={e => setForm({ ...data, summary: e.target.value })} />
      <Input placeholder="رابط الصورة" value={data.photoUrl ?? ""} onChange={e => setForm({ ...data, photoUrl: e.target.value })} />
      <Button onClick={() => updateMutation.mutate(data)}>حفظ</Button>
    </Card>
  );
}

// ------------------- SETTINGS -------------------
function SettingsTab() {
  const { data: settings, isLoading } = trpc.admin.settings.get.useQuery();
  const updateMutation = trpc.admin.settings.update.useMutation({
    onSuccess: () => toast.success("تم تحديث الإعدادات"),
  });
  const [form, setForm] = useState<any>(null);

  if (isLoading) return <Loader2 className="animate-spin w-6 h-6 mt-8" />;
  const data = form ?? settings ?? {};

  return (
    <Card className="p-6 mt-6 space-y-3">
      <h2 className="text-xl font-bold mb-4">الإعدادات</h2>
      <Input placeholder="اسم الموقع (الشعار)" value={data.siteName ?? ""} onChange={e => setForm({ ...data, siteName: e.target.value })} />
      <Input placeholder="نص الفوتر (اختياري، افتراضي: حقوق النشر)" value={data.footerText ?? ""} onChange={e => setForm({ ...data, footerText: e.target.value })} />
      <Input type="number" placeholder="سعر الاستشارة ($)" value={data.consultationPrice ?? ""} onChange={e => setForm({ ...data, consultationPrice: e.target.value })} />
      <Input placeholder="رقم الواتساب" value={data.whatsappNumber ?? ""} onChange={e => setForm({ ...data, whatsappNumber: e.target.value })} />
      <Input placeholder="الإيميل" value={data.contactEmail ?? ""} onChange={e => setForm({ ...data, contactEmail: e.target.value })} />
      <Input placeholder="رابط اللينكدإن" value={data.linkedInUrl ?? ""} onChange={e => setForm({ ...data, linkedInUrl: e.target.value })} />
      <Button onClick={() => updateMutation.mutate({ ...data, consultationPrice: Number(data.consultationPrice) })}>حفظ</Button>
    </Card>
  );
}
