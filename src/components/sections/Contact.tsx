"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle, Sparkles } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submittedSender, setSubmittedSender] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSubmittedSender(name);
        setFormState("success");
      } else {
        setErrorMessage(data.error || "Failed to send your message. Please try again.");
        setFormState("error");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setErrorMessage("Network error occurred. Please check your connection and try again.");
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            Let's build something <span className="text-accent">useful.</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto mt-6">
            Have an opportunity, project idea, or just want to connect? My inbox is always open.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-surface border border-border-color rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle gradient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center justify-center py-12 text-center h-full min-h-[340px]"
              >
                <div className="relative mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="w-20 h-20 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-emerald-500/20"
                  >
                    <CheckCircle2 size={42} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.5, 1.8] }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md pointer-events-none"
                  />
                </div>

                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">Message Delivered!</h3>
                </div>

                <p className="text-text-muted max-w-md mx-auto leading-relaxed text-sm md:text-base mb-2">
                  Thank you{submittedSender ? `, ${submittedSender}` : ""}! Your message has been directly dispatched to my dashboard.
                </p>
                <p className="text-xs text-accent font-medium font-mono">
                  Status: Delivered to Admin • Direct Reply Pending
                </p>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setFormState("idle")}
                  className="mt-8 px-6 py-3 bg-accent text-background font-bold text-sm rounded-xl hover:bg-accent-muted transition-all shadow-lg shadow-accent/20 cursor-pointer"
                >
                  Send another message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="relative z-10 space-y-6"
              >
                {formState === "error" && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center justify-between">
                      <span>Name</span>
                      <span className="text-xs text-text-muted">*Required</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      disabled={formState === "submitting"}
                      className="w-full bg-background border border-border-color rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all disabled:opacity-50"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center justify-between">
                      <span>Email</span>
                      <span className="text-xs text-text-muted">*Required</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      disabled={formState === "submitting"}
                      className="w-full bg-background border border-border-color rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all disabled:opacity-50"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground flex items-center justify-between">
                    <span>Message</span>
                    <span className="text-xs text-text-muted">*Required</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    disabled={formState === "submitting"}
                    className="w-full bg-background border border-border-color rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none disabled:opacity-50"
                    placeholder="How can I help you?"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={formState === "submitting"}
                  whileHover={formState === "submitting" ? {} : { scale: 1.01 }}
                  whileTap={formState === "submitting" ? {} : { scale: 0.98 }}
                  className="w-full bg-foreground text-background font-bold rounded-xl px-6 py-4 flex items-center justify-center space-x-2 hover:bg-white/95 transition-all disabled:opacity-75 disabled:cursor-not-allowed group relative overflow-hidden shadow-lg cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {formState === "submitting" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-accent" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-accent" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-accent/20 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 z-0" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

