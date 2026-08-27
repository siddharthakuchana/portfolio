"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Printer,
  FileText,
  Maximize2,
  Minimize2,
  Eye,
  Briefcase,
  Code2,
  GraduationCap,
  Award,
  Phone,
  Mail,
} from "lucide-react";
import { resumePdfBase64 } from "@/lib/resumeBase64";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import SwitchButton from "@/components/ui/SwitchButton";

export default function ResumePage() {
  const portfolioData = usePortfolioData();
  const [viewAsPdf, setViewAsPdf] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pdfDataUrl = `data:application/pdf;base64,${resumePdfBase64}`;

  const handlePrint = () => {
    window.print();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-4 pb-12 px-4 sm:px-6">
      {/* Header Bar */}
      <div className="max-w-6xl mx-auto w-full mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-surface/90 border border-border-color shadow-2xl backdrop-blur-xl">
          {/* File Info & Back Link */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-background border border-border-color text-text-muted hover:text-accent hover:border-accent transition-colors"
              title="Back to Portfolio"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-accent/10 border border-accent/20 text-accent">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span>Siddhartha_Kuchana_Resume.pdf</span>
                  <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-mono">
                    PDF
                  </span>
                </h1>
                <p className="text-xs text-text-muted">
                  Official Resume • Siddhartha Kuchana (AI & ML Engineer)
                </p>
              </div>
            </div>
          </div>

          {/* Controls & Mode Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
            {/* View Mode Toggle Switch */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background border border-border-color">
              <span className="text-xs font-mono font-medium text-text-muted">
                {viewAsPdf ? "Raw PDF Reader" : "Formatted CV"}
              </span>
              <SwitchButton
                checked={viewAsPdf}
                onCheckedChange={setViewAsPdf}
                leftIcon={<FileText className="w-3.5 h-3.5" />}
                rightIcon={<Eye className="w-3.5 h-3.5 text-accent" />}
              />
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-background border border-border-color text-xs font-medium text-text-muted hover:text-foreground hover:border-accent transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-accent" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <a
              href={pdfDataUrl}
              download="Siddhartha_Kuchana_Resume.pdf"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-background text-xs font-bold hover:bg-accent/90 transition-all shadow-lg cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-background border border-border-color text-text-muted hover:text-accent transition-colors cursor-pointer"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        {viewAsPdf ? (
          /* Raw PDF Reader View */
          <div className="w-full h-[82vh] bg-surface/80 border border-border-color rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl relative">
            <object
              data={`${pdfDataUrl}#toolbar=1&navpanes=0`}
              type="application/pdf"
              className="w-full h-full rounded-3xl"
            >
              <iframe
                src={`${pdfDataUrl}#toolbar=1`}
                className="w-full h-full rounded-3xl border-none"
                title="Siddhartha Kuchana Resume PDF"
              />
            </object>
          </div>
        ) : (
          /* Formatted CV Layout View */
          <div className="p-8 sm:p-12 bg-surface/90 border border-border-color rounded-3xl shadow-2xl backdrop-blur-2xl space-y-8 text-foreground">
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
        )}
      </div>
    </div>
  );
}
