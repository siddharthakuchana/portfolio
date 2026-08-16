"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search, Home, User, Briefcase, FileText, Code, Mail } from "lucide-react";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const portfolioData = usePortfolioData();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    command();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-background/80 backdrop-blur-sm p-4">
      <div className="fixed inset-0" onClick={() => setOpen(false)} />
      
      <Command 
        className="w-full max-w-2xl bg-surface border border-border-color rounded-2xl shadow-2xl overflow-hidden relative z-10"
      >
        <div className="flex items-center border-b border-border-color px-4">
          <Search size={18} className="text-text-muted" />
          <Command.Input 
            autoFocus
            placeholder="Type a command or search..."
            className="flex-1 px-4 py-4 bg-transparent outline-none text-foreground placeholder:text-text-muted" 
          />
        </div>
        
        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-text-muted">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="text-xs font-medium text-text-muted px-2 py-2">
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/"))}
              className="flex items-center px-2 py-3 mt-1 text-sm text-foreground rounded-lg cursor-pointer hover:bg-surface-hover aria-selected:bg-surface-hover aria-selected:text-accent transition-colors"
            >
              <Home size={16} className="mr-3 text-text-muted" />
              Home
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/#about"))}
              className="flex items-center px-2 py-3 mt-1 text-sm text-foreground rounded-lg cursor-pointer hover:bg-surface-hover aria-selected:bg-surface-hover aria-selected:text-accent transition-colors"
            >
              <User size={16} className="mr-3 text-text-muted" />
              About Me
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/projects"))}
              className="flex items-center px-2 py-3 mt-1 text-sm text-foreground rounded-lg cursor-pointer hover:bg-surface-hover aria-selected:bg-surface-hover aria-selected:text-accent transition-colors"
            >
              <Briefcase size={16} className="mr-3 text-text-muted" />
              Projects
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/blog"))}
              className="flex items-center px-2 py-3 mt-1 text-sm text-foreground rounded-lg cursor-pointer hover:bg-surface-hover aria-selected:bg-surface-hover aria-selected:text-accent transition-colors"
            >
              <FileText size={16} className="mr-3 text-text-muted" />
              Blog
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Projects" className="text-xs font-medium text-text-muted px-2 py-2 mt-2">
            {portfolioData.projects.map((project: any) => (
              <Command.Item 
                key={project.id || project.title}
                onSelect={() => runCommand(() => window.open(project.githubUrl || project.githubLink, "_blank"))}
                className="flex items-center px-2 py-3 mt-1 text-sm text-foreground rounded-lg cursor-pointer hover:bg-surface-hover aria-selected:bg-surface-hover aria-selected:text-accent transition-colors"
              >
                <Code size={16} className="mr-3 text-text-muted" />
                {project.title}
              </Command.Item>
            ))}
          </Command.Group>
          
          <Command.Group heading="Social & Contact" className="text-xs font-medium text-text-muted px-2 py-2 mt-2">
            <Command.Item 
              onSelect={() => runCommand(() => window.open(portfolioData.socials.github, "_blank"))}
              className="flex items-center px-2 py-3 mt-1 text-sm text-foreground rounded-lg cursor-pointer hover:bg-surface-hover aria-selected:bg-surface-hover aria-selected:text-accent transition-colors"
            >
              <Code size={16} className="mr-3 text-text-muted" />
              GitHub Profile
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => window.open(`mailto:${portfolioData.socials.email}`))}
              className="flex items-center px-2 py-3 mt-1 text-sm text-foreground rounded-lg cursor-pointer hover:bg-surface-hover aria-selected:bg-surface-hover aria-selected:text-accent transition-colors"
            >
              <Mail size={16} className="mr-3 text-text-muted" />
              Send an Email
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
