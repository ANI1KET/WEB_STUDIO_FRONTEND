"use client";

import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import { servicesApi, Service } from "@/app/ServerAction/servicesApis";

export const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState("Venue");

  const categories = [
    "Venue",
    "Catering",
    "Entertainment",
    "Audio & Visual",
    "Style & Design",
    "Photographs",
    "Floral",
  ];

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await servicesApi.getAll();
      setServices(data);
    } catch (error) {
      console.error("Failed to load services ", error);
    }
  };

  const filteredServices = services.filter(
    (service) => service.category === activeCategory
  );

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-px bg-gold" />
            <div className="w-3 h-3 border-2 border-gold rotate-45" />
            <h2 className="text-4xl md:text-5xl font-serif text-gold tracking-wider">
              SERVICES
            </h2>
            <div className="w-3 h-3 border-2 border-gold rotate-45" />
            <div className="w-16 h-px bg-gold" />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-sm md:text-base transition-colors ${
                activeCategory === category
                  ? "text-gold font-medium"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <Carousel
          key={activeCategory}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {filteredServices.map((service) => (
              <CarouselItem
                key={service.id}
                className="md:basis-1/2 lg:basis-1/4"
              >
                <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src={
                      service.imageUrl ||
                      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=500"
                    }
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-serif text-foreground mb-2">
                      {service.name}
                    </h3>
                    {service.featured && (
                      <span className="text-gold text-sm">
                        Featured Service
                      </span>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 rounded-full w-12 h-12 border-gold text-gold hover:bg-gold hover:text-background" />
          <CarouselNext className="right-4 rounded-full w-12 h-12 border-gold text-gold hover:bg-gold hover:text-background" />
        </Carousel>
      </div>
    </section>
  );
};
