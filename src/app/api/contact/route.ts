import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    // Save contact message to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        status: "UNREAD",
      },
    });

    // Create admin notification
    try {
      await prisma.notification.create({
        data: {
          type: "CONTACT_MESSAGE",
          message: `New message received from ${name.trim()} (${email.trim()})`,
          link: "/sk-portal-secret-994/messages",
          read: false,
        },
      });
    } catch (notifErr) {
      console.warn("Could not create notification log:", notifErr);
    }

    // Force revalidate admin messages page and main dashboard
    revalidatePath("/sk-portal-secret-994/messages", "page");
    revalidatePath("/sk-portal-secret-994", "page");

    return NextResponse.json({ success: true, id: contactMessage.id });
  } catch (error: any) {
    console.error("Error creating contact message:", error);
    return NextResponse.json({ error: error?.message || "Failed to send message. Please try again." }, { status: 500 });
  }
}

