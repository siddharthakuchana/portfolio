import { prisma } from "@/lib/prisma";
import MediaLibraryManager from "@/components/admin/MediaLibraryManager";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MediaLibrary() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" }
  }).catch(() => []);

  return <MediaLibraryManager initialMedia={media} />;
}
