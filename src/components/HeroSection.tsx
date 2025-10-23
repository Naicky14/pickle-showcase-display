import titreImage from "@/assets/titre_Landing-page.jpg";

const HeroSection = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-6xl animate-fade-in">
        <img
          src={titreImage}
          alt="Les Fêtes du Bocal - 12 mois de cornichonerie"
          className="w-full h-auto rounded-2xl shadow-2xl hover:scale-[1.02] transition-transform duration-500"
        />
      </div>
    </section>
  );
};

export default HeroSection;
