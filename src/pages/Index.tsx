import HeroSection from "@/components/HeroSection";
import ImageCarousel from "@/components/ImageCarousel";

const Index = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col bg-background">
      <HeroSection />
      <ImageCarousel />
    </div>
  );
};

export default Index;
