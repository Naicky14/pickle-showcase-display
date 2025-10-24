import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import feteMusiqueImg from "@/assets/Fete_Musique.jpg";
import feteMusiqueVid from "@/assets/Fete_Musique.mp4";
import feteNationaleImg from "@/assets/Fete_Nationale.jpg";
import halloweenImg from "@/assets/Halloween.jpg";
import halloweenVid from "@/assets/Halloween.mp4";
import hugoNoelImg from "@/assets/Hugo_Noel.jpg";
import nouvelAnImg from "@/assets/Nouvel_An.jpg";
import nouvelAnVid from "@/assets/Nouvel_An.mp4";
import saintValentinImg from "@/assets/Saint_Valentin.jpg";
import saintValentinVid from "@/assets/Saint_Valentin.mp4";
import paquesImg from "@/assets/Paques.jpg";

type Slide = {
  type: 'image' | 'video';
  src: string;
  alt: string;
};

const slides: Slide[] = [
  { type: 'image', src: saintValentinImg, alt: "Joyeuse Saint-Valentin" },
  { type: 'video', src: saintValentinVid, alt: "Joyeuse Saint-Valentin - Vidéo" },
  { type: 'image', src: paquesImg, alt: "Joyeuse Pâques" },
  { type: 'image', src: feteMusiqueImg, alt: "Fête de la Musique" },
  { type: 'video', src: feteMusiqueVid, alt: "Fête de la Musique - Vidéo" },
  { type: 'image', src: feteNationaleImg, alt: "Fête Nationale" },
  { type: 'image', src: halloweenImg, alt: "Joyeux Halloween" },
  { type: 'video', src: halloweenVid, alt: "Joyeux Halloween - Vidéo" },
  { type: 'image', src: hugoNoelImg, alt: "Joyeux Noël" },
  { type: 'image', src: nouvelAnImg, alt: "Bonne Année" },
  { type: 'video', src: nouvelAnVid, alt: "Bonne Année - Vidéo" }
];
const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
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
  return <section className="w-full flex-1 flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6 min-h-0">
      <div className="w-full h-full flex items-center justify-center relative max-h-[50vh] sm:max-h-[55vh]" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        {/* Media Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {slides[currentIndex].type === 'image' ? (
            <img 
              key={currentIndex} 
              src={slides[currentIndex].src} 
              alt={slides[currentIndex].alt} 
              className="max-w-full max-h-full object-contain rounded-xl shadow-lg animate-fade-in" 
            />
          ) : (
            <video
              key={currentIndex}
              src={slides[currentIndex].src}
              autoPlay
              loop
              muted
              playsInline
              className="max-w-full max-h-full object-contain rounded-xl shadow-lg animate-fade-in"
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <Button variant="secondary" size="icon" onClick={prevSlide} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg hover:scale-110 transition-transform z-10 bg-primary hover:bg-primary/90 text-primary-foreground" aria-label="Image précédente">
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>

        <Button variant="secondary" size="icon" onClick={nextSlide} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg hover:scale-110 transition-transform z-10 bg-primary hover:bg-primary/90 text-primary-foreground" aria-label="Image suivante">
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>

        {/* Image Counter */}
        
      </div>

      {/* Dots Indicator - Below carousel */}
      <div className="flex gap-2 py-3">
        {slides.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-primary scale-125" : "bg-muted hover:bg-primary/50"}`} aria-label={`Aller au slide ${index + 1}`} />)}
      </div>
    </section>;
};
export default ImageCarousel;