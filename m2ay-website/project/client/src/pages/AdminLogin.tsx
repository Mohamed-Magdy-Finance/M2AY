import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch {
      toast.error("بيانات الدخول غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--sidebar)", color: "var(--sidebar-foreground)" }}
    >
      <Card className="w-full max-w-sm p-8 bg-card text-card-foreground">
        <h1 className="text-2xl font-extrabold mb-1 text-center" style={{ color: "var(--accent)" }}>M2AY</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">لوحة تحكم الأدمن</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            required
            placeholder="الإيميل"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            required
            placeholder="كلمة السر"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" disabled={loading} className="w-full" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
            {loading ? "جاري الدخول..." : "دخول"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
