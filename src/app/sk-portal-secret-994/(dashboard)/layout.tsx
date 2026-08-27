import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Auth session check error:", error);
  }

  if (!session) {
    redirect("/sk-portal-secret-994/login");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground">
      {/* Sidebar Container */}
      <div className="w-full md:w-64 md:shrink-0 md:h-screen md:sticky md:top-0 z-40 bg-surface border-r border-border-color">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <main className="flex-1 p-6 md:p-10 space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
