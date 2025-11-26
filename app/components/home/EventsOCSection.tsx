"use client";

import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";

import { homepageApi, HomepageContent } from "@/app/ServerAction/homepageApis";

import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "@/app/components/ui/carousel";

export const EventsOCSection = () => {
  const [content, setContent] = useState<HomepageContent>({
    heroHeading: "",
    heroSubheading: "",
    eventsOcSectionCopy: "",
    eventsOfCenturySectionText: "",
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await homepageApi.get();
      setContent(data);
    } catch (error) {
      console.error("Failed to load content");
    }
  };

  const eventImages = [
    "https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?w=500",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500",
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=500",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500",
    "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=500",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=500",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500",
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gold" />
            <div className="w-3 h-3 border-2 border-gold rotate-45" />
            <h2 className="text-4xl md:text-5xl font-serif text-gold tracking-wider">
              EVENTS OC
            </h2>
            <div className="w-3 h-3 border-2 border-gold rotate-45" />
            <div className="w-16 h-px bg-gold" />
          </div>

          <p className="text-base md:text-lg text-foreground/80 max-w-5xl mx-auto leading-relaxed px-4">
            {content.eventsOcSectionCopy ||
              "EventOC plans high-energy celebrations across the Byron Bays, Sunshine Coast & Gold Coast — birthdays, brand openings, hens nights, beach & pool parties, private and community events, and live music. We handle venues, catering, entertainment, AV, styling, florals, and photographers, or we will plug in your preferred vendors. One organiser, one plan, zero stress."}
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3500,
            }),
          ]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {eventImages.map((image, index) => (
              <CarouselItem key={index} className="basis-1/2 md:basis-1/5">
                <div className="aspect-[2/3] rounded-3xl overflow-hidden">
                  <img
                    src={image}
                    alt={`Event ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
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
