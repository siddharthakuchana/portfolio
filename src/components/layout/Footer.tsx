"use client";

import { usePortfolioData } from "@/components/providers/PortfolioProvider";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function Footer() {
  const portfolioData = usePortfolioData();
  return (
    <footer className="bg-surface py-12 border-t border-border-color">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-xl font-bold tracking-tighter text-foreground uppercase">
            {portfolioData.name || "Siddhartha Kuchana"}
          </h2>
          <p className="text-sm text-text-muted mt-2">AI & ML Undergraduate</p>
          <p className="text-xs text-text-muted mt-6 max-w-xs">
            Built with curiosity, code, and caffeine.
          </p>
        </div>

        <div className="flex space-x-6">
          <a
            href={portfolioData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-foreground transition-colors p-2 bg-background rounded-full hover:bg-surface-hover"
            aria-label="GitHub"
          >
            <GithubIcon width={20} height={20} />
          </a>
          <a
            href={portfolioData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-foreground transition-colors p-2 bg-background rounded-full hover:bg-surface-hover"
            aria-label="LinkedIn"
          >
            <LinkedinIcon width={20} height={20} />
          </a>
          <a
            href={`mailto:${portfolioData.socials.email}`}
            className="text-text-muted hover:text-foreground transition-colors p-2 bg-background rounded-full hover:bg-surface-hover"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl mt-8 pt-8 border-t border-border-color flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs text-text-muted">
          &copy; {new Date().getFullYear()} {portfolioData.name || "Siddhartha Kuchana"}. All rights reserved.
        </p>

        <div className="flex items-center space-x-6 mt-4 md:mt-0 text-xs text-text-muted">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
