import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        status: "UNREAD",
      },
    });

    revalidatePath("/sk-portal-secret-994/messages");

    return NextResponse.json({ success: true, id: contactMessage.id });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
