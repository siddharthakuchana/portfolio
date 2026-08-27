import { NextResponse } from "next/server";
import { resumePdfBase64 } from "@/lib/resumeBase64";

export async function GET() {
  try {
    const buffer = Buffer.from(resumePdfBase64, "base64");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Siddhartha_Kuchana_Resume.pdf"',
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving resume PDF:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
