import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Copy } from "lucide-react";

export default async function MediaLibrary() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Media Library</h1>
          <p className="text-text-muted mt-1">Manage your uploaded images and files.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.length === 0 ? (
          <div className="col-span-full py-12 text-center text-text-muted bg-surface rounded-xl border border-border-color">
            No media uploaded yet.
          </div>
        ) : (
          media.map((item) => (
            <div key={item.id} className="relative group bg-surface border border-border-color rounded-xl overflow-hidden aspect-square">
              {item.type.startsWith("image/") ? (
                <Image src={item.url} alt={item.filename} fill className="object-cover" />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-text-muted text-xs">
                  {item.filename}
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <button 
                  className="p-2 bg-background/50 hover:bg-accent hover:text-background rounded-full transition-colors text-white"
                  title="Copy URL"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
