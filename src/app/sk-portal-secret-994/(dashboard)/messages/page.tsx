import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import MessagesClient from "@/components/admin/MessagesClient";

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
    const rawMessages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    // Serialize dates to string format for Client Component props
    messages = rawMessages.map((m) => ({
      ...m,
      createdAt: m.createdAt ? m.createdAt.toISOString() : new Date().toISOString(),
    }));
  } catch (err) {
    console.error("Error fetching contact messages:", err);
  }

  return <MessagesClient initialMessages={messages} />;
}


