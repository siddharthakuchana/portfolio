"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/sk-portal-secret-994");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface border border-border-color rounded-2xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-blue-600" />
        
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-accent/10 text-accent rounded-2xl mb-3">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-foreground">
            PORTFOLIO<span className="text-accent">CMS</span>
          </h1>
          <p className="text-sm text-text-muted mt-1">Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border-color rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border-color rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent text-background font-semibold rounded-lg px-6 py-3 flex items-center justify-center space-x-2 hover:bg-accent/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? "Signing in..." : "Sign in to Dashboard"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border-color/50 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-sm text-text-muted hover:text-accent transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            <span>Back to Public Portfolio</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
