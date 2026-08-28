"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, Maximize2, X, ImageIcon, Layers } from "lucide-react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
            const galleryMedia = data.media.filter(
              (m: MediaItem) =>
                (!m.category || m.category === "NORMAL") &&
                (m.url.startsWith("data:") || m.url.startsWith("http") || m.url.startsWith("/") || (m.type && m.type.startsWith("image/")))
            );

            if (galleryMedia.length > 0) {
              setPhotos(galleryMedia);
            } else {
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

  // Continuous Automatic Slideshow (Runs every 3.5 seconds continuously)
  useEffect(() => {
    if (photos.length <= 1 || isModalOpen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [photos.length, isModalOpen]);

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
    return null; // Hide cleanly if zero photos are present
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
            Continuous 3D floating slideshow. Click any card to expand into a big card view.
          </p>
        </div>

        {/* 3D Card Swipe Carousel with Continuous Hover Animation */}
        <div className="relative max-w-lg mx-auto aspect-[4/3] flex items-center justify-center">
          {/* Card Stack Background 1 */}
          {photos.length > 1 && (
            <motion.div
              className="absolute inset-0 rounded-3xl overflow-hidden border border-border-color bg-surface shadow-xl pointer-events-none opacity-40"
              animate={{ scale: [0.93, 0.95, 0.93], y: [16, 12, 16] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={nextPhoto.url}
                alt="Gallery image preview"
                fill
                unoptimized
                className="object-cover filter blur-[1px]"
              />
            </motion.div>
          )}

          {/* Card Stack Background 2 */}
          {photos.length > 2 && (
            <motion.div
              className="absolute inset-0 rounded-3xl overflow-hidden border border-border-color bg-surface shadow-2xl pointer-events-none opacity-20"
              animate={{ scale: [0.87, 0.89, 0.87], y: [28, 24, 28] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={prevPhoto.url}
                alt="Gallery image preview"
                fill
                unoptimized
                className="object-cover"
              />
            </motion.div>
          )}

          {/* Main Active Floating Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.id || currentPhoto.url}
              style={{ x, rotate, opacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileTap={{ cursor: "grabbing" }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              onClick={() => setIsModalOpen(true)}
              className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-accent/40 bg-surface shadow-2xl cursor-pointer group select-none hover:border-accent hover:shadow-accent/20 transition-colors"
            >
              <Image
                src={currentPhoto.url}
                alt="Gallery photo"
                fill
                unoptimized
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Live Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  <span>Photo {currentIndex + 1} of {photos.length}</span>
                </span>
              </div>

              {/* Bottom Card Expand Action (Raw Filename Removed) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between z-20">
                <span className="text-xs text-white/90 font-medium flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                  <Maximize2 size={14} className="text-accent" />
                  <span>Click to expand big card</span>
                </span>

                <div className="p-3 bg-accent text-background rounded-full font-bold shadow-lg group-hover:scale-110 transition-transform">
                  <Maximize2 size={16} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls & Pagination Dots */}
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
            <span>Click any card to open the expanded Big Card view</span>
          </p>
        </div>
      </div>

      {/* Expanded Big Card Modal */}
      <AnimatePresence>
        {isModalOpen && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[85vh] bg-surface border-2 border-accent/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header Controls */}
              <div className="p-4 bg-background/80 border-b border-border-color flex items-center justify-between backdrop-blur-md">
                <span className="text-xs font-bold text-accent uppercase tracking-widest px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                  Big Card View • Photo {currentIndex + 1} of {photos.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 bg-surface hover:bg-accent hover:text-background rounded-full text-foreground border border-border-color transition-colors cursor-pointer"
                    title="Previous Photo"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 bg-surface hover:bg-accent hover:text-background rounded-full text-foreground border border-border-color transition-colors cursor-pointer"
                    title="Next Photo"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 bg-white/10 hover:bg-red-500 hover:text-white rounded-full text-foreground transition-colors cursor-pointer"
                    title="Close Modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Large Photo View */}
              <div className="relative flex-1 w-full min-h-[400px] md:min-h-[550px] bg-black/60 flex items-center justify-center p-4">
                <Image
                  src={currentPhoto.url}
                  alt="Expanded photo view"
                  fill
                  unoptimized
                  priority
                  className="object-contain"
                />

                {/* Big Card Navigation Arrows Overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 p-3 bg-black/50 hover:bg-accent hover:text-background border border-white/20 rounded-full text-white backdrop-blur-md transition-all shadow-xl cursor-pointer"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 p-3 bg-black/50 hover:bg-accent hover:text-background border border-white/20 rounded-full text-white backdrop-blur-md transition-all shadow-xl cursor-pointer"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
