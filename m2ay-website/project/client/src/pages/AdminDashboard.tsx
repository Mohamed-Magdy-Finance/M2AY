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
import { Loader2, Plus, Trash2, LogOut, History, RotateCcw, Download, Upload, AlertTriangle } from "lucide-react";
import MarkdownEditor from "@/components/MarkdownEditor";
import SeoChecklist from "@/components/SeoChecklist";
import ImageUploadField from "@/components/ImageUploadField";
import { useAutoSave, getDraft, clearDraft } from "@/hooks/useAutoSave";

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
          <TabsList className="flex flex-wrap h-auto gap-1 justify-start">
            <TabsTrigger value="templates">القوالب</TabsTrigger>
            <TabsTrigger value="chapters">الفصول</TabsTrigger>
            <TabsTrigger value="questions">بنك الأسئلة</TabsTrigger>
            <TabsTrigger value="consultations">الاستشارات</TabsTrigger>
            <TabsTrigger value="trash">🗑 المحذوفات</TabsTrigger>
            <TabsTrigger value="backup">النسخ الاحتياطي</TabsTrigger>
            <TabsTrigger value="activity">سجل النشاط</TabsTrigger>
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="templates"><TemplatesTab /></TabsContent>
          <TabsContent value="chapters"><ChaptersTab /></TabsContent>
          <TabsContent value="questions"><QuestionsTab /></TabsContent>
          <TabsContent value="consultations"><ConsultationsTab /></TabsContent>
          <TabsContent value="trash"><TrashTab /></TabsContent>
          <TabsContent value="backup"><BackupTab /></TabsContent>
          <TabsContent value="activity"><ActivityLogTab /></TabsContent>
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
    onSuccess: () => { utils.admin.templates.list.invalidate(); },
  });
  const deleteMutation = trpc.admin.templates.delete.useMutation({
    onSuccess: () => { toast.success("انتقل للمحذوفات (تقدر تسترجعه من تبويب 🗑)"); utils.admin.templates.list.invalidate(); },
  });
  const linkMutation = trpc.admin.chapterTemplateLinks.link.useMutation({
    onSuccess: () => toast.success("تم الربط بالفصل"),
  });

  const [form, setForm] = useState<any>({});

  const startNew = () => { setForm({ category: CATEGORIES[0], difficultyLevel: "intermediate", isActive: true }); setEditingId("new"); };
  const startEdit = (t: any) => { setForm(t); setEditingId(t.id); };

  const save = () => {
    if (editingId === "new") createMutation.mutate(form);
    else updateMutation.mutate({ ...form, id: editingId }, { onSuccess: () => toast.success("تم الحفظ") });
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

          <div className="mb-3">
            <ImageUploadField
              label="صورة المعاينة (اختياري — لو مفيش، هيظهر بانر تلقائي)"
              value={form.previewImageUrl}
              onChange={v => setForm({ ...form, previewImageUrl: v })}
            />
            <Input
              className="mt-2"
              placeholder="أو الصق رابط صورة خارجي هنا"
              value={form.previewImageUrl?.startsWith("data:") ? "" : (form.previewImageUrl ?? "")}
              onChange={e => setForm({ ...form, previewImageUrl: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Switch checked={form.isActive ?? true} onCheckedChange={v => setForm({ ...form, isActive: v })} />
            <span className="text-sm">مفعّل (ظاهر في الموقع)</span>
          </div>

          <SeoChecklist
            items={[
              { label: "SEO Title", filled: Boolean(form.seoTitle) },
              { label: "SEO Description", filled: Boolean(form.seoDescription) },
              { label: "Preview Image", filled: Boolean(form.previewImageUrl) },
              { label: "Category", filled: Boolean(form.category) },
            ]}
          />
          <div className="grid sm:grid-cols-2 gap-3 my-3">
            <Input placeholder="SEO Title (اختياري)" value={form.seoTitle ?? ""} onChange={e => setForm({ ...form, seoTitle: e.target.value })} />
            <Input placeholder="SEO Description (اختياري)" value={form.seoDescription ?? ""} onChange={e => setForm({ ...form, seoDescription: e.target.value })} />
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
  const [editingId, setEditingId] = useState<number | null>(null);

  const toggleStatus = trpc.admin.chapters.update.useMutation({
    onSuccess: () => { toast.success("تم تغيير الحالة"); utils.admin.chapters.list.invalidate(); },
  });

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
                <Button size="sm" variant="outline" onClick={() => setEditingId(editingId === c.id ? null : c.id)}>
                  {editingId === c.id ? "إغلاق" : "تعديل"}
                </Button>
              </div>
            </div>
            {editingId === c.id && <ChapterEditorCard chapter={c} />}
          </div>
        ))}
      </div>
    </Card>
  );
}

function ChapterEditorCard({ chapter }: { chapter: any }) {
  const utils = trpc.useUtils();
  const [form, setForm] = useState<any>(chapter);
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);

  const draftKey = `chapter-${chapter.id}`;

  useState(() => {
    const draft = getDraft<any>(draftKey);
    if (draft && draft.savedAt > new Date(chapter.updatedAt).getTime()) {
      setShowRestorePrompt(true);
    }
    return null;
  });

  const updateMutation = trpc.admin.chapters.update.useMutation({
    onSuccess: () => utils.admin.chapters.list.invalidate(),
  });

  const { status } = useAutoSave({
    key: draftKey,
    data: form,
    onSave: async data => updateMutation.mutateAsync(data),
    delayMs: 2500,
  });

  const { data: relations } = trpc.admin.chapters.relations.useQuery({ id: chapter.id });
  const { data: allTemplates } = trpc.admin.templates.list.useQuery();
  const { data: allCategories } = trpc.admin.questionBank.categories.useQuery();
  const { data: versions } = trpc.admin.chapters.versions.useQuery({ chapterId: chapter.id });

  const linkTemplate = trpc.admin.chapterTemplateLinks.link.useMutation({ onSuccess: () => utils.admin.chapters.relations.invalidate() });
  const unlinkTemplate = trpc.admin.chapterTemplateLinks.unlink.useMutation({ onSuccess: () => utils.admin.chapters.relations.invalidate() });
  const linkCategory = trpc.admin.chapterQuestionCategoryLinks.link.useMutation({ onSuccess: () => utils.admin.chapters.relations.invalidate() });
  const unlinkCategory = trpc.admin.chapterQuestionCategoryLinks.unlink.useMutation({ onSuccess: () => utils.admin.chapters.relations.invalidate() });
  const restoreVersion = trpc.admin.chapters.restoreVersion.useMutation({
    onSuccess: updated => { toast.success("تم استرجاع النسخة"); if (updated) setForm(updated); utils.admin.chapters.list.invalidate(); },
  });

  const restoreDraft = () => {
    const draft = getDraft<any>(draftKey);
    if (draft) setForm(draft.data);
    setShowRestorePrompt(false);
    toast.success("تم استرجاع المسودة غير المحفوظة");
  };

  const discardDraft = () => {
    clearDraft(draftKey);
    setShowRestorePrompt(false);
  };

  const saveNow = () => {
    updateMutation.mutate(form, { onSuccess: () => { clearDraft(draftKey); toast.success("تم الحفظ"); } });
  };

  return (
    <Card className="p-4 mt-2 border-2" style={{ borderColor: "var(--accent)" }}>
      {showRestorePrompt && (
        <div className="flex items-center justify-between gap-2 mb-3 p-2 rounded bg-yellow-500/10 border border-yellow-500/30 text-xs">
          <span className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> فيه مسودة غير محفوظة من قبل — تحب تسترجعها؟</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-6 text-xs" onClick={restoreDraft}>استرجاع</Button>
            <Button size="sm" variant="ghost" className="h-6 text-xs" onClick={discardDraft}>تجاهل</Button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground">
          {status === "saving" && "⏳ بيتحفظ تلقائيًا..."}
          {status === "saved" && "✅ اتحفظ تلقائيًا"}
          {status === "error" && "⚠️ حصل خطأ في الحفظ التلقائي"}
        </span>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-6 mb-4">
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="content">المحتوى</TabsTrigger>
          <TabsTrigger value="portfolio">الخاتمة</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="relations">الربط</TabsTrigger>
          <TabsTrigger value="history"><History className="w-3.5 h-3.5" /></TabsTrigger>
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

        <TabsContent value="content" className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">المحتوى بالعربي (المرجع الأساسي)</p>
            <MarkdownEditor value={form.arabicContent ?? ""} onChange={v => setForm({ ...form, arabicContent: v })} rows={10} />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">المحتوى بالإنجليزي (اختياري)</p>
            <MarkdownEditor value={form.englishContent ?? ""} onChange={v => setForm({ ...form, englishContent: v })} rows={10} placeholder="English content (optional)" />
          </div>
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
          <SeoChecklist
            items={[
              { label: "Title", filled: Boolean(form.seoTitle) },
              { label: "Description", filled: Boolean(form.seoDescription) },
              { label: "Slug", filled: Boolean(form.slug) },
              { label: "OG Image", filled: Boolean(form.ogImage) },
              { label: "Keywords", filled: Boolean(form.seoKeywords) },
              { label: "Related content", filled: (relations?.linkedTemplates?.length ?? 0) > 0 },
            ]}
          />
          <p className="text-xs text-muted-foreground">اتركها فاضية والنظام هيولّد قيم افتراضية تلقائيًا من العنوان والخلاصة.</p>
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
                  <button onClick={() => unlinkTemplate.mutate({ chapterId: chapter.id, templateId: t.id })}>×</button>
                </Badge>
              ))}
            </div>
            <Select onValueChange={v => linkTemplate.mutate({ chapterId: chapter.id, templateId: Number(v) })}>
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
                  <button onClick={() => unlinkCategory.mutate({ chapterId: chapter.id, categoryId: cat.id })}>×</button>
                </Badge>
              ))}
            </div>
            <Select onValueChange={v => linkCategory.mutate({ chapterId: chapter.id, categoryId: Number(v) })}>
              <SelectTrigger><SelectValue placeholder="اربط فئة أسئلة جديدة" /></SelectTrigger>
              <SelectContent>
                {allCategories?.filter(cat => !relations?.linkedCategories.some(rc => rc.id === cat.id)).map(cat => (
                  <SelectItem key={cat.id} value={String(cat.id)}>{cat.arabicName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-2">
          <p className="text-xs text-muted-foreground mb-2">آخر 5 نسخ محفوظة تلقائيًا قبل كل تعديل جوهري.</p>
          {(versions?.length ?? 0) === 0 && <p className="text-sm text-muted-foreground">مفيش نسخ سابقة لسه.</p>}
          {versions?.map(v => (
            <div key={v.id} className="flex items-center justify-between border rounded-lg p-2 text-xs">
              <span>{new Date(v.createdAt).toLocaleString("ar-EG")}</span>
              <Button size="sm" variant="outline" className="h-6 gap-1 text-xs" onClick={() => restoreVersion.mutate({ versionId: v.id })}>
                <RotateCcw className="w-3 h-3" /> استرجاع
              </Button>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 mt-4">
        <Button onClick={saveNow}>حفظ الآن</Button>
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

// ------------------- TRASH (RECYCLE BIN) -------------------
function TrashTab() {
  const utils = trpc.useUtils();
  const { data: trashedChapters, isLoading: loadingCh } = trpc.admin.trash.chapters.useQuery();
  const { data: trashedTemplates, isLoading: loadingT } = trpc.admin.trash.templates.useQuery();

  const restoreChapter = trpc.admin.trash.restoreChapter.useMutation({
    onSuccess: () => { toast.success("تم الاسترجاع"); utils.admin.trash.chapters.invalidate(); utils.admin.chapters.list.invalidate(); },
  });
  const deleteChapterForever = trpc.admin.trash.permanentlyDeleteChapter.useMutation({
    onSuccess: () => { toast.success("اتحذف نهائيًا"); utils.admin.trash.chapters.invalidate(); },
  });
  const restoreTemplate = trpc.admin.trash.restoreTemplate.useMutation({
    onSuccess: () => { toast.success("تم الاسترجاع"); utils.admin.trash.templates.invalidate(); utils.admin.templates.list.invalidate(); },
  });
  const deleteTemplateForever = trpc.admin.trash.permanentlyDeleteTemplate.useMutation({
    onSuccess: () => { toast.success("اتحذف نهائيًا"); utils.admin.trash.templates.invalidate(); },
  });

  if (loadingCh || loadingT) return <Loader2 className="animate-spin w-6 h-6 mt-8" />;

  return (
    <Card className="p-6 mt-6">
      <h2 className="text-xl font-bold mb-2">🗑 المحذوفات</h2>
      <p className="text-xs text-muted-foreground mb-6">أي عنصر بيتحذف بيفضل هنا 30 يوم قبل ما يتشال نهائيًا — ممكن تسترجعه في أي وقت خلالها.</p>

      <h3 className="font-semibold text-sm mb-2">فصول محذوفة ({trashedChapters?.length ?? 0})</h3>
      <div className="space-y-2 mb-6">
        {trashedChapters?.map(c => (
          <div key={c.id} className="flex items-center justify-between border rounded-lg p-3">
            <p className="text-sm">{c.arabicTitle}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => restoreChapter.mutate({ id: c.id })}>استرجاع</Button>
              <Button size="sm" variant="destructive" onClick={() => deleteChapterForever.mutate({ id: c.id })}>حذف نهائي</Button>
            </div>
          </div>
        ))}
        {trashedChapters?.length === 0 && <p className="text-xs text-muted-foreground">لا يوجد</p>}
      </div>

      <h3 className="font-semibold text-sm mb-2">قوالب محذوفة ({trashedTemplates?.length ?? 0})</h3>
      <div className="space-y-2">
        {trashedTemplates?.map(t => (
          <div key={t.id} className="flex items-center justify-between border rounded-lg p-3">
            <p className="text-sm">{t.arabicName}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => restoreTemplate.mutate({ id: t.id })}>استرجاع</Button>
              <Button size="sm" variant="destructive" onClick={() => deleteTemplateForever.mutate({ id: t.id })}>حذف نهائي</Button>
            </div>
          </div>
        ))}
        {trashedTemplates?.length === 0 && <p className="text-xs text-muted-foreground">لا يوجد</p>}
      </div>
    </Card>
  );
}

// ------------------- BACKUP / EXPORT / IMPORT -------------------
function BackupTab() {
  const exportMutation = trpc.admin.backup.export.useMutation();
  const importMutation = trpc.admin.backup.import.useMutation();
  const [confirmImport, setConfirmImport] = useState<any>(null);

  const handleExport = async () => {
    const bundle = await exportMutation.mutateAsync();
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `m2ay-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("تم تصدير النسخة الاحتياطية");
  };

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const bundle = JSON.parse(reader.result as string);
        setConfirmImport(bundle);
      } catch {
        toast.error("الملف مش JSON صالح");
      }
    };
    reader.readAsText(file);
  };

  const confirmImportNow = async () => {
    const result = await importMutation.mutateAsync({ bundle: confirmImport });
    if (result.success) {
      toast.success("تم استعادة النسخة الاحتياطية بنجاح — رفريش الصفحة عشان تشوف التحديث");
    } else {
      toast.error("فشل الاستيراد: " + result.error);
    }
    setConfirmImport(null);
  };

  return (
    <Card className="p-6 mt-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">النسخ الاحتياطي</h2>
        <p className="text-sm text-muted-foreground mb-4">صدّر كل بيانات الموقع (الفصول، القوالب، الأسئلة، الإعدادات) كملف JSON واحد تقدر تحتفظ بيه أو تستخدمه للاستعادة لاحقًا.</p>
        <Button onClick={handleExport} disabled={exportMutation.isPending} className="gap-2">
          <Download className="w-4 h-4" /> {exportMutation.isPending ? "جاري التصدير..." : "تصدير كل حاجة (Export)"}
        </Button>
      </div>

      <div className="pt-4 border-t">
        <h3 className="font-semibold mb-2 flex items-center gap-2 text-destructive">
          <AlertTriangle className="w-4 h-4" /> استعادة (Import) — إجراء خطير
        </h3>
        <p className="text-sm text-muted-foreground mb-4">استيراد نسخة احتياطية بيمسح كل المحتوى الحالي (الفصول والقوالب والأسئلة) ويستبدله بمحتوى الملف. استخدمه بس لو متأكد.</p>
        <label className="inline-block">
          <Button variant="outline" className="gap-2" asChild>
            <span><Upload className="w-4 h-4" /> اختار ملف Backup</span>
          </Button>
          <input type="file" accept=".json" className="hidden" onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
            e.target.value = "";
          }} />
        </label>

        {confirmImport && (
          <Card className="p-4 mt-4 border-2 border-destructive">
            <p className="text-sm font-semibold mb-1">متأكد؟</p>
            <p className="text-xs text-muted-foreground mb-3">
              الملف ده فيه {confirmImport.chapters?.length ?? 0} فصل و {confirmImport.templates?.length ?? 0} قالب،
              مصدّر بتاريخ {confirmImport.exportedAt ? new Date(confirmImport.exportedAt).toLocaleString("ar-EG") : "غير معروف"}.
              استيراده هيمسح المحتوى الحالي بالكامل.
            </p>
            <div className="flex gap-2">
              <Button variant="destructive" size="sm" onClick={confirmImportNow} disabled={importMutation.isPending}>
                {importMutation.isPending ? "جاري الاستعادة..." : "تأكيد الاستعادة"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setConfirmImport(null)}>إلغاء</Button>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
}

// ------------------- ACTIVITY LOG -------------------
const ACTION_LABELS: Record<string, string> = {
  created: "إنشاء", updated: "تعديل", deleted: "حذف", restored: "استرجاع",
  login: "تسجيل دخول", imported_backup: "استعادة نسخة احتياطية", exported_backup: "تصدير نسخة احتياطية",
};
const ENTITY_LABELS: Record<string, string> = {
  chapter: "فصل", template: "قالب", question: "سؤال", consultation: "استشارة", admin: "أدمن", backup: "نسخة احتياطية",
};

function ActivityLogTab() {
  const { data: log, isLoading } = trpc.admin.activityLog.recent.useQuery();

  if (isLoading) return <Loader2 className="animate-spin w-6 h-6 mt-8" />;

  return (
    <Card className="p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">سجل النشاط</h2>
      <div className="space-y-1">
        {log?.map(entry => (
          <div key={entry.id} className="flex items-center justify-between text-sm border-b py-2 last:border-0">
            <span>
              <Badge variant="outline" className="me-2">{ACTION_LABELS[entry.action] ?? entry.action}</Badge>
              {ENTITY_LABELS[entry.entityType] ?? entry.entityType}
              {entry.entityName && <span className="text-muted-foreground"> — {entry.entityName}</span>}
            </span>
            <span className="text-xs text-muted-foreground shrink-0">{new Date(entry.createdAt).toLocaleString("ar-EG")}</span>
          </div>
        ))}
        {log?.length === 0 && <p className="text-sm text-muted-foreground">مفيش نشاط مسجل لسه</p>}
      </div>
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
      <ImageUploadField label="الصورة الشخصية (Hero)" value={data.photoUrl} onChange={v => setForm({ ...data, photoUrl: v })} maxSizeKb={800} />
      <Input placeholder="أو الصق رابط صورة خارجي" value={data.photoUrl?.startsWith("data:") ? "" : (data.photoUrl ?? "")} onChange={e => setForm({ ...data, photoUrl: e.target.value })} />
      <Input placeholder="الاسم الكامل" value={data.fullName ?? ""} onChange={e => setForm({ ...data, fullName: e.target.value })} />
      <Input placeholder="اللقب المهني" value={data.title ?? ""} onChange={e => setForm({ ...data, title: e.target.value })} />
      <Textarea placeholder="نبذة" value={data.summary ?? ""} onChange={e => setForm({ ...data, summary: e.target.value })} />
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
