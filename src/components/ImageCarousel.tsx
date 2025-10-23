import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import feteMusiqueImg from "@/assets/Fete_Musique.jpg";
import feteNationaleImg from "@/assets/Fete_Nationale.jpg";
import halloweenImg from "@/assets/Halloween.jpg";
import hugoNoelImg from "@/assets/Hugo_Noel.jpg";
import nouvelAnImg from "@/assets/Nouvel_An.jpg";
import paquesImg from "@/assets/Paques.jpg";

const images = [
  { src: feteMusiqueImg, alt: "Fête de la Musique" },
  { src: feteNationaleImg, alt: "Fête Nationale" },
  { src: halloweenImg, alt: "Joyeux Halloween" },
  { src: hugoNoelImg, alt: "Joyeux Noël" },
  { src: nouvelAnImg, alt: "Bonne Année" },
  { src: paquesImg, alt: "Joyeuse Pâques" },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6">
      <div
        className="w-full flex-1 flex items-center justify-center relative pb-8"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            key={currentIndex}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-w-full max-h-full object-contain rounded-xl shadow-lg animate-fade-in"
          />
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="secondary"
          size="icon"
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg hover:scale-110 transition-transform z-10 bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label="Image précédente"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg hover:scale-110 transition-transform z-10 bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label="Image suivante"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
          <p className="text-xs sm:text-sm font-medium text-foreground">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>

      {/* Dots Indicator - Below carousel */}
      <div className="flex gap-2 pb-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary scale-125"
                : "bg-muted hover:bg-primary/50"
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ImageCarousel;
