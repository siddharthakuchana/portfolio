"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Settings,
  LogOut,
  Layers,
  Image as ImageIcon,
  MessageSquare,
  Award,
  Terminal,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/technologies", label: "Technologies", icon: Terminal },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/achievements", label: "Achievements", icon: Award },
    { href: "/admin/media", label: "Media Library", icon: ImageIcon },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
    { href: "/admin/homepage", label: "Homepage CMS", icon: Layers },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-border-color h-full flex flex-col z-50">
      <div className="p-6 border-b border-border-color">
        <Link href="/admin" className="text-xl font-bold tracking-tighter">
          PORTFOLIO<span className="text-accent">CMS</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-text-muted hover:bg-surface-hover hover:text-foreground"
              }`}
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border-color">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center space-x-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
