"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SettingsFormProps {
  settings: any;
  saveAction: (formData: FormData) => Promise<void>;
}

export default function SettingsForm({ settings, saveAction }: SettingsFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);
      await saveAction(formData);
      setSavedSuccess(true);
      router.refresh();

      setTimeout(() => {
        setSavedSuccess(false);
      }, 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {savedSuccess && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg text-sm font-medium transition-all">
          ✓ Settings saved successfully! Page data refreshed.
        </div>
      )}

      <div className="bg-surface border border-border-color rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Profile Information</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Name (internal identifier)</label>
              <input
                name="name"
                defaultValue={settings?.name || ""}
                placeholder="e.g. Siddhartha Kuchana"
                className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Display Name</label>
              <input
                name="displayName"
                defaultValue={settings?.displayName || ""}
                placeholder="e.g. Siddhartha Kuchana"
                className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Role / Headline</label>
              <input
                name="role"
                defaultValue={settings?.role || ""}
                placeholder="e.g. AI & ML Undergraduate | Full-Stack Developer"
                className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Contact Email</label>
              <input
                name="email"
                type="email"
                defaultValue={settings?.email || ""}
                placeholder="you@example.com"
                className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">GitHub URL</label>
              <input
                name="github"
                defaultValue={settings?.github || ""}
                placeholder="https://github.com/username"
                className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">LinkedIn URL</label>
              <input
                name="linkedin"
                defaultValue={settings?.linkedin || ""}
                placeholder="https://linkedin.com/in/username"
                className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-foreground">Resume URL</label>
              <input
                name="resumeUrl"
                defaultValue={settings?.resumeUrl || ""}
                placeholder="/resume.pdf or https://..."
                className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-border-color">
            <h2 className="text-lg font-semibold text-foreground mb-4">SEO Settings</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">SEO Title</label>
                <input
                  name="seoTitle"
                  defaultValue={settings?.seoTitle || ""}
                  placeholder="Siddhartha Kuchana | AI & ML Developer"
                  className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">SEO Description</label>
                <textarea
                  name="seoDesc"
                  defaultValue={settings?.seoDesc || ""}
                  rows={3}
                  placeholder="A brief description for search engines..."
                  className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border-color flex items-center justify-between">
            <p className="text-xs text-text-muted">Changes will reflect on your public portfolio immediately after saving.</p>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-accent text-background font-semibold px-8 py-2.5 rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
