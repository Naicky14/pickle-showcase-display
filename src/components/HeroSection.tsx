import titreImage from "@/assets/titre_Landing-page-2.jpg";

const HeroSection = () => {
  return (
    <section className="w-full py-1 px-4 sm:py-2 sm:px-6 flex-shrink-0">
      <div className="w-full max-w-2xl mx-auto animate-fade-in">
        <img
          src={titreImage}
          alt="Les Fêtes du Bocal - 12 mois de cornichonerie"
          className="w-full h-auto rounded-xl hover:scale-[1.02] transition-transform duration-500"
        />
      </div>
    </section>
  );
};

export default HeroSection;
