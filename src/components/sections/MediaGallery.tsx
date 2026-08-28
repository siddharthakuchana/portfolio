"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, Maximize2, X, ImageIcon, Layers, Play, Pause } from "lucide-react";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type?: string;
  size?: number;
  category?: string;
  caption?: string;
}

export default function MediaGallery() {
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for swipe drag
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  useEffect(() => {
    async function fetchGalleryPhotos() {
      try {
        const res = await fetch("/api/admin/media");
        if (res.ok) {
          const data = await res.json();
          if (data.media && Array.isArray(data.media) && data.media.length > 0) {
            // Filter for NORMAL gallery photos or valid image formats
            const galleryMedia = data.media.filter(
              (m: MediaItem) =>
                (!m.category || m.category === "NORMAL") &&
                (m.url.startsWith("data:") || m.url.startsWith("http") || m.url.startsWith("/") || (m.type && m.type.startsWith("image/")))
            );

            if (galleryMedia.length > 0) {
              setPhotos(galleryMedia);
            } else {
              // Fallback to all uploaded items if none explicitly tagged as NORMAL
              const imageMedia = data.media.filter(
                (m: MediaItem) =>
                  m.url.startsWith("data:") || m.url.startsWith("http") || m.url.startsWith("/") || (m.type && m.type.startsWith("image/"))
              );
              setPhotos(imageMedia);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching media gallery:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGalleryPhotos();
  }, []);

  // Automatic Slideshow Timer (Advances every 4 seconds unless hovered, paused, or in lightbox)
  useEffect(() => {
    if (!isAutoPlay || isHovered || photos.length <= 1 || lightboxImage) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered, photos.length, lightboxImage]);

  const handleNext = () => {
    if (photos.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    if (photos.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -80) {
      handleNext();
    } else if (info.offset.x > 80) {
      handlePrev();
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-background/50 border-y border-border-color/40 relative">
        <div className="max-w-6xl mx-auto px-6 text-center text-text-muted">
          <div className="inline-flex p-4 bg-surface rounded-2xl border border-border-color mb-4 animate-pulse">
            <ImageIcon size={28} className="text-accent opacity-50" />
          </div>
          <p className="text-sm font-medium">Loading Media Gallery...</p>
        </div>
      </section>
    );
  }

  if (photos.length === 0) {
    return null; // Hide section cleanly if zero photos are present
  }

  const currentPhoto = photos[currentIndex];
  const nextPhoto = photos[(currentIndex + 1) % photos.length];
  const prevPhoto = photos[(currentIndex - 1 + photos.length) % photos.length];

  return (
    <section id="media-gallery" className="py-24 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-widest">
            <Sparkles size={14} />
            <span>Visual Gallery</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Media <span className="text-accent">Gallery</span>
          </h2>

          <p className="text-text-muted text-sm md:text-base">
            Auto-playing 3D slideshow. Drag, swipe, or click to explore.
          </p>
        </div>

        {/* 3D Card Swipe Carousel */}
        <div
          className="relative max-w-lg mx-auto aspect-[4/3] flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Card Stack Background (Next Photo Preview) */}
          {photos.length > 1 && (
            <motion.div
              className="absolute inset-0 rounded-3xl overflow-hidden border border-border-color bg-surface shadow-xl pointer-events-none opacity-40 scale-95 translate-y-4"
              initial={false}
              animate={{ scale: 0.94, y: 16 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={nextPhoto.url}
                alt={nextPhoto.filename || "Gallery image"}
                fill
                unoptimized
                className="object-cover filter blur-[1px]"
              />
            </motion.div>
          )}

          {/* Card Stack Background 2 (Previous Photo Preview) */}
          {photos.length > 2 && (
            <motion.div
              className="absolute inset-0 rounded-3xl overflow-hidden border border-border-color bg-surface shadow-2xl pointer-events-none opacity-20 scale-90 translate-y-8"
              initial={false}
              animate={{ scale: 0.88, y: 28 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={prevPhoto.url}
                alt={prevPhoto.filename || "Gallery image"}
                fill
                unoptimized
                className="object-cover"
              />
            </motion.div>
          )}

          {/* Main Active Card with Drag Swipe & Auto-Play */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.id || currentPhoto.url}
              style={{ x, rotate, opacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileTap={{ cursor: "grabbing" }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-accent/30 bg-surface shadow-2xl cursor-grab group select-none"
            >
              <Image
                src={currentPhoto.url}
                alt={currentPhoto.filename || "Gallery photo"}
                fill
                unoptimized
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Auto-Play Status Indicator */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isAutoPlay && !isHovered ? "bg-emerald-400 animate-ping" : "bg-amber-400"}`} />
                  {isHovered ? "Paused (Hovered)" : isAutoPlay ? "Slideshow Auto-Playing" : "Slideshow Paused"}
                </span>
              </div>

              {/* Bottom Card Meta Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between z-20">
                <div className="space-y-1 max-w-[80%]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-accent bg-accent/20 px-2.5 py-1 rounded-md backdrop-blur-md">
                    Photo {currentIndex + 1} of {photos.length}
                  </span>
                  <h3 className="text-base font-bold text-white truncate" title={currentPhoto.filename}>
                    {currentPhoto.filename || `Photo ${currentIndex + 1}`}
                  </h3>
                </div>

                {/* Lightbox Trigger */}
                <button
                  onClick={() => setLightboxImage(currentPhoto.url)}
                  className="p-3 bg-background/60 hover:bg-accent hover:text-background rounded-full text-white backdrop-blur-md transition-all shadow-lg cursor-pointer"
                  title="Expand Fullscreen"
                >
                  <Maximize2 size={18} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls, Play/Pause & Pagination Dots */}
        <div className="mt-10 flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-3">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="p-3.5 bg-surface hover:bg-accent hover:text-background border border-border-color rounded-2xl text-foreground transition-all cursor-pointer shadow-md"
              title="Previous Photo"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Play / Pause Toggle Button */}
            {photos.length > 1 && (
              <button
                onClick={() => setIsAutoPlay((prev) => !prev)}
                className={`p-3.5 border rounded-2xl transition-all cursor-pointer shadow-md flex items-center justify-center ${
                  isAutoPlay
                    ? "bg-accent/15 border-accent text-accent"
                    : "bg-surface border-border-color text-text-muted hover:text-foreground"
                }`}
                title={isAutoPlay ? "Pause Automatic Slideshow" : "Start Automatic Slideshow"}
              >
                {isAutoPlay ? <Pause size={20} /> : <Play size={20} />}
              </button>
            )}

            {/* Pagination Dots */}
            <div className="flex items-center gap-2 max-w-xs overflow-x-auto px-3 py-2 bg-surface/80 border border-border-color rounded-full">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? "w-8 bg-accent"
                      : "w-2.5 bg-border-color hover:bg-text-muted"
                  }`}
                  title={`Go to photo ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="p-3.5 bg-surface hover:bg-accent hover:text-background border border-border-color rounded-2xl text-foreground transition-all cursor-pointer shadow-md"
              title="Next Photo"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <p className="text-xs text-text-muted flex items-center gap-1.5">
            <Layers size={14} className="text-accent" />
            <span>Auto-plays every 4s. Hover to pause, or drag/swipe cards to navigate.</span>
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>

              <Image
                src={lightboxImage}
                alt="Enlarged photo"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
