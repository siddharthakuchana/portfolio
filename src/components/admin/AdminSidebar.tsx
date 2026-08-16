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
  ExternalLink,
  Globe,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/sk-portal-secret-994", label: "Dashboard", icon: LayoutDashboard },
    { href: "/sk-portal-secret-994/projects", label: "Projects", icon: FolderKanban },
    { href: "/sk-portal-secret-994/technologies", label: "Technologies", icon: Terminal },
    { href: "/sk-portal-secret-994/blog", label: "Blog", icon: FileText },
    { href: "/sk-portal-secret-994/achievements", label: "Achievements", icon: Award },
    { href: "/sk-portal-secret-994/media", label: "Media Library", icon: ImageIcon },
    { href: "/sk-portal-secret-994/messages", label: "Messages", icon: MessageSquare },
    { href: "/sk-portal-secret-994/homepage", label: "Homepage CMS", icon: Layers },
    { href: "/sk-portal-secret-994/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-border-color h-full flex flex-col z-50">
      <div className="p-6 border-b border-border-color flex items-center justify-between">
        <Link href="/sk-portal-secret-994" className="text-xl font-bold tracking-tighter">
          PORTFOLIO<span className="text-accent">CMS</span>
        </Link>
        <Link
          href="/"
          target="_blank"
          className="text-text-muted hover:text-accent p-1.5 rounded-lg hover:bg-surface-hover transition-colors"
          title="View Live Portfolio"
        >
          <ExternalLink size={18} />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <Link
          href="/"
          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-surface-hover hover:text-accent transition-colors font-medium mb-3 border border-border-color/50 bg-background/50"
        >
          <Globe size={18} />
          <span>Public Portfolio</span>
        </Link>

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
          onClick={() => signOut({ callbackUrl: "/sk-portal-secret-994/login" })}
          className="flex w-full items-center space-x-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer font-medium"
        >
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
