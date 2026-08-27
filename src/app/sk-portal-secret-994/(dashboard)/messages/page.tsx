import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MessageSquare, Mail, User, Clock, Trash2, CheckCircle, CircleAlert } from "lucide-react";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MessagesPage() {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    console.error("Session check error:", e);
  }

  if (!session) {
    redirect("/sk-portal-secret-994/login");
  }

  let messages: any[] = [];
  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error fetching contact messages:", err);
  }

  async function toggleStatus(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const currentStatus = formData.get("status") as string;
    const newStatus = currentStatus === "READ" ? "UNREAD" : "READ";
    try {
      await prisma.contactMessage.update({
        where: { id },
        data: { status: newStatus },
      });
      revalidatePath("/sk-portal-secret-994/messages", "page");
      revalidatePath("/sk-portal-secret-994", "page");
    } catch (err) {
      console.error("Error toggling message status:", err);
    }
  }

  async function deleteMessage(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    try {
      await prisma.contactMessage.delete({ where: { id } });
      revalidatePath("/sk-portal-secret-994/messages", "page");
      revalidatePath("/sk-portal-secret-994", "page");
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  }

  const unreadCount = messages.filter((m) => m.status === "UNREAD").length;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-color pb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-accent" />
            <span>Contact Messages ({messages.length})</span>
          </h1>
          <p className="text-text-muted mt-1">Inquiries and feedback submitted through your public portfolio contact form.</p>
        </div>

        {unreadCount > 0 && (
          <div className="px-4 py-2 rounded-xl bg-accent/10 border border-accent/30 text-accent font-semibold text-sm flex items-center gap-2 w-fit">
            <CircleAlert className="w-4 h-4 animate-pulse" />
            <span>{unreadCount} Unread {unreadCount === 1 ? "Message" : "Messages"}</span>
          </div>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="bg-surface border border-border-color rounded-3xl p-12 text-center space-y-3 shadow-xl">
          <MessageSquare className="w-12 h-12 text-text-muted mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-foreground">No messages yet</h3>
          <p className="text-sm text-text-muted">Messages sent via your portfolio contact form will appear here in real time.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => {
            const isUnread = msg.status === "UNREAD";
            return (
              <div
                key={msg.id}
                className={`bg-surface border rounded-2xl p-6 shadow-xl transition-all space-y-4 ${
                  isUnread ? "border-accent/60 ring-1 ring-accent/30" : "border-border-color"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-color/60 pb-4">
                  <div className="flex flex-wrap items-center gap-2.5 font-bold text-foreground">
                    <User className="w-4 h-4 text-accent" />
                    <span className="text-base">{msg.name || "Anonymous"}</span>
                    <span className="text-xs text-text-muted font-mono bg-background px-2.5 py-1 rounded-md border border-border-color/60">
                      {msg.email || "No email"}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isUnread
                          ? "bg-accent text-background font-mono"
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
                      href={`mailto:${msg.email}?subject=Re: Portfolio Contact Inquiry&body=Hi ${encodeURIComponent(msg.name)},%0A%0AThank you for reaching out!%0A%0A`}
                      className="p-1.5 text-text-muted hover:text-accent hover:bg-surface-hover rounded-lg transition-colors"
                      title="Reply via Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>

                    <form action={toggleStatus}>
                      <input type="hidden" name="id" value={msg.id} />
                      <input type="hidden" name="status" value={msg.status} />
                      <button
                        type="submit"
                        className="p-1.5 text-text-muted hover:text-emerald-400 hover:bg-surface-hover rounded-lg transition-colors"
                        title={isUnread ? "Mark as Read" : "Mark as Unread"}
                      >
                        <CheckCircle className={`w-4 h-4 ${isUnread ? "text-text-muted opacity-60" : "text-emerald-400"}`} />
                      </button>
                    </form>

                    <form action={deleteMessage}>
                      <input type="hidden" name="id" value={msg.id} />
                      <button
                        type="submit"
                        className="p-1.5 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>

                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap font-sans bg-background/50 p-4 rounded-xl border border-border-color/40">
                  {msg.message}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

