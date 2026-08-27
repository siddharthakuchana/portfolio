"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitPullRequest, Users, Star, ExternalLink, Code2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";

interface GithubStats {
  publicRepos: number;
  followers: number;
  following: number;
  avatarUrl: string;
  login: string;
  htmlUrl: string;
}

export default function GithubSection() {
  const portfolioData = usePortfolioData();
  const githubUrl = portfolioData.socials.github || "https://github.com/siddharthakuchana";

  const [stats, setStats] = useState<GithubStats>({
    publicRepos: 16,
    followers: 6,
    following: 9,
    avatarUrl: "https://avatars.githubusercontent.com/u/245591334?v=4",
    login: "siddharthakuchana",
    htmlUrl: "https://github.com/siddharthakuchana",
  });

  useEffect(() => {
    fetch("https://api.github.com/users/siddharthakuchana")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.public_repos !== undefined) {
          setStats({
            publicRepos: data.public_repos,
            followers: data.followers,
            following: data.following,
            avatarUrl: data.avatar_url || "https://avatars.githubusercontent.com/u/245591334?v=4",
            login: data.login || "siddharthakuchana",
            htmlUrl: data.html_url || "https://github.com/siddharthakuchana",
          });
        }
      })
      .catch((err) => console.log("GitHub API fetch error:", err));
  }, []);

  return (
    <section id="github" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
            GitHub Activity Sync
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            Code is where the <span className="text-accent">ideas become real.</span>
          </h2>
          <div className="w-20 h-1 bg-accent/30 rounded-full mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto bg-surface border border-border-color rounded-3xl overflow-hidden p-8 md:p-12 text-center group shadow-2xl backdrop-blur-xl"
        >
          {/* Background decorative halos */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-700 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-colors duration-700 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Avatar & Icon */}
            <a
              href={stats.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-20 h-20 bg-background border-2 border-accent/40 rounded-full flex items-center justify-center mb-6 overflow-hidden group-hover:scale-105 transition-transform shadow-lg cursor-pointer"
            >
              {stats.avatarUrl ? (
                <img
                  src={stats.avatarUrl}
                  alt={stats.login}
                  className="w-full h-full object-cover"
                />
              ) : (
                <GithubIcon width={40} height={40} className="text-foreground group-hover:text-accent transition-colors" />
              )}
            </a>

            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              @{stats.login}
            </h3>

            <p className="text-text-muted max-w-lg mx-auto mb-8 leading-relaxed text-sm sm:text-base">
              I actively build, contribute, and share code on GitHub. Specialized in Machine Learning, Computer Vision, FastAPI backends, and full-stack web applications.
            </p>

            {/* Live Synced Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mx-auto mb-10">
              <div className="bg-background/80 border border-border-color rounded-2xl p-5 flex flex-col items-center justify-center gap-2 shadow-sm">
                <GitPullRequest size={22} className="text-accent" />
                <span className="text-xs font-mono font-medium text-text-muted uppercase tracking-wider">
                  Public Repos
                </span>
                <span className="text-3xl font-extrabold font-mono text-foreground">
                  {stats.publicRepos}
                </span>
              </div>

              <div className="bg-background/80 border border-border-color rounded-2xl p-5 flex flex-col items-center justify-center gap-2 shadow-sm">
                <Users size={22} className="text-blue-400" />
                <span className="text-xs font-mono font-medium text-text-muted uppercase tracking-wider">
                  Followers
                </span>
                <span className="text-3xl font-extrabold font-mono text-foreground">
                  {stats.followers}
                </span>
              </div>

              <div className="bg-background/80 border border-border-color rounded-2xl p-5 flex flex-col items-center justify-center gap-2 shadow-sm">
                <Code2 size={22} className="text-emerald-400" />
                <span className="text-xs font-mono font-medium text-text-muted uppercase tracking-wider">
                  Contributions
                </span>
                <span className="text-3xl font-extrabold font-mono text-foreground">
                  Active
                </span>
              </div>
            </div>

            {/* GitHub Link Button */}
            <a
              href={stats.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-accent text-background font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 inline-flex items-center space-x-2 shadow-xl cursor-pointer"
            >
              <GithubIcon width={20} height={20} />
              <span>Visit GitHub Profile (@{stats.login})</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
