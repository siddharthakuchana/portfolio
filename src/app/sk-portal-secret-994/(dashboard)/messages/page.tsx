import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MessageSquare, Mail, User, Clock } from "lucide-react";

export default async function MessagesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sk-portal-secret-994/login");
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

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
        <div className="bg-surface border border-border-color rounded-3xl p-12 text-center space-y-3">
          <MessageSquare className="w-12 h-12 text-text-muted mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-foreground">No messages yet</h3>
          <p className="text-sm text-text-muted">Messages sent via your portfolio contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-surface border border-border-color rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-color/60 pb-3">
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <User className="w-4 h-4 text-accent" />
                  <span>{msg.name}</span>
                  <span className="text-xs text-text-muted font-mono">({msg.email})</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
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
