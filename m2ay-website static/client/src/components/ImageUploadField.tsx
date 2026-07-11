import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadFieldProps {
  value?: string | null;
  onChange: (dataUri: string | null) => void;
  label?: string;
  maxSizeKb?: number;
}

/**
 * Stores the image as a base64 data URI directly in the database. This is intentional:
 * our free hosting tier (Render's free web service) has an ephemeral filesystem, so files
 * written to disk would silently disappear on the next redeploy. Base64-in-DB survives
 * that reliably, and at the scale of a handful of images (hero photo + template previews)
 * the extra DB size is negligible.
 */
export default function ImageUploadField({ value, onChange, label = "Image", maxSizeKb = 500 }: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (file: File) => {
    if (file.size > maxSizeKb * 1024) {
      toast.error(`الصورة أكبر من ${maxSizeKb}KB. اختار صورة أصغر.`);
      return;
    }
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
      setLoading(false);
    };
    reader.onerror = () => {
      toast.error("فشل قراءة الصورة");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <p className="text-xs font-semibold mb-1.5">{label}</p>
      <div className="flex items-center gap-3">
        {value && (
          <div className="relative">
            <img src={value} alt="" className="w-16 h-16 rounded-lg object-cover border" />
            <button
              onClick={() => onChange(null)}
              className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full w-4 h-4 flex items-center justify-center"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        )}
        <Button type="button" size="sm" variant="outline" disabled={loading} onClick={() => fileInputRef.current?.click()} className="gap-2">
          <Upload className="w-3.5 h-3.5" />
          {loading ? "جاري الرفع..." : value ? "تغيير الصورة" : "رفع صورة"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">أقصى حجم {maxSizeKb}KB — أو الصق رابط صورة خارجي في الحقل تحت لو حابب</p>
    </div>
  );
}
