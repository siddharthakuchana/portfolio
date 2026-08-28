"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Upload, Copy, Check, Trash2, Image as ImageIcon, Link as LinkIcon, ExternalLink, Globe, Layout, BookOpen, User, AlertCircle, Sparkles, FolderKanban } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type?: string;
  size?: number;
  category?: string;
  createdAt?: Date | string;
}

export default function MediaLibraryManager({ initialMedia }: { initialMedia: MediaItem[] }) {
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);
  const [selectedCategory, setSelectedCategory] = useState<"NORMAL" | "PROJECT">("NORMAL");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "NORMAL" | "PROJECT">("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with API on mount to ensure no stale server cache
  useEffect(() => {
    async function syncMedia() {
      try {
        const res = await fetch("/api/admin/media");
        if (res.ok) {
          const data = await res.json();
          if (data.media && Array.isArray(data.media)) {
            setMediaList(data.media);
          }
        }
      } catch (err) {
        console.error("Error syncing media in admin:", err);
      }
    }

    syncMedia();
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setUploadProgress(`Uploading ${files.length} file(s)...`);

    let uploadedCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", selectedCategory);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          setErrorMessage(data.error || `Failed to upload ${file.name}`);
        } else if (data.media) {
          setMediaList((prev) => [data.media, ...prev]);
          uploadedCount++;
        }
      } catch (err: any) {
        console.error("Upload error:", err);
        setErrorMessage(err.message || "Failed to upload file due to network error");
      }
    }

    if (uploadedCount > 0) {
      setSuccessMessage(
        `Successfully uploaded ${uploadedCount} photo(s) as ${
          selectedCategory === "NORMAL" ? "Normal Gallery Photos" : "Project Photos"
        }!`
      );
      setTimeout(() => setSuccessMessage(""), 5000);
    }

    setIsUploading(false);
    setUploadProgress("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCategoryToggle = async (id: string, currentCategory?: string) => {
    const newCategory = currentCategory === "PROJECT" ? "NORMAL" : "PROJECT";
    try {
      const res = await fetch("/api/admin/media", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, category: newCategory }),
      });

      if (res.ok) {
        setMediaList((prev) =>
          prev.map((item) => (item.id === id ? { ...item, category: newCategory } : item))
        );
      }
    } catch (err) {
      console.error("Category update failed:", err);
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media item?")) return;
    setIsDeleting(id);
    setErrorMessage("");

    try {
      const res = await fetch(`/api/admin/media?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMediaList((prev) => prev.filter((item) => item.id !== id));
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Failed to delete item");
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(null);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "0 B";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const filteredMedia = mediaList.filter((item) => {
    if (filter === "NORMAL") return (item.category || "NORMAL") === "NORMAL";
    if (filter === "PROJECT") return item.category === "PROJECT";
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-6 rounded-2xl border border-border-color shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ImageIcon className="text-accent" size={26} />
            Media Library & Photo Manager
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Upload and categorize photos as <strong>Normal (Public Card Swipe Gallery)</strong> or <strong>Project Related</strong>.
          </p>
        </div>

        {/* Upload Button */}
        <label className="cursor-pointer bg-accent text-background font-semibold px-5 py-3 rounded-xl hover:bg-accent/90 transition-all flex items-center gap-2 justify-center shadow-lg shadow-accent/20">
          <Upload size={18} />
          <span>Upload Photos</span>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Upload Category Selection Card */}
      <div className="bg-surface border border-border-color rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
            <Sparkles size={16} className="text-accent" />
            Upload Category Setting
          </h3>
          <p className="text-xs text-text-muted mt-1">
            Choose how your newly uploaded photos will be categorized:
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSelectedCategory("NORMAL")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
              selectedCategory === "NORMAL"
                ? "bg-accent/15 border-accent text-accent shadow-sm"
                : "bg-background border-border-color text-text-muted hover:text-foreground"
            }`}
          >
            <Sparkles size={14} />
            <span>Normal Photo (Public Card Swipe Gallery)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory("PROJECT")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
              selectedCategory === "PROJECT"
                ? "bg-purple-500/15 border-purple-500 text-purple-400 shadow-sm"
                : "bg-background border-border-color text-text-muted hover:text-foreground"
            }`}
          >
            <FolderKanban size={14} />
            <span>Project Related Photo</span>
          </button>
        </div>
      </div>

      {/* Status Notifications */}
      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm flex items-center gap-2">
          <Check size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        className="border-2 border-dashed border-border-color hover:border-accent/50 rounded-2xl p-8 text-center bg-surface/50 transition-colors cursor-pointer relative"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files);
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-4 bg-accent/10 rounded-2xl text-accent">
            <Upload size={28} />
          </div>
          <div>
            <p className="font-semibold text-foreground">Drag and drop photos here, or click to browse</p>
            <p className="text-xs text-text-muted mt-1">
              Will upload as: <strong className="text-accent">{selectedCategory === "NORMAL" ? "Normal Public Gallery Photo" : "Project Photo"}</strong>
            </p>
          </div>
          {isUploading && (
            <div className="text-sm font-medium text-accent animate-pulse">{uploadProgress}</div>
          )}
        </div>
      </div>

      {/* Public Side Info Banner */}
      <div className="bg-surface border border-border-color rounded-2xl p-6">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
          <Globe size={20} className="text-accent" />
          Public Site Display Behavior
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-text-muted">
          <div className="p-4 bg-background border border-border-color rounded-xl flex items-start gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm">Normal Gallery Photos</h4>
              <p className="mt-1">
                Automatically display in the interactive <strong>Card Swipe Slideshow</strong> section on your public homepage directly below Journey!
              </p>
            </div>
          </div>

          <div className="p-4 bg-background border border-border-color rounded-xl flex items-start gap-3">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <FolderKanban size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm">Project Related Photos</h4>
              <p className="mt-1">
                Tagged specifically for use inside Projects showcase cards and detailed case study markdown.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              filter === "all"
                ? "bg-accent text-background"
                : "bg-surface text-text-muted hover:text-foreground"
            }`}
          >
            All Photos ({mediaList.length})
          </button>
          <button
            onClick={() => setFilter("NORMAL")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              filter === "NORMAL"
                ? "bg-accent text-background"
                : "bg-surface text-text-muted hover:text-foreground"
            }`}
          >
            Public Gallery ({mediaList.filter((m) => (m.category || "NORMAL") === "NORMAL").length})
          </button>
          <button
            onClick={() => setFilter("PROJECT")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              filter === "PROJECT"
                ? "bg-purple-500 text-white"
                : "bg-surface text-text-muted hover:text-foreground"
            }`}
          >
            Project Photos ({mediaList.filter((m) => m.category === "PROJECT").length})
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <AnimatePresence>
          {filteredMedia.length === 0 ? (
            <div className="col-span-full py-16 text-center text-text-muted bg-surface rounded-2xl border border-border-color">
              <ImageIcon size={40} className="mx-auto mb-3 text-text-muted opacity-40" />
              <p className="text-sm font-medium">No media items found in this category.</p>
              <p className="text-xs mt-1">Upload photos using the area above.</p>
            </div>
          ) : (
            filteredMedia.map((item) => {
              const isNormalCategory = (item.category || "NORMAL") === "NORMAL";
              const isImage = item.url.startsWith("data:") || item.url.startsWith("http") || item.url.startsWith("/") || (item.type && item.type.startsWith("image/"));

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative bg-surface border border-border-color rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative aspect-square w-full bg-background/50 flex items-center justify-center overflow-hidden">
                    {isImage ? (
                      <Image
                        src={item.url}
                        alt={item.filename || "Uploaded media"}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center p-3 text-center text-text-muted">
                        <LinkIcon size={24} className="mb-1 text-accent" />
                        <span className="text-xs truncate max-w-full font-mono">{item.filename}</span>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md shadow-sm border ${
                          isNormalCategory
                            ? "bg-accent/90 text-background border-accent"
                            : "bg-purple-600/90 text-white border-purple-400"
                        }`}
                      >
                        {isNormalCategory ? "Gallery" : "Project"}
                      </span>
                    </div>

                    {/* Hover Overlay Controls */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
                      <button
                        onClick={() => handleCategoryToggle(item.id, item.category)}
                        className="p-2.5 bg-background text-foreground hover:bg-accent hover:text-background rounded-full transition-all shadow-md cursor-pointer"
                        title={isNormalCategory ? "Change to Project Photo" : "Change to Normal Gallery Photo"}
                      >
                        {isNormalCategory ? <FolderKanban size={16} /> : <Sparkles size={16} />}
                      </button>

                      <button
                        onClick={() => handleCopyUrl(item.id, item.url)}
                        className="p-2.5 bg-background text-foreground hover:bg-accent hover:text-background rounded-full transition-all shadow-md cursor-pointer"
                        title="Copy Public URL"
                      >
                        {copiedId === item.id ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting === item.id}
                        className="p-2.5 bg-background text-red-400 hover:bg-red-500 hover:text-white rounded-full transition-all shadow-md cursor-pointer"
                        title="Delete Media"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="p-3 border-t border-border-color/50 bg-surface">
                    <p className="text-xs font-semibold text-foreground truncate" title={item.filename}>
                      {item.filename}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-text-muted mt-1">
                      <span>{formatFileSize(item.size)}</span>
                      <button
                        onClick={() => handleCategoryToggle(item.id, item.category)}
                        className="text-accent hover:underline text-[10px] font-medium cursor-pointer"
                      >
                        {isNormalCategory ? "→ Set Project" : "→ Set Gallery"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
