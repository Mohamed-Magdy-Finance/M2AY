import { Linkedin, Mail, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";

interface SiteFooterProps {
  whatsapp?: string | null;
  email?: string | null;
  linkedIn?: string | null;
  siteName?: string | null;
  footerText?: string | null;
}

export default function SiteFooter({ whatsapp, email, linkedIn, siteName, footerText }: SiteFooterProps) {
  const { isAr, lp } = useLanguage();

  return (
    <footer className="border-t border-border mt-20 py-10 px-4" style={{ background: "var(--sidebar)", color: "var(--sidebar-foreground)" }}>
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-lg font-bold" style={{ color: "var(--accent)" }}>{siteName || "M2AY"}</div>
          <div className="flex items-center gap-4">
            {linkedIn && (
              <a href={linkedIn} target="_blank" rel="noreferrer" className="hover:opacity-80">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="hover:opacity-80">
                <Mail className="w-5 h-5" />
              </a>
            )}
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" className="hover:opacity-80">
                <MessageCircle className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-70">
          <div className="flex gap-4">
            <Link href={lp("/privacy-policy")} className="hover:opacity-100">
              {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <Link href={lp("/terms-of-use")} className="hover:opacity-100">
              {isAr ? "شروط الاستخدام" : "Terms of Use"}
            </Link>
          </div>
          <p>
            {footerText || (isAr ? `© ${new Date().getFullYear()} محمد مجدي — جميع الحقوق محفوظة` : `© ${new Date().getFullYear()} Mohamed Magdy — All rights reserved`)}
          </p>
        </div>
      </div>
    </footer>
  );
}
