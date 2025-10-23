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
    <section className="w-full min-h-screen flex items-center justify-center bg-background relative">
      <div
        className="w-full h-screen flex items-center justify-center relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image Container */}
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12">
          <img
            key={currentIndex}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl animate-fade-in"
          />
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="secondary"
          size="icon"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
          aria-label="Image précédente"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
          aria-label="Image suivante"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-secondary scale-125"
                  : "bg-muted hover:bg-muted-foreground"
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>

        {/* Image Counter */}
        <div className="absolute top-8 right-8 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <p className="text-sm sm:text-base font-medium text-foreground">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
