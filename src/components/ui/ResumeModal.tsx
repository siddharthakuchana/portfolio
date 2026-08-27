"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Printer,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
} from "lucide-react";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { resumePdfBase64 } from "@/lib/resumeBase64";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const portfolioData = usePortfolioData();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const pdfDataUrl = `data:application/pdf;base64,${resumePdfBase64}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-surface border border-border-color rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 my-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-color bg-surface/90 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
              <h2 className="text-lg font-bold text-foreground tracking-tight">
                Curriculum Vitae / Resume
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-hover border border-border-color text-xs font-medium text-text-muted hover:text-foreground hover:border-accent transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>

              <a
                href={pdfDataUrl}
                download="Siddhartha_Kuchana_Resume.pdf"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent text-background text-xs font-semibold hover:bg-accent/90 transition-colors shadow-md cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content / Printable Resume Layout */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 print:p-0 print:overflow-visible text-foreground">
            {/* Header Section */}
            <div className="text-center pb-6 border-b border-border-color/80">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                Siddhartha Kuchana
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-text-muted font-mono">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  +91 94411 22288
                </span>
                <span>•</span>
                <a
                  href={`mailto:${portfolioData.socials.email}`}
                  className="flex items-center gap-1 hover:text-accent transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  {portfolioData.socials.email}
                </a>
                <span>•</span>
                <a
                  href={portfolioData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-accent transition-colors"
                >
                  <LinkedinIcon width={14} height={14} className="text-blue-400" />
                  linkedin.com/in/siddharthakuchana
                </a>
                <span>•</span>
                <a
                  href={portfolioData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-accent transition-colors"
                >
                  <GithubIcon width={14} height={14} />
                  github.com/siddharthakuchana
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h3 className="text-xs font-mono text-accent uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-accent" />
                Professional Summary
              </h3>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                Computer Science undergraduate specializing in Artificial Intelligence and Machine
                Learning at JNTU Hyderabad, with hands-on experience building AI-powered
                applications, machine learning systems, automation tools, and full-stack web
                applications using Python. Strong foundation in Data Structures and Algorithms,
                backend development, databases, and machine learning, with a focus on building
                practical and scalable software solutions.
              </p>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-xs font-mono text-accent uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-accent" />
                Technical Skills
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-background/60 border border-border-color/60">
                  <span className="font-semibold text-foreground block mb-1">
                    Programming Languages:
                  </span>
                  <span className="text-text-muted font-mono">Python, JavaScript, C++</span>
                </div>

                <div className="p-3.5 rounded-xl bg-background/60 border border-border-color/60">
                  <span className="font-semibold text-foreground block mb-1">
                    Machine Learning:
                  </span>
                  <span className="text-text-muted font-mono">
                    Machine Learning, Scikit-learn, NumPy, Pandas, Feature Engineering, Data
                    Preprocessing, Model Training, Model Evaluation
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-background/60 border border-border-color/60">
                  <span className="font-semibold text-foreground block mb-1">
                    Computer Vision & NLP:
                  </span>
                  <span className="text-text-muted font-mono">OpenCV, MediaPipe, NLP</span>
                </div>

                <div className="p-3.5 rounded-xl bg-background/60 border border-border-color/60">
                  <span className="font-semibold text-foreground block mb-1">
                    Backend & Web Technologies:
                  </span>
                  <span className="text-text-muted font-mono">
                    FastAPI, Flask, PHP, WebSockets, HTML, CSS, JavaScript, Bootstrap, React, Next.js
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-background/60 border border-border-color/60">
                  <span className="font-semibold text-foreground block mb-1">Databases:</span>
                  <span className="text-text-muted font-mono">MySQL, TiDB</span>
                </div>

                <div className="p-3.5 rounded-xl bg-background/60 border border-border-color/60">
                  <span className="font-semibold text-foreground block mb-1">
                    Tools & IoT:
                  </span>
                  <span className="text-text-muted font-mono">
                    Git, GitHub, VS Code, Selenium, ESP32, MQTT, Streamlit, Joblib
                  </span>
                </div>
              </div>
            </div>

            {/* Key Projects */}
            <div>
              <h3 className="text-xs font-mono text-accent uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-accent" />
                Key Technical Projects
              </h3>

              <div className="space-y-6">
                {/* AlignWell */}
                <div className="p-5 rounded-2xl bg-background/60 border border-border-color/60 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-foreground">
                      AlignWell – AI-Powered Posture Assessment & Exercise Monitoring System
                    </h4>
                    <span className="text-xs font-mono text-accent">FastAPI | MediaPipe | OpenCV</span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-text-muted space-y-1">
                    <li>
                      Developed an AI posture assessment system using Python, FastAPI, MediaPipe, and
                      OpenCV to analyze exercise movements and form.
                    </li>
                    <li>
                      Implemented pose landmark detection and joint-angle analysis to evaluate exercise
                      posture and provide real-time corrective feedback.
                    </li>
                    <li>
                      Integrated WebSocket communication between the computer vision backend and frontend.
                    </li>
                    <li>
                      Designed interactive web interface with exercise guides, webcam integration, and performance tracking.
                    </li>
                  </ul>
                </div>

                {/* Career Guidance */}
                <div className="p-5 rounded-2xl bg-background/60 border border-border-color/60 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-foreground">
                      Career Guidance System
                    </h4>
                    <span className="text-xs font-mono text-accent">Python | Scikit-learn | PHP | MySQL</span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-text-muted space-y-1">
                    <li>
                      Developed an ML-powered career recommendation system predicting suitable paths based on skills and academic preferences.
                    </li>
                    <li>
                      Built machine learning classification models using Scikit-learn, NumPy, and Joblib.
                    </li>
                    <li>
                      Integrated MySQL database storing user profiles and career-related guidance data.
                    </li>
                  </ul>
                </div>

                {/* IoT Fire Evacuation System */}
                <div className="p-5 rounded-2xl bg-background/60 border border-border-color/60 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-foreground">
                      IoT Fire Evacuation System – Real-Time Hazard Monitoring & Dynamic Pathfinding
                    </h4>
                    <span className="text-xs font-mono text-accent">ESP32 | MQTT | A* Algorithm | Streamlit</span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-text-muted space-y-1">
                    <li>
                      Continuous fire safety monitoring system tracking temperature, smoke, and flame sensors to calculate localized hazard scores.
                    </li>
                    <li>
                      Integrated sensor fusion with weighted hazard scoring and A* pathfinding algorithm for safe evacuation routes.
                    </li>
                    <li>
                      Built ESP32 sensor nodes using MQTT for real-time telemetry with LED indicators and buzzer alerts.
                    </li>
                    <li>
                      Developed interactive Streamlit dashboard for building occupancy and hazard heatmaps.
                    </li>
                  </ul>
                </div>

                {/* AutoResultX */}
                <div className="p-5 rounded-2xl bg-background/60 border border-border-color/60 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-foreground">
                      AutoResultX – Automated Result Scraper
                    </h4>
                    <span className="text-xs font-mono text-accent">Python | Selenium | Pandas</span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-text-muted space-y-1">
                    <li>
                      Automated extraction tool for scraping university examination results from dynamic web portals.
                    </li>
                    <li>
                      Bypassed dynamic JavaScript reloads and exported aggregated result reports directly into structured Excel files.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xs font-mono text-accent uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-accent" />
                Education
              </h3>

              <div className="p-5 rounded-2xl bg-background/60 border border-border-color/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-foreground">
                    Bachelor of Technology (B.Tech) in Computer Science and Engineering
                  </h4>
                  <p className="text-xs sm:text-sm text-accent">
                    Specialization: Artificial Intelligence and Machine Learning
                  </p>
                  <p className="text-xs text-text-muted">
                    Jawaharlal Nehru Technological University Hyderabad (JNTUH)
                  </p>
                </div>
                <div className="text-left sm:text-right font-mono">
                  <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold block mb-1">
                    CGPA: 8.41 / 10.0
                  </span>
                  <span className="text-xs text-text-muted">2023 – 2027</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xs font-mono text-accent uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-background/60 border border-border-color/60 font-medium">
                  • Machine Learning / Artificial Intelligence Certification
                </div>
                <div className="p-3.5 rounded-xl bg-background/60 border border-border-color/60 font-medium">
                  • Python Certification
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
