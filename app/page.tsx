import { Hero } from "@/app/components/home/Hero";
import { Footer } from "@/app/components/home/Footer";
import { Navigation } from "@/app/components/home/Navigation";
import { ServicesSection } from "@/app/components/home/ServicesSection";
import { EventsOCSection } from "@/app/components/home/EventsOCSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ServicesSection />
      <EventsOCSection />
      <Footer />
    </div>
  );
};

export default Home;
