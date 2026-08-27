"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Upload, CheckCircle2 } from "lucide-react";

interface SettingsFormProps {
  settings: any;
  saveAction: (formData: FormData) => Promise<void>;
}

export default function SettingsForm({ settings, saveAction }: SettingsFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);
      await saveAction(formData);
      setSavedSuccess(true);
      setSelectedFileName(null);
      router.refresh();

      setTimeout(() => {
        setSavedSuccess(false);
      }, 5000);
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="space-y-6">
      {savedSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3.5 rounded-2xl text-sm font-medium flex items-center gap-2 transition-all shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>✓ Settings & Resume PDF updated successfully! Your live public portfolio is now updated.</span>
        </div>
      )}

      <div className="bg-surface border border-border-color rounded-3xl p-6 md:p-8 shadow-xl">
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <span>Profile & Resume Configuration</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resume Upload Box */}
          <div className="p-6 rounded-2xl bg-accent/5 border border-accent/30 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                <span>Upload New Resume PDF</span>
              </label>
              <span className="px-2.5 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-mono font-bold">
                Live PDF Sync
              </span>
            </div>

            <p className="text-xs text-text-muted leading-relaxed">
              Upload your updated PDF resume file here. Upon saving, your new PDF will automatically sync with the public <b>"View Resume"</b> reader, modal, and download buttons!
            </p>

            <div className="pt-2">
              <input
                name="resumeFile"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full bg-background border border-border-color rounded-xl px-4 py-3 text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-accent file:text-background hover:file:bg-accent/90 cursor-pointer shadow-sm"
              />
            </div>

            {selectedFileName && (
              <div className="text-xs text-accent font-mono pt-1">
                Selected for upload: <b>{selectedFileName}</b>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Name (Internal Identifier)</label>
              <input
                name="name"
                defaultValue={settings?.name || "Siddhartha Kuchana"}
                placeholder="e.g. Siddhartha Kuchana"
                className="w-full bg-background border border-border-color rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Display Name</label>
              <input
                name="displayName"
                defaultValue={settings?.displayName || "Siddhartha Kuchana"}
                placeholder="e.g. Siddhartha Kuchana"
                className="w-full bg-background border border-border-color rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Role / Headline</label>
              <input
                name="role"
                defaultValue={settings?.role || "AI & ML Undergraduate | Full-Stack Developer"}
                placeholder="e.g. AI & ML Undergraduate | Full-Stack Developer"
                className="w-full bg-background border border-border-color rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Contact Email</label>
              <input
                name="email"
                type="email"
                defaultValue={settings?.email || "siddharthakuchana0207@gmail.com"}
                placeholder="siddharthakuchana0207@gmail.com"
                className="w-full bg-background border border-border-color rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">GitHub Profile URL</label>
              <input
                name="github"
                defaultValue={settings?.github || "https://github.com/siddharthakuchana"}
                placeholder="https://github.com/siddharthakuchana"
                className="w-full bg-background border border-border-color rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">LinkedIn Profile URL</label>
              <input
                name="linkedin"
                defaultValue={settings?.linkedin || "https://linkedin.com/in/siddharthakuchana"}
                placeholder="https://linkedin.com/in/siddharthakuchana"
                className="w-full bg-background border border-border-color rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-foreground">Resume Route URL</label>
              <input
                name="resumeUrl"
                defaultValue={settings?.resumeUrl || "/resume"}
                placeholder="/resume"
                className="w-full bg-background border border-border-color rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-mono text-sm"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-border-color">
            <h2 className="text-lg font-bold text-foreground mb-4">SEO Settings</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">SEO Title</label>
                <input
                  name="seoTitle"
                  defaultValue={settings?.seoTitle || "Siddhartha Kuchana | Portfolio"}
                  placeholder="Siddhartha Kuchana | Portfolio"
                  className="w-full bg-background border border-border-color rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">SEO Description</label>
                <textarea
                  name="seoDesc"
                  defaultValue={settings?.seoDesc || "Personal portfolio of Siddhartha Kuchana, AI & ML Engineer."}
                  rows={3}
                  placeholder="A brief description for search engines..."
                  className="w-full bg-background border border-border-color rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border-color flex items-center justify-between">
            <p className="text-xs text-text-muted">Changes will reflect on your public portfolio immediately after saving.</p>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-accent text-background font-bold px-8 py-3 rounded-xl hover:bg-accent/90 disabled:opacity-50 transition-all shadow-lg cursor-pointer flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>{isSaving ? "Saving Settings..." : "Save & Publish Settings"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
