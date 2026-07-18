import { Link } from "wouter";
import { Linkedin, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface SiteFooterProps {
  whatsapp?: string | null;
  email?: string | null;
  linkedIn?: string | null;
  siteName?: string | null;
  footerText?: string | null;
}

export default function SiteFooter({
  whatsapp,
  email,
  linkedIn,
  siteName,
  footerText,
}: SiteFooterProps) {
  const { isAr, lp } = useLanguage();

  return (
    <footer
      className="mt-20 border-t border-border/30 transition-colors duration-300"
      style={{ background: "var(--primary-dark)", color: "var(--text-light)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src={`${import.meta.env.BASE_URL}images/logo-dark.svg`}
                alt={siteName || "M2AY"}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm opacity-70">
              {isAr
                ? "حيث لا تتعلم المالية فقط، بل تكتسب نظام التشغيل المالي الخاص بك"
                : "Where you don't just learn finance — you gain your own financial operating system"}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide opacity-80">
              {isAr ? "الروابط" : "Links"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={lp("/")} className="opacity-70 hover:opacity-100 hover:text-accent transition-all flex items-center gap-1 group">
                  {isAr ? "الرئيسية" : "Home"}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link href={lp("/chapters")} className="opacity-70 hover:opacity-100 hover:text-accent transition-all flex items-center gap-1 group">
                  {isAr ? "الدليل" : "Guide"}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link href={lp("/templates")} className="opacity-70 hover:opacity-100 hover:text-accent transition-all flex items-center gap-1 group">
                  {isAr ? "القوالب" : "Templates"}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link href={lp("/question-bank")} className="opacity-70 hover:opacity-100 hover:text-accent transition-all flex items-center gap-1 group">
                  {isAr ? "بنك الأسئلة" : "Questions"}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide opacity-80">
              {isAr ? "القانوني" : "Legal"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={lp("/privacy-policy")} className="opacity-70 hover:opacity-100 hover:text-accent transition-all">
                  {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link href={lp("/terms-of-use")} className="opacity-70 hover:opacity-100 hover:text-accent transition-all">
                  {isAr ? "شروط الاستخدام" : "Terms of Use"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide opacity-80">
              {isAr ? "تواصل" : "Connect"}
            </h3>
            <div className="flex gap-3">
              {linkedIn && (
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-accent hover:text-primary transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="p-2 rounded-lg bg-white/10 hover:bg-accent hover:text-primary transition-all duration-200"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-accent hover:text-primary transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-70">
          <p>
            {footerText ||
              (isAr
                ? `© ${new Date().getFullYear()} محمد مجدي — جميع الحقوق محفوظة`
                : `© ${new Date().getFullYear()} Mohamed Magdy — All rights reserved`)}
          </p>
          <p className="text-xs">
            {isAr ? "صُنع بـ ❤️ من أجل المحترفين" : "Crafted with ❤️ for professionals"}
          </p>
        </div>
      </div>
    </footer>
  );
}
