import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET: Fetch all messages for real-time polling
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    const unreadCount = messages.filter((m) => m.status === "UNREAD").length;

    return NextResponse.json({ success: true, messages, unreadCount });
  } catch (error: any) {
    console.error("Error fetching admin messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// PATCH: Toggle message status (READ/UNREAD)
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/sk-portal-secret-994/messages", "page");
    revalidatePath("/sk-portal-secret-994", "page");

    return NextResponse.json({ success: true, message: updated });
  } catch (error: any) {
    console.error("Error updating message status:", error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

// DELETE: Remove message
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing message id" }, { status: 400 });
    }

    await prisma.contactMessage.delete({ where: { id } });

    revalidatePath("/sk-portal-secret-994/messages", "page");
    revalidatePath("/sk-portal-secret-994", "page");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting message:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
