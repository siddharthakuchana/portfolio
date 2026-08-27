"use client";

import { useEffect, useState, useCallback } from "react";
import { MessageSquare, Mail, User, Clock, Trash2, CheckCircle, CircleAlert, RefreshCw, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

interface MessagesClientProps {
  initialMessages: ContactMessage[];
}

export default function MessagesClient({ initialMessages }: MessagesClientProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date>(new Date());
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchMessages = useCallback(async (showSpin = false) => {
    if (showSpin) setIsRefreshing(true);
    try {
      const res = await fetch("/api/admin/messages", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.messages)) {
          setMessages(data.messages);
          setLastSynced(new Date());
        }
      }
    } catch (err) {
      console.error("Error polling messages:", err);
    } finally {
      if (showSpin) {
        setTimeout(() => setIsRefreshing(false), 400);
      }
    }
  }, []);

  // Poll every 3 seconds for real-time live sync
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages(false);
    }, 3000);

    const handleFocus = () => {
      fetchMessages(true);
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchMessages]);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    setActionLoadingId(id);
    const newStatus = currentStatus === "READ" ? "UNREAD" : "READ";

    // Optimistic update
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );

    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) {
        // Revert on error
        fetchMessages(false);
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
      fetchMessages(false);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    setActionLoadingId(id);
    // Optimistic update
    setMessages((prev) => prev.filter((m) => m.id !== id));

    try {
      const res = await fetch(`/api/admin/messages?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        fetchMessages(false);
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
      fetchMessages(false);
    } finally {
      setActionLoadingId(null);
    }
  };

  const unreadCount = messages.filter((m) => m.status === "UNREAD").length;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-color pb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-accent" />
            <span>Contact Messages ({messages.length})</span>
          </h1>
          <p className="text-text-muted mt-1">Inquiries & messages submitted from your public portfolio contact form.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Live Auto-Sync Badge */}
          <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>Live Sync Active (3s)</span>
          </div>

          {/* Unread Pill */}
          {unreadCount > 0 && (
            <div className="px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/40 text-accent font-semibold text-xs flex items-center gap-2">
              <CircleAlert className="w-4 h-4 animate-pulse" />
              <span>{unreadCount} Unread</span>
            </div>
          )}

          {/* Manual Refresh Button */}
          <button
            onClick={() => fetchMessages(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-surface border border-border-color text-xs font-medium text-text-muted hover:text-foreground hover:border-accent transition-all cursor-pointer"
            title={`Last synced at ${lastSynced.toLocaleTimeString()}`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-accent" : ""}`} />
            <span>{isRefreshing ? "Syncing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <div className="bg-surface border border-border-color rounded-3xl p-12 text-center space-y-3 shadow-xl">
          <MessageSquare className="w-12 h-12 text-text-muted mx-auto opacity-40" />
          <h3 className="text-lg font-bold text-foreground">No messages in inbox</h3>
          <p className="text-sm text-text-muted">Messages sent via your portfolio contact form will automatically appear here in real time.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isUnread = msg.status === "UNREAD";
              const isLoading = actionLoadingId === msg.id;

              return (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className={`bg-surface border rounded-2xl p-6 shadow-xl transition-all space-y-4 ${
                    isUnread
                      ? "border-accent/70 ring-1 ring-accent/30 shadow-accent/5"
                      : "border-border-color opacity-90"
                  } ${isLoading ? "opacity-60 pointer-events-none" : ""}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-color/60 pb-4">
                    <div className="flex flex-wrap items-center gap-2.5 font-bold text-foreground">
                      <User className="w-4.5 h-4.5 text-accent" />
                      <span className="text-base">{msg.name || "Anonymous"}</span>
                      <span className="text-xs text-text-muted font-mono bg-background px-2.5 py-1 rounded-lg border border-border-color/60">
                        {msg.email || "No email"}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          isUnread
                            ? "bg-accent text-background font-mono shadow-sm"
                            : "bg-surface-hover text-text-muted font-mono"
                        }`}
                      >
                        {msg.status || "READ"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "Recent"}</span>
                      </div>

                      <a
                        href={`mailto:${msg.email}?subject=Re: Portfolio Inquiry from ${encodeURIComponent(
                          msg.name
                        )}&body=Hi ${encodeURIComponent(msg.name)},%0A%0AThank you for reaching out!%0A%0A`}
                        className="p-2 text-text-muted hover:text-accent hover:bg-surface-hover rounded-lg transition-colors border border-border-color/40"
                        title="Reply via Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleToggleStatus(msg.id, msg.status)}
                        className="p-2 text-text-muted hover:text-emerald-400 hover:bg-surface-hover rounded-lg transition-colors border border-border-color/40 cursor-pointer"
                        title={isUnread ? "Mark as Read" : "Mark as Unread"}
                      >
                        <CheckCircle
                          className={`w-4 h-4 ${isUnread ? "text-text-muted opacity-50" : "text-emerald-400"}`}
                        />
                      </button>

                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-border-color/40 cursor-pointer"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap font-sans bg-background/50 p-4 rounded-xl border border-border-color/40 select-text">
                    {msg.message}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
