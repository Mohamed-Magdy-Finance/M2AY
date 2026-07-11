# 📚 M2AY Finance Guide - Deployment Guide

هذا الدليل يشرح كيفية نشر الموقع على GitHub Pages.

## المتطلبات

- GitHub Account
- Git مثبت على جهازك
- Node.js 18+ (للتطوير المحلي)

---

## الخطوات الأساسية

### 1. إنشاء Repository على GitHub

1. اذهب إلى [github.com/new](https://github.com/new)
2. أنشئ repository باسم `m2ay-website`
3. اختر **Public** (عشان GitHub Pages يشتغل)
4. لا تختر "Add README" (هنضيفه نحن)

### 2. ربط المشروع المحلي بـ GitHub

```bash
cd /path/to/m2ay-website/project

# إضافة remote
git remote add origin https://github.com/YOUR_USERNAME/m2ay-website.git

# إنشاء branch main إذا لم يكن موجوداً
git branch -M main

# دفع الكود
git push -u origin main
```

### 3. تفعيل GitHub Pages

1. اذهب إلى **Settings** في الـ Repository
2. اختر **Pages** من القائمة الجانبية
3. تحت "Build and deployment":
   - **Source**: اختر "GitHub Actions"
4. الـ workflow سيبدأ تلقائياً عند الـ push

### 4. انتظر النشر

- اذهب إلى **Actions** tab
- انتظر حتى ينتهي الـ workflow
- سيظهر الموقع على: `https://YOUR_USERNAME.github.io/m2ay-website/`

---

## التطوير المحلي

### تشغيل الموقع محلياً

```bash
cd project

# تثبيت التبعيات
npm install --legacy-peer-deps

# تشغيل dev server
npm run dev

# ستظهر رسالة:
# Local: http://localhost:5173/m2ay-website/
```

### البناء المحلي

```bash
npm run build

# سيُنشئ مجلد `dist/` يحتوي على الملفات النهائية
```

---

## تحديث البيانات

جميع البيانات موجودة في ملفات JSON:

```
client/src/data/
├── site-config.json      # معلومات الموقع والملف الشخصي
├── chapters.json         # الفصول
├── templates.json        # القوالب
└── question-bank.json    # أسئلة المقابلات
```

عدّل هذه الملفات وادفع التغييرات:

```bash
git add .
git commit -m "تحديث البيانات"
git push
```

الموقع سيُحدّث تلقائياً!

---

## الإعدادات المهمة

### تحديث اسم المستخدم في sitemap.xml

افتح `client/public/sitemap.xml` واستبدل:
```xml
https://username.github.io/m2ay-website/
```

بـ:
```xml
https://YOUR_USERNAME.github.io/m2ay-website/
```

### تحديث robots.txt

افتح `client/public/robots.txt` واستبدل:
```
https://username.github.io/m2ay-website/sitemap.xml
```

بـ:
```
https://YOUR_USERNAME.github.io/m2ay-website/sitemap.xml
```

---

## استخدام Domain مخصص (اختياري)

1. اشتري domain من أي موفر (GoDaddy, Namecheap, إلخ)
2. أضف CNAME record يشير إلى `YOUR_USERNAME.github.io`
3. في GitHub Settings → Pages، أضف الـ domain المخصص

---

## استكشاف الأخطاء

### الموقع لا يظهر

- تأكد أن الـ workflow انتهى بنجاح (اذهب إلى Actions)
- تأكد أن Repository هو Public
- انتظر 5 دقائق (أحياناً يأخذ وقت)

### الـ Routing لا يعمل

- تأكد أن `base: '/m2ay-website/'` موجود في `vite.config.ts`
- تأكد أن `404.html` موجود في `client/public/`

### البناء يفشل

```bash
# حاول حذف node_modules وإعادة التثبيت
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

---

## الملفات الرئيسية

```
project/
├── client/
│   ├── src/
│   │   ├── data/           # البيانات الثابتة (JSON)
│   │   ├── pages/          # الصفحات
│   │   ├── components/     # المكونات
│   │   └── App.tsx         # التطبيق الرئيسي
│   ├── public/
│   │   ├── 404.html        # SPA Fallback
│   │   ├── robots.txt      # SEO
│   │   └── sitemap.xml     # Sitemap
│   └── index.html
├── vite.config.ts          # إعدادات Vite
├── package.json            # التبعيات
└── .github/workflows/
    └── deploy.yml          # GitHub Actions
```

---

## نصائح

✅ **قبل كل push:**
```bash
npm run build  # تأكد أن البناء يعمل
```

✅ **استخدم commits واضحة:**
```bash
git commit -m "إضافة فصل جديد"
git commit -m "تحديث البيانات"
```

✅ **اختبر محلياً قبل الدفع:**
```bash
npm run dev
# افتح http://localhost:5173/m2ay-website/
```

---

## الدعم

إذا واجهت مشكلة:
1. تحقق من GitHub Actions logs
2. تأكد من اسم المستخدم والـ repository
3. جرب حذف `.git` وإعادة التهيئة

---

**تم النشر بنجاح! 🎉**
