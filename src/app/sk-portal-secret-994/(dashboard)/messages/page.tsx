import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MessageSquare, Mail, User, Clock, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";

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

  async function deleteMessage(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    try {
      await prisma.contactMessage.delete({ where: { id } });
      revalidatePath("/sk-portal-secret-994/messages");
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-accent" />
          <span>Contact Messages ({messages.length})</span>
        </h1>
        <p className="text-text-muted mt-1">Inquire messages submitted through your portfolio contact form.</p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-surface border border-border-color rounded-3xl p-12 text-center space-y-3 shadow-xl">
          <MessageSquare className="w-12 h-12 text-text-muted mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-foreground">No messages yet</h3>
          <p className="text-sm text-text-muted">Messages sent via your portfolio contact form will appear here in real time.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-surface border border-border-color rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-color/60 pb-3">
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <User className="w-4 h-4 text-accent" />
                  <span>{msg.name || "Anonymous"}</span>
                  <span className="text-xs text-text-muted font-mono">({msg.email || "No email"})</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : "Recent"}</span>
                  </div>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={msg.id} />
                    <button type="submit" className="text-text-muted hover:text-red-400 p-1 transition-colors" title="Delete message">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
              <p className="text-sm text-text-muted leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
