import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ImageCarousel from "@/components/ImageCarousel";

const Index = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col bg-background">
      <Header />
      <HeroSection />
      <ImageCarousel />
    </div>
  );
};

export default Index;
