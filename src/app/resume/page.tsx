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
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { resumePdfBase64 } from "@/lib/resumeBase64";

export default function ResumePage() {
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
      {/* Online PDF Viewer Header Bar (Adobe / Google Drive Style) */}
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

          {/* Controls Bar */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
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

      {/* Embedded Interactive PDF Viewer Object/Iframe */}
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
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
            >
              <div className="p-8 text-center space-y-4">
                <p className="text-text-muted">
                  Your browser doesn't support direct embedded PDF viewing.
                </p>
                <a
                  href={pdfDataUrl}
                  download="Siddhartha_Kuchana_Resume.pdf"
                  className="px-6 py-3 bg-accent text-background rounded-full font-bold inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Click here to download PDF</span>
                </a>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    </div>
  );
}
